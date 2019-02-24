//During the test the env variable is set to test
process.env.NODE_ENV = 'test';



//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let merchantWebsite = require('../apps/merchant-website-server');
var express = require('express');
var merchantApp = express();
merchantWebsite(merchantApp);

let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
   /*
   
    beforeEach((done) => { //Before each test we empty the database
        Book.remove({}, (err) => { 
           done();           
        });        
    });
    */
/*
  * Test the /GET route
  */
 
  /*
  describe('/post init', () => {
      it('it star 3d-secure2 on mercury payment gateway', (done) => {
        chai.request(merchantApp)
            .post('/merchant-website/init')
            .end((err, res) => {
                  should(res).have.status(303);
                  should(res).should.redirectTo('http://localhost:3001/phoenix/init');
              done();
            });
      });
  });
  */

});