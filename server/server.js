var express = require('express');
var path = require('path'); // модуль для парсинга пути
var bodyParser = require('body-parser');
// var testData = require("./testData.json");
const https = require('https');
var cors = require('cors')
var app = express();
app.use(cors())

function get_json(url, callback) {
  https.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var response = JSON.parse(body);
      callback(response);
    });
  });
}

app.use(bodyParser()); // стандартный модуль, для парсинга JSON в запросах
// app.use(express.static(path.join(__dirname, "public")));

app.get('/api/', function(req, res) {
  var url = "https://ethermine.org/api/miner_new/" + req.query.address;
  get_json(url, function (data) {
  // const data = testData;
  console.log("data", data)
  var result = {};
  for (var worker in data.workers) {
    console.log(data.workers[worker]);
    result[worker] = {};
    result[worker].hashrate = data.workers[worker].hashrate;
    result[worker].workerLastSubmitTime = data.workers[worker].workerLastSubmitTime;
    result[worker].reportedHashRate = data.workers[worker].reportedHashRate;
  }
  res.end(JSON.stringify(result));
  });

});
app.listen(3010, function() {
  console.log('Express server listening on port 3010');
});
