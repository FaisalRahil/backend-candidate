const assert = require('assert')
const request = require('supertest');
const express = require("express");
const app = express()
const candidates = require('../../../routes/candidates')

app.use(candidates);

describe('candiate route test', ()=> {
    it('should create a candidate', () => {
     
        let candidate = {
            name:"shafiq",
            slug:"aaaaaa",
            description:"Candidate",
            website:"https://www.google.com",
            phone:"2188287623",
            email:"s@lc.com",
            address:"hay anadlus",
            location:{
                type:"Point",
                coordinates:[13.234,32.2334],
                formattedAddress:"hay anadlus",
                street:"Bashir assedwie street",
                city: "tripoli",
                state: "tripoli",
                zipcode: "234232",
                country: "Libya"
                
            },
            careers:"Mobile Development",
            averageRating:5,
            averageCost:250000000
            
       }

       

       request(app)
       .post('/')
       .set({'Content-Type':'application/json'})
       .send(candidate)
       .expect('Content-Type', 'application/json; charset=utf-8')
       .expect(201)
       .end(function(err, res) {
           if (err) throw err;
        
         
         });
     
       
    })


    it('should get exisiting candidates', () => {

        request(app)
        .get('/')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;

            assert.equal(res.body.data,0)
         
            console.error(res)
          });
      
    })

    it('should get an exisiting candidate', () => {
        request(app)
        .get('/5e14de69d46e597f76712b76')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;

          
         
            console.error(res)
          });
       
       
    })

    it('should update an exisiting candidate', () => {
    
    })

    it('should send an error on upding non-existing candidate', () => {
        
        request(app)
        .put('/5e14de69d46e597f76712b78')
        .expect(404)
        .end(function(err, res) {
            if (err) throw err;

            assert.equal(res.body.error,"Candidate not found with id of 5e14de69d46e597f76712b78")
         
            console.error(res)
          });
      
    })

    it('should delete an exisiting candidate', () => {
     
       
    })

    it('should delete an exisiting candidate', () => {
     
       
    })


    it('should request hi routes', () => {
     
        request(app)
        .get('/test')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
         
          });
    })

    it('should request print parameter', () => {
     
        request(app)
        .get('/parm/bye')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
           
          });
    })

    
})