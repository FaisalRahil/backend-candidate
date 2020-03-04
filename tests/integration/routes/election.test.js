const request = require('supertest');
const colors = require("colors");
const chai = require('chai');
const { assert, expect, should } = chai;
chai.should();


const app = require("../../../server");

describe('election route test', () => {

    let electionID = undefined;
    let jwToken = undefined

    before(async ()=> {
        const response = await request(app)
        .get('/api/v1/user/')
        .send({
            email:"root@hnec.ly",
            password:"aaaaaa"
        })
       
        jwToken = response.body.token;
       
    })

    it('should not response on requesting non-existing route', async () => {

        const response = await request(app)
            .get('/api/v1/election/election')
            .set({'Authorization':jwToken})
            .expect(404)
            .expect('Content-Type', 'text/html; charset=utf-8')

        expect(response.status, colors.blue('status should be 200')).to.equal(404)
        expect(response.body.elections).to.be.undefined;


    })

    it('should create a new Election', async () => {

        const newElection = {
            startDate: '2016-04-13',
            endDate: '2016-04-14',
            electionType: 'Parliament Election',
        }

        const response = await request(app)
            .post('/api/v1/election/')
            .set({'Authorization':jwToken})
            .send(newElection)
            .expect(201)
            .expect('Content-Type', /json/)

        electionID = response.body.data._id;

        expect(response.status, colors.blue('status should be 201')).to.equal(201)
        expect(response.body).to.not.be.null
        expect(response.body).to.not.be.undefined
        expect(response.body.success).to.be.true
        expect(response.body.data).to.not.be.null
        expect(response.body.data).to.not.be.undefined
        expect(response.body.data.electionType).to.be.eql(newElection.electionType)
        response.body.data.should.include.keys(["startDate", "endDate", "electionType"]);




    })

    it('should get an existing Election', async () => {


        const response = await request(app)
            .get('/api/v1/election/')
            .set({'Authorization':jwToken})
            .send({ electionID: `${electionID}` })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.status, colors.blue('status should be 200')).to.equal(200)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;

    })

    it('should not get non-existing Election', async () => {

       
            const response = await request(app)
                .get('/api/v1/election/')
                .set({'Authorization':jwToken})
                .send({ electionID: `5e195075705b65d4a1c52fb4` })
                .expect(404)
                .expect('Content-Type', /json/)

            expect(response.status, colors.blue('status should be 404')).to.equal(404)
            expect(response.body).to.not.be.null;
            expect(response.body).to.not.be.undefined;
            expect(response.body.success).to.be.false;
            expect(response.body.error).to.not.be.null;
            expect(response.body.error).to.not.be.undefined;


    })

    it('should update an existing Election', async () => {

        const updateElection = {
            electionID: `${electionID}`,
            startDate: '2018-04-13',
            endDate: '2018-04-14',
            electionType: 'Constitution Referendum'
        }

        const response = await request(app)
            .put('/api/v1/election/')
            .set({'Authorization':jwToken})
            .send(updateElection)
            .expect(200)
            .expect('Content-Type', /json/)



        expect(response.status, colors.blue('status should be 200')).to.equal(200)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;



    })

    it('should not update non-existing Election', async () => {

            const updateElection = {
                electionID: `5e195075705b65d4a1c52fb4`,
                startDate: '2018-04-13',
                endDate: '2018-04-14',
                electionType: 'Constitution Referendum'
            }

            const response = await request(app)
                .put('/api/v1/election/')
                .set({'Authorization':jwToken})
                .send(updateElection)
                .expect(404)
                .expect('Content-Type', /json/)


            expect(response.status, colors.blue('status should be 404')).to.equal(404)
            expect(response.body).to.not.be.null;
            expect(response.body).to.not.be.undefined;
            expect(response.body.success).to.be.false;
            expect(response.body.error).to.not.be.null;
            expect(response.body.error).to.not.be.undefined;


    })

    it('should deactivate an existing Election', async () => {

        const deactivateElection = {
            electionID: `${electionID}`,
            state: false
        }

        const response = await request(app)
            .put('/api/v1/election/toggleElectionState')
            .set({'Authorization':jwToken})
            .send(deactivateElection)
            .expect(200)
            .expect('Content-Type', /json/)



        expect(response.status, colors.blue('status should be 200')).to.equal(200)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.data.state).to.be.false;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;



    })

    it('should activate an existing Election', async () => {

        const deactivateElection = {
            electionID: `${electionID}`,
            state: true
        }

        const response = await request(app)
            .put('/api/v1/election/toggleElectionState')
            .set({'Authorization':jwToken})
            .send(deactivateElection)
            .expect(200)
            .expect('Content-Type', /json/)


        expect(response.status, colors.blue('status should be 200')).to.equal(200)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.data.state).to.be.true;
        expect(response.body.success).to.be.true;
        expect(response.body.data).to.not.be.null;
        expect(response.body.data).to.not.be.undefined;



    })

    it("should not change non-existing Election\'s state", async () => {

        const deactivateElection = {
            electionID: '5e195075705b65d4a1c52fb4',
            state: false
        }

        const response = await request(app)
            .put('/api/v1/election/toggleElectionState')
            .set({'Authorization':jwToken})
            .send(deactivateElection)
            .expect(404)
            .expect('Content-Type', /json/)



        expect(response.status, colors.blue('status should be 404')).to.equal(404)
        expect(response.body).to.not.be.null;
        expect(response.body).to.not.be.undefined;
        expect(response.body.success).to.be.false;
        expect(response.body.error).to.be.not.undefined;
        expect(response.body.error).to.be.not.null;


    })

    it('should return list of elections ', async () => {

        const response = await request(app)
            .get('/api/v1/election/elections')
            .set({'Authorization':jwToken})
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')


        expect(response.status, colors.blue('status should be 200')).to.equal(200)
        expect(response.body.elections).to.be.not.empty
        expect(response.body.elections, colors.blue('expected to be array')).to.be.an('array')
        expect(response.body.elections[0], colors.blue('expected to be object')).to.be.an('object')
        expect(response.body.elections).to.not.be.null;
        expect(response.body.elections).to.not.be.undefined;



    })
})
