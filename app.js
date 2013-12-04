var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('...');
});


app.use(express.basicAuth('arabiaweather', 'arabia@weather@windpush'));

console.log(__dirname + '/adminArea');
app.use("/adminArea",express.static(__dirname + '/adminArea'));

app.listen(8080);
