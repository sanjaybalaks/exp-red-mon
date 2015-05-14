/**
 * Created by sanjaybalakrishnan on 14/05/15.
 */
var assert   = require('assert');
var should   = require('should');
var request  = require('supertest');
var url ='http://localhost:3000';
var server=require('../index');
var mongoose=require('mongoose');
var mk= require('mortalkombat');
var redis = require("redis");
var client = redis.createClient();
var express = require('express');
var app = express();


client.on("error", function (err) {
    console.log("Error " + err);
});
describe('Express Test', function() {
    before(function(done) {
server.start();
        done()
    });

    after(function(done) {
        server.stop();
        done();
    });

    it('should pass first test', function(done){
        request(url)
            .get('/mongo')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
    });
    it('should pass second test', function(done){
        request(url)
            .get('/redis')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                done();
            });
    });

});