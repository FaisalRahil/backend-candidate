const request = require('supertest');
const chai = require('chai');
const { assert, expect, should } = chai;
chai.should();

let app = require("../../../server")


describe('Candidate route test', () => {

    describe('Candidate route test', () => {

        before(() => {

        })

        it('should create a Candidate', async () => {

            const newCandidate = {

            }


        })

        it('should get a Candidate based on _id', async () => {

            
        })

        it('should not get a Candidate based on non-existing _id', async () => {

            
        })

        it('should get a Candidate based on nationalID', async () => {

            
        })


        it('should not get a Candidate based on non-existing nationalID', async () => {

            
        })

        it('should update a Candidate based on _id', async () => {

            
        })

        it('should update a Candidate based on nationalID', async () => {

            
        })

        it('should not update a Candidate based on non-existing _id', async () => {

            
        })

        it('should deactivate a Candidate based on _id', async () => {

            
        })

        it('should activate a Candidate based on nationalID', async () => {

            
        })

        it('should not deactivate a Candidate based on non-existing _id', async () => {

            
        })

        it('should get candidates based on Bureau', async () => {

            
        })

        it('should get candidates based on Election', async () => {

            
        })

        it('should get candidates based on Subconstituency', async () => {

            
        })

    })


    describe('Candidate user credential test', () => {


        it('', async () => {

            
        })

        
    })
})