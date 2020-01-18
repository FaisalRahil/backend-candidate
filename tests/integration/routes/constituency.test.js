const request = require('supertest');
const chai = require('chai');
const { assert, expect, should } = chai;
chai.should();


const app = require("../../../server");

describe('bureau route test', () => {

    let constituencyID = undefined
    let generatedConstituencyID = undefined


    before(async () => {

    })

    it('should create a new constituency', async () => {

        const newConstituency = {
            constituencyID: Math.floor((Math.random() * 100000000) + 1),
            arabicName: "تاحوراء",
            englishName: "Tajoura",
            regionID: "5e1fb63ebd20be756cb5ede6",
            bureauID: "5e1fb63ebd20be756cb5ede7",
            electionID: "5e1fb63ebd20be756cb5ede5"
        }

        const response = await request(app)
            .post('/api/v1/constituency')
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
            arabicName: "Tripoli",
            englishName: "طرابلس",
        }

        const response = await request(app)
            .put('/api/v1/constituency')
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
            englishName: "Al-Zawiyah",
        }

        const response = await request(app)
            .put('/api/v1/constituency')
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
            englishName: "Al-Zawiyah",
        }

        const response = await request(app)
            .put('/api/v1/constituency')
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
            arabicName: "Tripoli",
            englishName: "طرابلس",
        }

        const response = await request(app)
            .put('/api/v1/constituency')
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

        const deactivateBureau = {
            constituencyID,
            state: false
        }

        const response = await request(app)
            .put('/api/v1/constituency/toggleConstituencyState')
            .send(deactivateBureau)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(deactivateBureau.state)

    })


    it('should activate a constituency based on _id', async () => {

        const activateBureau = {
            id: generatedConstituencyID,
            state: true
        }

        const response = await request(app)
            .put('/api/v1/constituency/toggleConstituencyState')
            .send(activateBureau)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(activateBureau.state)

    })

    it("should not change non-existing Constituency\'s state", async () => {

        const deactivateBureau = {
            id: '5e1bb5e507516221677406d3',
            state: false
        }

        const response = await request(app)
            .put('/api/v1/constituency/toggleConstituencyState')
            .send(deactivateBureau)
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


       

    })

    it('should get constituencies based on selected Election', async () => {


       

    })

    it('should get constituencies based on selected Bureau', async () => {


       
    })

})