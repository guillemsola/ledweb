var express = require('express');
var request = require('request');
var app = express()

app.use(express.static('public'));

app.post('/message', function (req, res) {
  var message = req.originalUrl.split('?')[1];
  console.log("Received:" + message);
  request('http://192.168.1.210?' + message, function (error, response, body) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    }
    else {
      console.log('statusCode:', response && response.statusCode);
      res.sendStatus(200);
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});