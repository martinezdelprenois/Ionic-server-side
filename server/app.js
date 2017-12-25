var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 8080;
var review = require('./reviewmodel');
var db = 'mongodb://localhost/reviewapp';
var cors = require('cors');
var methodOverride = require('method-override');
var morgan = require('morgan');

mongoose.Promise = global.Promise; 
mongoose.connect(db, { useMongoClient: true });

// dealing with the connection just right below 
var dbs = mongoose.connection;
 dbs.on('error', console.error.bind(console, 'connection error:'));
 dbs.once('open', function(){
 	console.log('successfully connected');
 });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


app.get('/', (req,res)=>{
	res.send('happy reviews');
});


// get all reviews just right below
app.get('/reviews', (req,res)=>{
	console.log('getting all reviews');
	review.find({})
	.exec()
	.then((reviews) => {
		console.log(reviews);
		res.json(reviews);
	})
	.catch((err)=>{
		res.send('error occured');
	});
});


// GET INDIVIDUAL reviews
app.get('/reviews/:id', (req,res)=>{
	console.log('getting one review');
	review.findOne({
		_id:req.params.id
	})
	.exec()
	.then((reviews)=>{
		console.log(reviews);
		res.json(reviews);
	})
	.catch((err)=>{
		res.send('error trying to get single reviews');
	});
});

//GETTING TO POST
app.post('/review', (req,res)=>{
	var newreview = new review();

	newreview.title = req.body.title;
	newreview.description = req.body.description;
	

	newreview.save((err,review)=>{
		if(err){
			res.send('error saving review');
		}
		else{
			console.log(review);
			res.send(review);
		}
	});
});

// UPDATING THE review ID
app.put('/review/:id', function(req,res){
	var newreview = new review();
	review.findOneAndUpdate({
		_id:req.params.id
	}, {$set: {title:req.body.title}}, {upsert:true},
function(err, newreview){
	if(err){
		console.log("error occured");
	}

	else {
		console.log(newreview);
		res.send(204);
	}
});
});

// DELETING A BOOK
app.delete('/review/:id', (req,res)=>{
	Book.findOneAndRemove({
		_id:req.params.id
	}, (err,review)=>{
		if(err){
			res.send('error deleting');
		}
		else{
			console.log(review);
			res.send(204);
		}
	});

});
//APP LISTENING TO PORT
app.listen(port,function(){
	console.log('app listening on port' + port);
});