var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);
app.use(express.static('public'));
var database = [];
fs.readdir('./public/musics',function(err,files){
	var obj = {},xiabiao1,xiabiao2;
	for(var i=0; i<files.length; i++){
		xiabiao1 = files[i].indexOf('-');
		xiabiao2 = files[i].indexOf('.');
		obj = {name:files[i].slice(xiabiao1+1,xiabiao2),duration:'萌杰',singer:files[i].slice(0,xiabiao1),src:'./musics/'+files[i]+''};
		database.push(obj);
	}
});
app.get('/tt',function(req,res){
	res.json(database);
});
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
http.listen(80,function(){
	console.log('listening on *:80');
});