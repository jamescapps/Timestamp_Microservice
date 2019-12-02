// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Handles empty date input.
app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
})

app.get("/api/timestamp/:dateInput", (req, res) => {
  //Variable for value that is input
  var dateValue = req.params.dateInput
  
  //If inputed value is a number...
  if (!isNaN(dateValue)) {
    //Unix time is equal to the input and utc is equal to the formatted date version of the number.
    res.json({ unix: dateValue, utc: new Date(parseInt(dateValue)).toUTCString() })
    //If the input is not valid.
  } else if (new Date(dateValue).toString() === "Invalid Date") {
    res.json({ error: "Invalid Date"})
    //If the input is a valid date.
  } else {
    res.json({ unix: new Date(dateValue).valueOf(), utc: new Date(dateValue).toUTCString() })
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});