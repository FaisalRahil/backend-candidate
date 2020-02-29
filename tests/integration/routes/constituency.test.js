const request = require('supertest');
const chai = require('chai');
const { assert, expect, should } = chai;
chai.should();


const app = require("../../../server");


describe('Constituency route test', () => {

    let constituencyID = undefined
    let generatedConstituencyID = undefined

    let electionID = undefined
    let regionID = undefined
    let bureauID = undefined
    let jwToken = undefined


    before(async () => {

        const response = await request(app)
        .get('/api/v1/user/')
        .send({
            email:"root@hnec.ly",
            password:"aaaaaa"
        })
       
        jwToken = response.body.token;

        const newElection = {
            startDate: '2016-04-13',
            endDate: '2016-04-14',
            electionType: 'Parliament Election',
        }

        const createElectionRequest = await request(app).post('/api/v1/election/').set({'Authorization':jwToken}).send(newElection)
        electionID = createElectionRequest.body.data._id

        const newRegion = {

            arabicName: "المنطقة الغربية",
            englishName: "Western region",
            regionID: Math.floor((Math.random() * 100000000) + 1),
            electionID

        }

        const createRegionRequest = await request(app).post('/api/v1/region/').set({'Authorization':jwToken}).send(newRegion)
        regionID = createRegionRequest.body.data._id

        const newBureau = {
            bureauID: Math.floor((Math.random() * 100000000) + 1),
            arabicName: "مكتب طرابلس المركز",
            englishName: "Tripoli Central Bureau",
            electionID: electionID,
            regionID: regionID,

        }

        const createBureauRequest = await request(app).post('/api/v1/bureau/').set({'Authorization':jwToken}).send(newBureau)
        bureauID = createBureauRequest.body.data._id


    })

    it('should create a new constituency', async () => {

        const newConstituency = {
            constituencyID: Math.floor((Math.random() * 100000000) + 1),
            arabicName: "تاحوراء",
            englishName: "Tajoura",
            regionID: regionID,
            bureauID: bureauID,
            electionID: electionID
        }

        const response = await request(app)
            .post('/api/v1/constituency')
            .set({'Authorization':jwToken})
            .send(newConstituency)
            .expect(201)
            .expect('Content-Type', /json/)

        constituencyID = response.body.data.constituencyID;
        generatedConstituencyID = response.body.data._id;

        expect(response.status).to.equal(201)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data.arabicName).to.be.eql(newConstituency.arabicName)
        expect(response.body.data.englishName).to.be.eql(newConstituency.englishName)
        expect(response.body.data.constituencyID).to.be.eql(newConstituency.constituencyID)
        response.body.data.should.include.keys(["_id", "arabicName", "englishName", "constituencyID"]);
    })

    it('should get a constituency based on constituencyID', async () => {

        const response = await request(app)
            .get('/api/v1/constituency')
            .set({'Authorization':jwToken})
            .send({ constituencyID })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data).to.be.an('object')
        response.body.data.should.include.keys(["constituencyID", "arabicName", "englishName", "_id", "state"]);

    })

    it('should not get a constituency based on non-existing constituencyID', async () => {

        const response = await request(app)
            .get('/api/v1/constituency')
            .set({'Authorization':jwToken})
            .send({ constituencyID: 473467892734893 })
            .expect(404)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        expect(response.body.error).to.be.a("string")
        assert.equal(response.body.error, "Constituency under this id 473467892734893 was not found")
        response.body.should.include.keys(["error", "success"]);


    })

    it('should get a constituency based on _id', async () => {

        const response = await request(app)
            .get('/api/v1/constituency')
            .set({'Authorization':jwToken})
            .send({ id: generatedConstituencyID })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data).to.be.an('object')
        response.body.data.should.include.keys(["constituencyID", "arabicName", "englishName", "_id", "state"]);
    })

    it('should not get a constituency based on non-existing _id', async () => {

        const response = await request(app)
            .get('/api/v1/constituency')
            .set({'Authorization':jwToken})
            .send({ id: "5e195075705b65d4a1c52fb4" })
            .expect(404)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        expect(response.body.error).to.be.a("string")
        assert.equal(response.body.error, "Constituency under this id 5e195075705b65d4a1c52fb4 was not found")
        response.body.should.include.keys(["error", "success"]);



    })

    it('should update a constituency based on constituencyID', async () => {

        const updatedConstituency = {
            constituencyID: constituencyID,
            arabicName: "طرابلس",
            englishName: "Tripoli",
        }

        const response = await request(app)
            .put('/api/v1/constituency')
            .set({'Authorization':jwToken})
            .send(updatedConstituency)
            .expect(200)
            .expect('Content-Type', /json/)

        

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data).to.be.an('object')
        expect(response.body.data.arabicName).to.be.eql(updatedConstituency.arabicName)
        expect(response.body.data.englishName).to.be.eql(updatedConstituency.englishName)
        expect(response.body.data.constituencyID).to.be.eql(updatedConstituency.constituencyID)
        response.body.data.should.include.keys(["arabicName", "englishName", "constituencyID", "state"]);
    })

    it('should not update a constituency based on non-existing constituencyID', async () => {

        const updatedConstituency = {
            constituencyID: 473467892734893,
            arabicName: "زاوية",
            englishName: "Al Zawiyah",
        }

        const response = await request(app)
            .put('/api/v1/constituency')
            .set({'Authorization':jwToken})
            .send(updatedConstituency)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Constituency under this id 473467892734893 was not found")
        response.body.should.include.keys(["error", "success"]);


    })

    it('should update a constituency based on _id', async () => {

        const updatedConstituency = {
            id: generatedConstituencyID,
            arabicName: "زاوية",
            englishName: "Al Zawiyah",
        }

        const response = await request(app)
            .put('/api/v1/constituency')
            .set({'Authorization':jwToken})
            .send(updatedConstituency)
            .expect(200)
            .expect('Content-Type', /json/)
           
        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data).to.be.an('object')
        expect(response.body.data.arabicName).to.be.eql(updatedConstituency.arabicName)
        expect(response.body.data.englishName).to.be.eql(updatedConstituency.englishName)
        expect(response.body.data._id).to.be.eql(updatedConstituency.id)
        response.body.data.should.include.keys(["arabicName", "englishName", "_id", "state"]);

    })

    it('should not update a constituency based on non-existing _id', async () => {

        const updatedConstituency = {
            id: "5e195075705b65d4a1c52fb4",
            arabicName: "طرابلس",
            englishName: "Tripoli",
        }

        const response = await request(app)
            .put('/api/v1/constituency')
            .set({'Authorization':jwToken})
            .send(updatedConstituency)
            .expect(404)
            .expect('Content-Type', /json/)
       
        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Constituency under this id 5e195075705b65d4a1c52fb4 was not found")
        response.body.should.include.keys(["error", "success"]);



    })

    it('should deactivate a constituency based on constituencyID', async () => {

        const deactivateConstituency = {
            constituencyID,
            state: false
        }

        const response = await request(app)
            .put('/api/v1/constituency/toggleConstituencyState')
            .set({'Authorization':jwToken})
            .send(deactivateConstituency)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(deactivateConstituency.state)

    })


    it('should activate a constituency based on _id', async () => {

        const activateConstituency= {
            id: generatedConstituencyID,
            state: true
        }

        const response = await request(app)
            .put('/api/v1/constituency/toggleConstituencyState')
            .set({'Authorization':jwToken})
            .send(activateConstituency)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(activateConstituency.state)

    })

    it("should not change non-existing Constituency\'s state", async () => {

        const deactivateConstituency = {
            id: '5e1bb5e507516221677406d3',
            state: false
        }

        const response = await request(app)
            .put('/api/v1/constituency/toggleConstituencyState')
            .set({'Authorization':jwToken})
            .send(deactivateConstituency)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Constituency under this id 5e1bb5e507516221677406d3 was not found")
        response.body.should.include.keys(["error", "success"]);

    })



    it('should get all constituencies', async () => {


        const response = await request(app)
            .get('/api/v1/constituency/constituencies')
            .set({'Authorization':jwToken})
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.constituencies).to.be.not.empty
        expect(response.body.constituencies).to.be.an('array')
        expect(response.body.constituencies[0]).to.be.an('object')
        expect(response.body.constituencies).to.not.be.null;
        expect(response.body.constituencies).to.not.be.undefined;

    })

    it('should get constituencies based on selected Region', async () => {


        const response = await request(app)
            .get('/api/v1/constituency/getConstituenciesBasedOnRegionID')
            .set({'Authorization':jwToken})
            .expect(200)
            .send({id:regionID})
            .expect('Content-Type', /json/)

            expect(response.status).to.equal(200)
            expect(response.body.data).to.not.be.null;
            expect(response.body.data).to.not.be.undefined;
            expect(response.body.data.state).to.be.true
            response.body.data.should.include.keys(["arabicName", "englishName", "constituencies", "state"]);
            expect(response.body.data.constituencies).to.be.not.empty
            expect(response.body.data.constituencies).to.be.an('array')
            expect(response.body.data.constituencies).to.not.be.null;
            expect(response.body.data.constituencies).to.not.be.undefined;
            expect(response.body.data.constituencies[0]).to.be.an('object')
            response.body.data.constituencies[0].should.include.keys(["arabicName", "englishName", "constituencyID"]);

    })

    it('should get constituencies based on selected Election', async () => {


        const response = await request(app)
        .get('/api/v1/constituency/getConstituenciesBasedOnElectionID')
        .set({'Authorization':jwToken})
        .send({electionID})
        .expect(200)
        .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.true
        response.body.data.should.include.keys(["startDate", "endDate", "electionType", "state","constituencies"]);
        expect(response.body.data.constituencies).to.be.not.empty
        expect(response.body.data.constituencies).to.be.an('array')
        expect(response.body.data.constituencies).to.not.be.null;
        expect(response.body.data.constituencies).to.not.be.undefined;
        expect(response.body.data.constituencies[0]).to.be.an('object')
        response.body.data.constituencies[0].should.include.keys(["arabicName", "englishName", "constituencyID"]);

    })

    it('should get constituencies based on selected Bureau', async () => {

        const response = await request(app)
        .get('/api/v1/constituency/getConstituenciesBasedOnBureauID')
        .set({'Authorization':jwToken})
        .send({id:bureauID})
        .expect(200)
        .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.true
        response.body.data.should.include.keys(["arabicName", "englishName", "state" ,"constituencies"]);
        expect(response.body.data.constituencies).to.be.not.empty
        expect(response.body.data.constituencies).to.be.an('array')
        expect(response.body.data.constituencies).to.not.be.null;
        expect(response.body.data.constituencies).to.not.be.undefined;
        expect(response.body.data.constituencies[0]).to.be.an('object')
        response.body.data.constituencies[0].should.include.keys(["arabicName", "englishName", "constituencyID","id"]);
    })

})