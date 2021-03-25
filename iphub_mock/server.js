// iphub api mock
// API DOCS: https://iphub.info/api

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

// API ROUTES ======================================================

app.get('/ip/:ip', (req, res) => {
  const ip = req.params.ip;

  const responseBody = {
    "ip": ip,
    "countryCode": "PL",
    "countryName": "Poland",
    "asn": 15169,
    "isp": "MOCK",
    "block": 0
  }

  res.json(responseBody);
});


app.listen(port, () => console.log(`App listening on port ${port}!`));

