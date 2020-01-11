const request = require('supertest');
const app = require("../../../server");
const { assert, expect } = require('chai')
const colors = require("colors");



describe('election route test', () => {

    let electionID = undefined;
    it('should not response on requesting non-existing route', (done) => {

        request(app)
            .get('/api/v1/election/election')
            .expect(404)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .end((error, response) => {
                if (error) throw error

                expect(response.status, colors.blue('status should be 200')).to.equal(404)
                expect(response.body.elections).to.be.undefined;

                done()
            })


    })

    it('should create a new Election', (done) => {

        const newElection = {
            startDate: '2016-04-13',
            endDate: '2016-04-14',
            electionType: 'Parliament Election',
        }

        request(app)
            .post('/api/v1/election/')
            .send(newElection)
            .expect(201)
            .expect('Content-Type', /json/)
            .end((error, response) => {

                electionID = response.body.data._id;

                expect(response.status, colors.blue('status should be 201')).to.equal(201)
                expect(response.body).to.not.be.null;
                expect(response.body).to.not.be.undefined;
                expect(response.body.success).to.be.true;
                expect(response.body.data).to.not.be.null;
                expect(response.body.data).to.not.be.undefined;

                done()
            })


    })

    it('should get an existing Election', (done) => {



        request(app)
            .get('/api/v1/election/')
            .send({ electionID: `${electionID}` })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((error, response) => {


                expect(response.status, colors.blue('status should be 200')).to.equal(200)
                expect(response.body).to.not.be.null;
                expect(response.body).to.not.be.undefined;
                expect(response.body.success).to.be.true;
                expect(response.body.data).to.not.be.null;
                expect(response.body.data).to.not.be.undefined;

                done()
            })


    })

    it('should not get non-existing Election', (done) => {


        try {
            request(app)
                .get('/api/v1/election/')
                .send({ electionID: `5e195075705b65d4a1c52fb4` })
                .expect(404)
                .expect('Content-Type', /json/)
                .end((error, response) => {


                    expect(response.status, colors.blue('status should be 404')).to.equal(404)
                    expect(response.body).to.not.be.null;
                    expect(response.body).to.not.be.undefined;
                    expect(response.body.success).to.be.false;
                    expect(response.body.error).to.not.be.null;
                    expect(response.body.error).to.not.be.undefined;

                    done()
                })
        } catch{

        }



    })

    it('should update an existing Election', (done) => {

        const updateElection = {
            electionID: `${electionID}`,
            startDate: '2018-04-13',
            endDate: '2018-04-14',
            electionType: 'Constitution Referendum'
        }

        request(app)
            .put('/api/v1/election/')
            .send(updateElection)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((error, response) => {


                expect(response.status, colors.blue('status should be 200')).to.equal(200)
                expect(response.body).to.not.be.null;
                expect(response.body).to.not.be.undefined;
                expect(response.body.success).to.be.true;
                expect(response.body.data).to.not.be.null;
                expect(response.body.data).to.not.be.undefined;

                done()
            })


    })

    it('should not update non-existing Election', (done) => {

        try {

            const updateElection = {
                electionID: `5e195075705b65d4a1c52fb4`,
                startDate: '2018-04-13',
                endDate: '2018-04-14',
                electionType: 'Constitution Referendum'
            }

            request(app)
                .put('/api/v1/election/')
                .send(updateElection)
                .expect(404)
                .expect('Content-Type', /json/)
                .end((error, response) => {


                    expect(response.status, colors.blue('status should be 404')).to.equal(404)
                    expect(response.body).to.not.be.null;
                    expect(response.body).to.not.be.undefined;
                    expect(response.body.success).to.be.false;
                    expect(response.body.error).to.not.be.null;
                    expect(response.body.error).to.not.be.undefined;

                    done()
                })

        } catch{

        }


    })

    it('should deactivate an existing Election', (done) => {

        const deactivateElection = {
            electionID: `${electionID}`,
            status: false
        }

        request(app)
            .put('/api/v1/election/changeElectionStatus')
            .send(deactivateElection)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((error, response) => {


                expect(response.status, colors.blue('status should be 200')).to.equal(200)
                expect(response.body).to.not.be.null;
                expect(response.body).to.not.be.undefined;
                expect(response.body.data.status).to.be.false;
                expect(response.body.success).to.be.true;
                expect(response.body.data).to.not.be.null;
                expect(response.body.data).to.not.be.undefined;

                done()
            })


    })

    it('should activate an existing Election', (done) => {

        const deactivateElection = {
            electionID: `${electionID}`,
            status: true
        }

        request(app)
            .put('/api/v1/election/changeElectionStatus')
            .send(deactivateElection)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((error, response) => {


                expect(response.status, colors.blue('status should be 200')).to.equal(200)
                expect(response.body).to.not.be.null;
                expect(response.body).to.not.be.undefined;
                expect(response.body.data.status).to.be.true;
                expect(response.body.success).to.be.true;
                expect(response.body.data).to.not.be.null;
                expect(response.body.data).to.not.be.undefined;

                done()
            })


    })

    it("should not change non-existing Election\'s status", (done) => {

        const deactivateElection = {
            electionID: '5e195075705b65d4a1c52fb4',
            status: false
        }

        try {

            request(app)
                .put('/api/v1/election/changeElectionStatus')
                .send(deactivateElection)
                .expect(404)
                .expect('Content-Type', /json/)
                .end((error, response) => {


                    expect(response.status, colors.blue('status should be 404 ')).to.equal(404)
                    expect(response.body).to.not.be.null;
                    expect(response.body).to.not.be.undefined;
                    expect(response.body.success).to.be.false;
                    expect(response.body.error).to.be.not.undefined;
                    expect(response.body.error).to.be.not.null;

                    done()
                })

        } catch{

        }


    })

    it('should return list of elections ', (done) => {

        request(app)
            .get('/api/v1/election/elections')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((error, response) => {


                expect(response.status, colors.blue('status should be 200')).to.equal(200)
                expect(response.body.elections.length, '').to.be.greaterThan(0)
                expect(response.body.elections, colors.blue('expected to be array')).to.be.an('array')
                expect(response.body.elections[0], colors.blue('expected to be object')).to.be.an('object')
                expect(response.body.elections).to.not.be.null;
                expect(response.body.elections).to.not.be.undefined;

                done()
            })


    })
})
