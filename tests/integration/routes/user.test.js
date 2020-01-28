const request = require('supertest');
const chai = require('chai');
const { assert, expect, should } = chai;
chai.should();

let app = require("../../../server")


describe('User route test', () => {

    let token = undefined

    let user = {

        name:'Superuser',
        username:'root',
        emial:'',
        password:'root',
        level:1

    }
    

    before(()=>{

    })

    it('should create User', async () => {

       const request = await request(app).post('/ap/v1/user')
       .send(user)
       .expect(201)
       .expect('Content-Type', /json/)


    })

    it('should get a user', () => {


    })

    it('should nod get a non-existing user', () => {


    })

    it('should update a user', () => {


    })

    it('should not update a non-existing user', () => {


    })

    it('should update a user\'s state', () => {


    })

    it('should logout', () => {


    })


})