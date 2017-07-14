var express = require('express');


var app = express();

app.get('/',function(req,res){
  res.send('THIS IS WORKING');
});

app.listen(process.env.PORT);