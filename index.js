/**
 * Created by sanjaybalakrishnan on 14/05/15.
 */
var express = require('express');
var app = express();
var user=require('./User');
var mongoose=require('mongoose');
var mk= require('mortalkombat');
var redis = require("redis");
var client = redis.createClient();
var server;

mongoose.connect('mongodb://localhost/test');
client.on("error", function (err) {
    console.log("Error " + err);
});

var Gamer = mongoose.model('Gamer', { name: String ,phoneNumber:Number});

app.get('/redis', function (req, res) {
    client.set("key_test", mk.get(), redis.print);
    client.get("key_test",function(err,result){
        if(err){
            console.log('Err occured');
            res.status(400).json({status:'failure',message:'Err occurred'});
        }
        else{
            console.log('Welcome '+result);
            res.status(200).json({status:'success',message:'Welcome '+result});
        }
    });
});
app.get('/mongo', function (req, res) {
    var gamer = new Gamer({ name: mk.get(),phoneNumber:12345 });
    gamer.save(function (err,newGamer) {
        if(err){
            console.log('Err occured');
            res.status(400).json({status:'failure',message:'Err occurred'});
        }
        else{
            console.log('Welcome '+newGamer.name);
            res.status(200).json({status:'success',message:'Welcome '+newGamer.name});
        }
    });
});
app.get('/redis-mongo', function (req, res) {
    res.status(200).json({status:'suceess',message:'hello world test'});
    console.log({success:'true'});
});

if(process.env.NODE_ENV){
    console.log('development');
    if(process.env.NODE_ENV=='dev'){
        start();
    }
}

function start(){
    server= app.listen(3000, function () {
        console.log('test app started ');
    });
}
function stop(){
    console.log('test app stopped ');
    server.close();
}

exports.start = start;
exports.stop=stop;
exports.app = app;