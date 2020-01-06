const assert = require('assert')
const request = require('supertest');
const express = require("express");
const app = express()
const candidates = require('../../../routes/candidates')

app.use(candidates);

describe('candiate route test', ()=> {
    it('should create a candidate', () => {
     
        
    })

    it('should get exisiting candidates', () => {
     
       
    })

    it('should get an exisiting candidate', () => {
     
       
    })

    it('should update an exisiting candidate', () => {
     
       
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
            console.error(res.text)
          });
    })

    
})