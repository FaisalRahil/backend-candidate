const request = require('supertest');
const chai = require('chai');
const { assert, expect, should } = chai;
chai.should();

let app = require("../../../server")





describe('region route test', () => {

    
    let regionID = undefined
    let regionResponse = undefined
    let electionID = undefined

    

    before(async () => {

        const newElection = {
            startDate: '2016-04-13',
            endDate: '2016-04-14',
            electionType: 'Parliament Election',
        }

        let response = await request(app)
            .post('/api/v1/election/')
            .send(newElection)

       
        
        electionID = response.body.data._id
     

    })

    

    const createNewRegion = async (newRegion) => {

       
        
        let response = await request(app)
            .post('/api/v1/region/')
            .send(newRegion)
            .expect(201)
            .expect('Content-Type', /json/)

            

          regionID = response.body.data._id


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
        regionResponse.body.data.should.include.keys(["arabicName", "englishName", "regionID","electionID", "status"]);

    })

    it('should get an existing Region', async () => {


        let response = await request(app)
            .get('/api/v1/region/')
            .send({ regionID })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.success).to.be.true
        expect(response.body.data).to.be.not.undefined
        expect(response.body.data).to.be.not.null
        response.body.data.should.include.keys(["arabicName", "englishName", "regionID","electionID", "status"]);


    })

    it('should not get a non-existing Region', async () => {


        const response = await request(app)
            .get('/api/v1/region/')
            .send({ regionID: "5e1bb5e507516221677406d3" })
            .expect(404)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        assert.equal(response.body.error, "Region under this id 5e1bb5e507516221677406d3 was not found")


    })

    it('should update an existing Region', async () => {

        let updatedRegion = {

            id: regionID,
            arabicName: "المنطقة الشرقية",
            englishName: "Eastern region",

        }

        const response = await request(app)
            .put('/api/v1/region/')
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
        response.body.data.should.include.keys(["arabicName", "englishName", "regionID","electionID", "status"]);

    })

    it('should not update a non existing Region', async () => {

        const updatedRegion = {

            id: "5e1bb5e507516221677406d3",
            arabicName: "المنطقة الشرقية",
            englishName: "Eastern region",

        }

        const response = await request(app)
            .put('/api/v1/region/')
            .send(updatedRegion)
            .expect(404)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false
        expect(response.body.error).to.be.not.undefined
        expect(response.body.error).to.be.not.null
        assert.equal(response.body.error, "Region under this id 5e1bb5e507516221677406d3 was not found")



    })

    it('should deactivate an existing Region', async () => {

        const deactivateRegion = {
            regionID,
            status: false
        }

        const response = await request(app)
            .put('/api/v1/region/changeRegionStatus')
            .send(deactivateRegion)
            .expect(200)
            .expect('Content-Type', /json/)



        expect(response.status).to.equal(200)
        expect(response.body.data.status).to.be.false;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.status).to.be.eql(deactivateRegion.status)




    })

    it('should activate an existing Region', async () => {

        const activateRegion = {
            regionID,
            status: true
        }

        const response = await request(app)
            .put('/api/v1/region/changeRegionStatus')
            .send(activateRegion)
            .expect(200)
            .expect('Content-Type', /json/)


        expect(response.status).to.equal(200)
        expect(response.body.data.status).to.be.true;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;
        expect(response.body.data.status).to.be.eql(activateRegion.status)
 




    })

    it("should not change non-existing Region\'s status", async () => {

        const deactivateRegion = {
            regionID: '5e1bb5e507516221677406d3',
            status: false
        }

        const response = await request(app)
            .put('/api/v1/region/changeRegionStatus')
            .send(deactivateRegion)
            .expect(404)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(404)
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;
        expect(response.body.error).to.be.a('string')
        assert.equal(response.body.error, "Region under this id 5e1bb5e507516221677406d3 was not found")


    })

    it('should return list of regions ', async () => {

        const response = await request(app)
            .get('/api/v1/region/regions')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status).to.equal(200)
        expect(response.body.regions.length).to.be.greaterThan(0)
        expect(response.body.regions).to.be.an('array')
        expect(response.body.regions[0]).to.be.an('object')
        expect(response.body.regions).to.not.be.null;
        expect(response.body.regions).to.not.be.undefined;


    })

    it('should return list of regions based on selected election', async () => {

        const response = await request(app)
            .get('/api/v1/region/regionsByElection')
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
        response.body.data.should.include.keys(["startDate", "endDate", "electionType"]);
        response.body.data.regions[0].should.include.keys(["arabicName", "englishName", "electionID", "regionID"]);




    })

    it('should return nothing on selecting non-existing election', async () => {

        const response = await request(app)
            .get('/api/v1/region/regionsByElection')
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

    })
})