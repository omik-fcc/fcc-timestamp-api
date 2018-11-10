// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

// heavy random testing ahead

app.get("/api/timestamp/", function (req,res) {
  
  var ts = Math.round((new Date()).getTime() / 1000);
  res.send(unixTimestamp(ts));
});


app.get("/api/timestamp/:time", function (req, res) {
  // do sumthin
  var daTime = unixTimestamp(req.params.time);

  //send sumthin
  res.send(daTime);
});

function unixTimestamp(t) {
  var response = {
    unix: "",
    utc: ""
  };

  var dateCheck = /^\d{1,4}-\d{2}-\d{2}/;
  var isNumberCheck = /^\d{1,12}$/;

  if (dateCheck.test(t)) {
    response.unix = Date.parse(t);
    response.utc = new Date(response.unix).toUTCString();
  } else if (isNumberCheck.test(t)) {
    response.unix = t;
    response.utc = new Date(t * 1000).toUTCString()
  } else {
    response.unix = "error";
    response.utc = "Invalid Date"
  }

  return response;
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
