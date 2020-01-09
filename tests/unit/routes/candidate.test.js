const assert = require('assert')
const request = require('supertest');
const express = require("express");
const chai = require('chai')
const app = express()
const candidates = require('../../../routes/candidates')

app.use(candidates);

describe('candiate route test', ()=> {
    it('should create a candidate', () => {
     
        const candidate = {
            name:"shafiq",
            slug:"aaaaaa",
            description:"Candidate",
            website:"https://www.google.com",
            phone:"2188287623",
            email:"s@lc.com",
            address:"hay andalus",
            location:{
                type:"Point",
                coordinates:[13.234,32.2334],
                formattedAddress:"hay andalus",
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
        .get('/5e166893db837a963d999160')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;

          
         
            console.error(res)
          });
       
       
    })

    it('should update an exisiting candidate', () => {

        const candidateUpdatedData = {
            name:"shafiq K. El aradi",
            slug:"xmrmxmrxmr",
            description:"Candidate of Tripoli Centeral",
            website:"https://www.google.com",
            phone:"2188287623",
            email:"s@lc.com",
            address:"Tripoli Centeral",
            location:{
                type:"Point",
                coordinates:[32.343,13.45234],
                formattedAddress:"Tripoli Centeral",
                street:"Bashir assedwie street",
                city: "tripoli",
                state: "tripoli",
                zipcode: "234232",
                country: "Libya"
                
            },
            careers:"Other",
            averageRating:10,
            averageCost:260000000
            
       }

        request(app)
        .put('/5e166893db837a963d999160')
        .expect(200)
        .send(candidateUpdatedData)
        .end(function(err, res) {
            if (err) throw err;

            

             assert.ok(res.status)
             chai.assert.isNotNull(res.data)
         
            console.error(res)
          });
    
    })

    it('should send an error on upding non-existing candidate', () => {
        
        const candidateUpdatedData = {
            name:"shafiq K. El aradi",
            slug:"xmrmxmrxmr",
            description:"Candidate of Tripoli Centeral",
            website:"https://www.google.com",
            phone:"2188287623",
            email:"s@lc.com",
            address:"Tripoli Centeral",
            location:{
                type:"Point",
                coordinates:[32.343,13.45234],
                formattedAddress:"Tripoli Centeral",
                street:"Bashir assedwie street",
                city: "tripoli",
                state: "tripoli",
                zipcode: "234232",
                country: "Libya"
                
            },
            careers:"Other",
            averageRating:10,
            averageCost:260000000
            
       }

        request(app)
        .put('/5e14de69d46e597f76712b78')
        .send(candidateUpdatedData)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;

            assert.equal(res.body.error,"Candidate not found with id of 5e14de69d46e597f76712b78")
         
            console.error(res)
          });
      
    })

   

    it('should delete an exisiting candidate', () => {
     
        request(app)
        .delete(`/5e166893db837a963d999160`)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;

            chai.assert.deepEqual(res.body.data,{})
            chai.assert.isObject(res.body.data)
            chai.assert.isTrue(res.body.success)
          });
       
    })

    it('should send an error on trying deleting non-existing candidate', () => {
     
        let id = "5e14de69d46e597f76712b78";

        request(app)
        .delete(`/${id}`)
        .expect(404)
        .end(function(err, res) {
            if (err) throw err;

            chai.assert.equal(res.body.error,`Candidate not found with id of ${id}`)
            chai.assert.isFalse(res.body.success)
          });

       
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