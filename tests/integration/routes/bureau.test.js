const request = require('supertest');
const chai = require('chai');
const { assert, expect, should } = chai;
chai.should();


const app = require("../../../server");

describe('bureau route test', () => {

    let bureauID = undefined
    let regionID = undefined
    let electionID = undefined

    before(async () => {

        const newElection = {
            startDate: '2016-04-13',
            endDate: '2016-04-14',
            electionType: 'Parliament Election',
        }

        const createElectionRequest = await request(app).post('/api/v1/election/').send(newElection)
        electionID = createElectionRequest.body.data._id

        const newRegion = {

            arabicName: "المنطقة الغربية",
            englishName: "Western region",
            regionID: Math.floor((Math.random() * 100000000) + 1),
            electionID

        }

        const createRegionRequest = await request(app).post('/api/v1/region/').send(newRegion)
        regionID = createRegionRequest.body.data._id

    })

    it('shoud create new bureau', async () => {
        const newBureau = {
            bureauID: Math.floor((Math.random() * 100000000) + 1),
            arabicName: "مكتب طرابلس المركز",
            englishName: "Tripoli Central Bureau",
            electionID: electionID,
            regionID: regionID,

        }

        const response = await request(app)
            .post('/api/v1/bureau')
            .send(newBureau)
            .expect(201)
            .expect('Content-Type', /json/)

        bureauID = response.body.data._id;

        expect(response.status).to.equal(201)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data.arabicName).to.be.eql(newBureau.arabicName)
        expect(response.body.data.englishName).to.be.eql(newBureau.englishName)
        expect(response.body.data.bureauID).to.be.eql(newBureau.bureauID)
        expect(response.body.data.bureauID).to.be.eql(newBureau.bureauID)
        expect(response.body.data.electionID).to.be.eql(newBureau.electionID)
        response.body.data.should.include.keys(["arabicName", "englishName", "bureauID", "electionID", "state"]);

    })

    it('should get an existing Bureau', async () => {


        let response = await request(app)
            .get('/api/v1/bureau/')
            .send({ bureauID })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        response.body.data.should.include.keys(["arabicName", "englishName", "bureauID", "electionID", "state"]);


    })

    it('should not get a non-existing Bureau', async () => {


        const response = await request(app)
            .get('/api/v1/bureau/')
            .send({ bureauID: "5e1bb5e507516221677406d3" })
            .expect(404)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        expect(response.body.error).to.be.a("string")
        assert.equal(response.body.error, "Bureau under this id 5e1bb5e507516221677406d3 was not found")
        response.body.should.include.keys(["error", "success"]);


    })

    it('should update an existing Region', async () => {

        let updatedBureau = {

            id: bureauID,
            arabicName: "حي الأندلس",
            englishName: "Andalus neighborhood",

        }

        const response = await request(app)
            .put('/api/v1/bureau/')
            .send(updatedBureau)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data).to.be.an('object')
        expect(response.body.data._id).to.be.eql(updatedBureau.id)
        expect(response.body.data.arabicName).to.be.eql(updatedBureau.arabicName)
        expect(response.body.data.englishName).to.be.eql(updatedBureau.englishName)
        response.body.data.should.include.keys(["arabicName", "englishName", "bureauID", "bureauID", "electionID", "state"]);

    })

    it('should not update a non existing Bureau', async () => {

        const updatedBureau = {

            id: "5e1bb5e507516221677406d3",
            arabicName: "حي الأندلس",
            englishName: "Andalus neighborhood"

        }

        const response = await request(app)
            .put('/api/v1/bureau/')
            .send(updatedBureau)
            .expect(404)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        expect(response.body.error).to.be.a("string")
        assert.equal(response.body.error, "Bureau under this id 5e1bb5e507516221677406d3 was not found")
        response.body.should.include.keys(["error", "success"]);


    })

    it('should deactivate an existing Bureau', async () => {

        const deactivateBureau = {
            bureauID,
            state: false
        }

        const response = await request(app)
            .put('/api/v1/bureau/toggleBureauState')
            .send(deactivateBureau)
            .expect(200)
            .expect('Content-Type', /json/)



        expect(response.status).to.equal(200)
        expect(response.body.data.state).to.be.false;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(deactivateBureau.state)




    })

    it('should activate an existing Bureau', async () => {

        const activateBureau = {
            bureauID,
            state: true
        }

        const response = await request(app)
            .put('/api/v1/bureau/toggleBureauState')
            .send(activateBureau)
            .expect(200)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(200)
        expect(response.body.data.state).to.be.true;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(activateBureau.state)

    })

    it("should not change non-existing Bureau\'s state", async () => {

        const deactivateBureau = {
            bureauID: '5e1bb5e507516221677406d3',
            state: false
        }

        const response = await request(app)
            .put('/api/v1/bureau/toggleBureauState')
            .send(deactivateBureau)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Bureau under this id 5e1bb5e507516221677406d3 was not found")
        response.body.should.include.keys(["error", "success"]);

    })

    it('should return list of bureaus ', async () => {

        const response = await request(app)
            .get('/api/v1/bureau/bureaus')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.bureaus).to.be.not.empty
        expect(response.body.bureaus).to.be.an('array')
        expect(response.body.bureaus[0]).to.be.an('object')
        expect(response.body.bureaus).to.not.be.null;
        expect(response.body.bureaus).to.not.be.undefined;

    })


    it('should return list of bureaus based on selected region', async () => {

        const response = await request(app)
            .get('/api/v1/bureau/bureausByRegion')
            .send({ regionID })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true;
        expect(response.body.success).to.be.a("boolean");
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data).to.be.an("object")
        response.body.data.should.include.keys(["arabicName", "englishName", "electionID", "regionID", "state"]);
        expect(response.body.data.bureaus).to.be.not.empty;
        expect(response.body.data.bureaus).to.be.an('array')
        expect(response.body.data.bureaus[0]).to.be.an('object')
        response.body.data.bureaus[0].should.include.keys(["arabicName", "englishName", "bureauID", "electionID", "regionID", "state"]);
    })

    it('should not return list of bureaus based on non-existing region', async () => {

        const response = await request(app)
            .get('/api/v1/bureau/bureausByRegion')
            .send({regionID: "5e1bb5e507516221677406d3"})
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.success).to.be.a("boolean");
        expect(response.body.error).to.equal("Region under this id 5e1bb5e507516221677406d3 was not found")
        expect(response.body.error).to.be.a("string");
        
    })

    it('should return list of bureaus and election info based on selected region', async () => {

        const response = await request(app)
            .get('/api/v1/bureau/bureausWithRegionsAndElections')
            .send({ regionID })
            .expect(200)
            .expect('Content-Type', /json/)

            expect(response.status).to.equal(200)
            expect(response.body.success).to.be.true;
            expect(response.body.success).to.be.a("boolean");
            expect(response.body.data).to.not.be.null;
            expect(response.body.data).to.not.be.undefined;
            expect(response.body.data).to.be.an("object")
            response.body.data.should.include.keys(["arabicName", "englishName", "electionID", "regionID", "state"]);
            expect(response.body.data.election).to.be.not.null;
            expect(response.body.data.election).to.be.not.undefined;
            expect(response.body.data.election).to.be.an('object')
            response.body.data.election.should.include.keys(["startDate", "endDate", "electionType", "state"]);
            expect(response.body.data.bureaus).to.be.not.empty;
            expect(response.body.data.bureaus).to.be.an('array')
            expect(response.body.data.bureaus[0]).to.be.an('object')
            response.body.data.bureaus[0].should.include.keys(["arabicName", "englishName", "bureauID", "electionID", "regionID", "state"]);

    })

    it('should not return list of bureaus and election info based on non-existing region', async () => {

        const response = await request(app)
            .get('/api/v1/bureau/bureausWithRegionsAndElections')
            .send({regionID: "5e1bb5e507516221677406d3"})
            .expect(404)
            .expect('Content-Type', /json/)

            expect(response.status).to.equal(404)
            expect(response.body.success).to.be.false;
            expect(response.body.success).to.be.a("boolean");
            expect(response.body.error).to.equal("Region under this id 5e1bb5e507516221677406d3 was not found")
            expect(response.body.error).to.be.a("string");
    })

})