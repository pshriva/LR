import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import amqp from 'amqplib/callback_api';
import {urlSchema} from './urlSchema';
const UrlModel = mongoose.model('urlSchema', urlSchema);
const PORT = 3007;
var mongourl =  'mongodb://utsav:1234@40.121.205.206:27017/urldb'; 
var UrlMongoConnection = mongoose.connect(mongourl, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.route('/:short').get((req, res) => {
    //res.json("Home Page");
    UrlModel.findOne({shortlink:req.params.short}, (err, somelongUrl) => {
		if(err){
			res.send(`Mongo GET me fat raha hai ${err}`);
		}
		if(somelongUrl != null){
			res.redirect(somelongUrl.urllink)
		}
		
	})
})

app.listen(3007, function(){
	console.log(`server listening on port ${PORT} Jai Bhavani !Ganpati bappa moriya`)
})
