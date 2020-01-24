const request = require('supertest');
const chai = require('chai');
const { assert, expect, should } = chai;
chai.should();

let app = require("../../../server")


describe('', () => {

    let generatedSubconsitiuencyID = undefined
    let subconstituencyID = undefined
    let electionID = undefined
    let bureauID = undefined
    let constituencyID = undefined

    before(async () => {

        const newElection = {
            startDate: '2016-04-13',
            endDate: '2016-04-14',
            electionType: 'Parliament Election',
        }

        const createElectionRequest = await request(app).post('/api/v1/election/').send(newElection)
        electionID = createElectionRequest.body.data._id


        const newBureau = {
            bureauID: Math.floor((Math.random() * 100000000) + 1),
            arabicName: "مكتب طرابلس المركز",
            englishName: "Tripoli Central Bureau",
            electionID,
            regionID: "5e24af45e9ff27e41b009915"
        }

        const createBureauRequest = await request(app).post('/api/v1/bureau/').send(newBureau)
        bureauID = createBureauRequest.body.data._id

        const newConstituency = {

            constituencyID: Math.floor((Math.random() * 100000000) + 1),
            arabicName: "تاحوراء",
            englishName: "Tajoura",
            regionID: "5e24af45e9ff27e41b009915",
            bureauID: bureauID,
            electionID: electionID

        }

        const createConstituencyRequest = await request(app).post('/api/v1/constituency/').send(newConstituency)
        constituencyID = createConstituencyRequest.body.data._id
    })


    it('should create a new constituency', async () => {

        const newSubconstituency = {
            subconstituencyID: Math.floor((Math.random() * 100000000) + 1),
            arabicName: "تاحوراء",
            englishName: "Tajoura",
            subconstituecnyID: constituencyID,
            bureauID: bureauID,
            electionID: electionID
        }

        const response = await request(app)
            .post('/api/v1/subconstituency')
            .send(newSubconstituency)
            .expect(201)
            .expect('Content-Type', /json/)

        subconstituencyID = response.body.data.subconstituencyID;
        generatedSubconsitiuencyID = response.body.data._id;

        expect(response.status).to.equal(201)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data.arabicName).to.be.eql(newSubconstituency.arabicName)
        expect(response.body.data.englishName).to.be.eql(newSubconstituency.englishName)
        expect(response.body.data.constituencyID).to.be.eql(newSubconstituency.constituencyID)
        expect(response.body.data.subconstituencyID).to.be.eql(newSubconstituency.subconstituencyID)
        response.body.data.should.include.keys(["_id", "arabicName", "englishName", "subconstituencyID"]);

    })


    it('should get a subconstituency based on _id', async () => {

        const response = await request(app)
            .get('/api/v1/subconstituency')
            .send({ id: generatedSubconsitiuencyID })
            .expect(200)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(200)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        response.body.data.should.include.keys(["_id", "arabicName", "englishName", "subconstituencyID"]);

    })

    it('should get a subconstituency based on subconstituencyID', async () => {
        const response = await request(app)
            .get('/api/v1/subconstituency')
            .send({ subconstituencyID })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        response.body.data.should.include.keys(["_id", "arabicName", "englishName", "subconstituencyID"]);

    })

    it('should not get a subconstituency based on non-existing _id', async () => {

        const response = await request(app)
            .get('/api/v1/subconstituency')
            .send({ id: "5e195075705b65d4a1c52fb4" })
            .expect(404)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        expect(response.body.error).to.be.a("string")
        assert.equal(response.body.error, "Subconstituency under this id 5e195075705b65d4a1c52fb4 was not found")
        response.body.should.include.keys(["error", "success"]);


    })

    it('should not get a subconstituency based on non-existing subconstituencyID', async () => {

        const response = await request(app)
            .get('/api/v1/subconstituency')
            .send({ subconstituencyID: 473467892734893 })
            .expect(404)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        expect(response.body.error).to.be.a("string")
        assert.equal(response.body.error, "Subconstituency under this id 473467892734893 was not found")
        response.body.should.include.keys(["error", "success"]);


    })

    it('should update a subconstituency based on _id', async () => {

        const updatedSubconstituency = {
            id: generatedSubconsitiuencyID,
            arabicName: "طرابلس المركز",
            englishName: "Ttipoli Central",
        }

        const response = await request(app)
            .put('/api/v1/subconstituency')
            .send(updatedSubconstituency)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data).to.be.an('object')
        expect(response.body.data.arabicName).to.be.eql(updatedSubconstituency.arabicName)
        expect(response.body.data.englishName).to.be.eql(updatedSubconstituency.englishName)
        expect(response.body.data.constituencyID).to.be.eql(updatedSubconstituency.constituencyID)
        response.body.data.should.include.keys(["arabicName", "englishName", "subconstituencyID", "state"]);
    })

    it('should not update a constituency based on non-existing _id', async () => {

        const updatedSubconstituency = {
            id: "5e195075705b65d4a1c52fb4",
            arabicName: "طرابلس المركز",
            englishName: "Ttipoli Central",
        }

        const response = await request(app)
            .put('/api/v1/subconstituency')
            .send(updatedSubconstituency)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Subconstituency under this id 5e195075705b65d4a1c52fb4 was not found")
        response.body.should.include.keys(["error", "success"]);
    })

    it('should update a subconstituency based on subconstituencyID', async () => {

        const updatedSubconstituency = {
            subconstituencyID,
            arabicName: "طرابلس المركز",
            englishName: "Ttipoli Central",
        }

        const response = await request(app)
            .put('/api/v1/subconstituency')
            .send(updatedSubconstituency)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data).to.be.an('object')
        expect(response.body.data.arabicName).to.be.eql(updatedSubconstituency.arabicName)
        expect(response.body.data.englishName).to.be.eql(updatedSubconstituency.englishName)
        expect(response.body.data.constituencyID).to.be.eql(updatedSubconstituency.constituencyID)
        response.body.data.should.include.keys(["arabicName", "englishName", "subconstituencyID", "state"]);
    })

    it('should not update a constituency based on non-existing subconstituencyID', async () => {

        const updatedSubconstituency = {
            subconstituencyID:473467892734893,
            arabicName: "طرابلس المركز",
            englishName: "Ttipoli Central",
        }

        const response = await request(app)
            .put('/api/v1/subconstituency')
            .send(updatedSubconstituency)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Subconstituency under this id 473467892734893 was not found")
        response.body.should.include.keys(["error", "success"]);
    })

    it('should deactivate a subconstituency based on subconstituencyID', async () => {

        const deactivateSubconstituency = {
            subconstituencyID,
            state: false
        }

        const response = await request(app)
            .put('/api/v1/subconstituency/toggleSubconstituencyState')
            .send(deactivateSubconstituency)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(deactivateSubconstituency.state)

    })


    it('should activate a subconstituency based on _id', async () => {

        const activateSubconstituency = {
            id: generatedSubconsitiuencyID,
            state: true
        }

        const response = await request(app)
            .put('/api/v1/subconstituency/toggleSubconstituencyState')
            .send(activateSubconstituency)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(activateSubconstituency.state)

    })

    it("should not change non-existing Subonstituency\'s state", async () => {

        const deactivateSubconstituency= {
            id: '5e1bb5e507516221677406d3',
            state: false
        }

        const response = await request(app)
            .put('/api/v1/subconstituency/toggleSubConstituencyState')
            .send(deactivateSubconstituency)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Subconstituency under this id 5e1bb5e507516221677406d3 was not found")
        response.body.should.include.keys(["error", "success"]);

    })

})