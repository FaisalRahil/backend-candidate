const request = require('supertest');
const chai = require('chai');
const { assert, expect, should } = chai;
chai.should();

let app = require("../../../server")





describe('region route test', () => {

    let regionID = undefined
    let generatedRegionID = undefined
    let regionResponse = undefined
    let electionID = undefined
    let jwToken = undefined



    before(async () => {

        const user = await request(app)
        .get('/api/v1/user/')
        .send({
            email:"root@hnec.ly",
            password:"aaaaaa"
        })
       
        jwToken = 'token ' + user.body.token;

        const newElection = {
            startDate: '2016-04-13',
            endDate: '2016-04-14',
            electionType: 'Parliament Election',
        }


        let election = await request(app)
            .post('/api/v1/election/')
            .set({'Authorization':jwToken})
            .send(newElection)



        electionID = election.body.data._id

    })



    const createNewRegion = async (newRegion) => {



        let response = await request(app)
            .post('/api/v1/region/')
            .set({'Authorization':jwToken})
            .send(newRegion)
            .expect(201)
            .expect('Content-Type', /json/)



        generatedRegionID = response.body.data._id
        regionID = response.body.data.regionID


        return response

    }


    it('shoud create a new region', async () => {

        const newRegion = {

            arabicName: "المنطقة الغربية",
            englishName: "Western region",
            regionID: Math.floor((Math.random() * 100000000) + 1),
            electionID

        }

        regionResponse = await createNewRegion(newRegion)

        expect(regionResponse.status).to.equal(201)
        expect(regionResponse.body).to.not.be.null;
        expect(regionResponse.body).to.not.be.undefined;
        expect(regionResponse.body.success).to.be.true
        expect(regionResponse.body.data).to.be.not.undefined
        expect(regionResponse.body.data).to.be.not.null
        expect(regionResponse.body.data.arabicName).to.be.eql(newRegion.arabicName)
        expect(regionResponse.body.data.englishName).to.be.eql(newRegion.englishName)
        expect(regionResponse.body.data.regionID).to.be.eql(newRegion.regionID)
        expect(regionResponse.body.data.electionID).to.be.eql(newRegion.electionID)
        regionResponse.body.data.should.include.keys(["arabicName", "englishName", "regionID", "electionID", "state"]);

    })

    it('should get an existing Region based on an existing _id', async () => {


        let response = await request(app)
            .get('/api/v1/region/')
            .set({'Authorization':jwToken})
            .send({ id: generatedRegionID })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        response.body.data.should.include.keys(["_id","arabicName", "englishName", "regionID", "state"]);


    })

    it('should not get a Region based on non-existing _id', async () => {


        const response = await request(app)
            .get('/api/v1/region/')
            .set({'Authorization':jwToken})
            .send({ id: "5e1bb5e507516221677406d3" })
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        assert.equal(response.body.error, "Region under this id 5e1bb5e507516221677406d3 was not found")
        response.body.should.include.keys(["success","error"]);

    })

    it('should get an existing Region based on an existing regionID', async () => {

        let response = await request(app)
            .get('/api/v1/region/')
            .set({'Authorization':jwToken})
            .send({ regionID })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        response.body.data.should.include.keys(["_id","arabicName", "englishName", "regionID", "state"]);

    })

    it('should not get a Region based on non-existing regionID', async () => {


        const response = await request(app)
            .get('/api/v1/region/')
            .set({'Authorization':jwToken})
            .send({ regionID: 473467892734893 })
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        assert.equal(response.body.error, "Region under this id 473467892734893 was not found")
        response.body.should.include.keys(["success","error"]);

    })

    it('should update an existing Region based on _id', async () => {

        let updatedRegion = {

            id: generatedRegionID,
            arabicName: "المنطقة الشرقية",
            englishName: "Eastern region",

        }

        const response = await request(app)
            .put('/api/v1/region/')
            .set({'Authorization':jwToken})
            .send(updatedRegion)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data).to.be.an('object')
        expect(response.body.data._id).to.be.eql(updatedRegion.id)
        expect(response.body.data.arabicName).to.be.eql(updatedRegion.arabicName)
        expect(response.body.data.englishName).to.be.eql(updatedRegion.englishName)
        response.body.data.should.include.keys(["arabicName", "englishName", "regionID", "electionID", "state"]);

    })

    it('should not update a Region based on non existing _id', async () => {

        const updatedRegion = {
            id: "5e1bb5e507516221677406d3",
            arabicName: "المنطقة الشرقية",
            englishName: "Eastern region",
        }

        const response = await request(app)
            .put('/api/v1/region/')
            .set({'Authorization':jwToken})
            .send(updatedRegion)
            .expect(404)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        assert.equal(response.body.error, "Region under this id 5e1bb5e507516221677406d3 was not found")
        response.body.should.include.keys(["success","error"]);




    })

    it('should update an existing Region based on RegionID', async () => {

        let updatedRegion = {

            regionID,
            arabicName: "المنطقة الجتوبية",
            englishName: "Southern region",

        }

        const response = await request(app)
            .put('/api/v1/region/')
            .set({'Authorization':jwToken})
            .send(updatedRegion)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        expect(response.body.data).to.be.an('object')
        expect(response.body.data.regionID).to.be.eql(updatedRegion.regionID)
        expect(response.body.data.arabicName).to.be.eql(updatedRegion.arabicName)
        expect(response.body.data.englishName).to.be.eql(updatedRegion.englishName)
        response.body.data.should.include.keys(["arabicName", "englishName", "regionID", "electionID", "state"]);

    })

    it('should not update a Region based on non existing RegionID', async () => {

        let updatedRegion = {

            regionID: 473467892734893,
            arabicName: "المنطقة الشرقية",
            englishName: "Eastern region",

        }

        const response = await request(app)
            .put('/api/v1/region/')
            .set({'Authorization':jwToken})
            .send(updatedRegion)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        assert.equal(response.body.error, "Region under this id 473467892734893 was not found")
        response.body.should.include.keys(["success","error"]);


    })

    it('should deactivate an existing Region based on an existing _id', async () => {

        const deactivateRegion = {
            id: generatedRegionID,
            state: false
        }

        const response = await request(app)
            .put('/api/v1/region/toggleRegionState')
            .set({'Authorization':jwToken})
            .send(deactivateRegion)
            .expect(200)
            .expect('Content-Type', /json/)



        expect(response.status).to.equal(200)
        expect(response.body.data.state).to.be.false;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(deactivateRegion.state)
        response.body.data.should.include.keys(["state"]);
    })

    it('should activate an existing Region based on an existing RegionID', async () => {

        const activateRegion = {
            regionID,
            state: true
        }

        const response = await request(app)
            .put('/api/v1/region/toggleRegionState')
            .set({'Authorization':jwToken})
            .send(activateRegion)
            .expect(200)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(200)
        expect(response.body.data.state).to.be.true;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.state).to.be.eql(activateRegion.state)
        response.body.data.should.include.keys(["state"]);

    })

    it("should not change non-existing Region\'s state based on non existing _id", async () => {

        const deactivateRegion = {
            id: '5e1bb5e507516221677406d3',
            state: false
        }

        const response = await request(app)
            .put('/api/v1/region/toggleRegionState')
            .set({'Authorization':jwToken})
            .send(deactivateRegion)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Region under this id 5e1bb5e507516221677406d3 was not found")
        response.body.should.include.keys(["success","error"]);


    })

    it("should not change non-existing Region\'s state based on non existing RegionID", async () => {

        const deactivateRegion = {
            regionID: 473467892734893,
            state: false
        }

        const response = await request(app)
            .put('/api/v1/region/toggleRegionState')
            .set({'Authorization':jwToken})
            .send(deactivateRegion)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Region under this id 473467892734893 was not found")
        response.body.should.include.keys(["success","error"]);

    })

    it('should return list of regions', async () => {

        const response = await request(app)
            .get('/api/v1/region/regions')
            .set({'Authorization':jwToken})
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.regions).to.be.not.empty
        expect(response.body.regions).to.be.an('array')
        expect(response.body.regions[0]).to.be.an('object')
        expect(response.body.regions).to.not.be.null;
        expect(response.body.regions).to.not.be.undefined;
        response.body.regions[0].should.include.keys(["state","_id","arabicName","englishName","regionID"]);
    })

    it('should return list of regions based on selected election', async () => {

        const response = await request(app)
            .get('/api/v1/region/regionsByElection')
            .set({'Authorization':jwToken})
            .send({ electionID })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.success).to.be.true;
        expect(response.body.success).to.be.a("boolean");
        expect(response.body.data.regions).to.be.not.empty;
        expect(response.body.data.regions).to.be.an('array')
        expect(response.body.data.regions[0]).to.be.an('object')
        response.body.data.should.include.keys(["startDate", "endDate", "electionType","state","regions"]);
        response.body.data.regions[0].should.include.keys(["arabicName", "englishName", "regionID", "state"]);
    })

    it('should return nothing on selecting non-existing election', async () => {

        const response = await request(app)
            .get('/api/v1/region/regionsByElection')
            .set({'Authorization':jwToken})
            .send({ electionID: "5e1bb5e507516221677406d3" })
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.error).to.not.be.null;
        expect(response.body.error).to.not.be.undefined;
        expect(response.body.success).to.be.false;
        expect(response.body.success).to.be.a("boolean");
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Region under this election id 5e1bb5e507516221677406d3 was not found")
        response.body.should.include.keys(["success","error"]);
    })
})