
var express = require('express');
var bodyParser = require('body-parser');
var app = new express();
var route = require('./router/route');


 

app.use(bodyParser.json(limit= '20mb'));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});



app.use('/api', route);
var server = app.listen(8000, function(){
     console.log('Express server listening port:'+server.address().port);   
})

module.exports = app;