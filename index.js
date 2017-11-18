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
			let updatedurl = somelongUrl;
			updatedurl.hits+=1;
			UrlModel.findOneAndUpdate({_id:somelongUrl._id}, updatedurl, {new:true}, (err, updatedurl) => {
				if(err){
					res.send(`Update me fat rahi rai!`);
				}	
				console.log(`Updated URL IS ${updatedurl}`);		
			})
			res.redirect(somelongUrl.urllink)
		}
		
	})
})

app.listen(PORT, function(){
	console.log(`server listening on port ${PORT} Jai Bhavani !Ganpati bappa moriya`)
})
