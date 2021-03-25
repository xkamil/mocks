// openexchangerates api mock
// API DOCS: https://docs.openexchangerates.org/docs/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const usdRates = require('./static/usd_rates.json');
const currencies = require('./static/currencies.json');

// API ROUTES ======================================================


app.get('/api/latest.json', (req, res) => {
  const baseCurrency = req.query.base;
  if(!currencies[baseCurrency]){
    res.status(400).json(createError(400, 'invalid_base', `base: ${baseCurrency} not supported`))
    return;
  }
  const responseBody = {
    disclaimer: "https://openexchangerates.org/terms/",
    license: "https://openexchangerates.org/license/",
    timestamp: Math.round(Date.now() / 1000),
    base: baseCurrency,
    rates: convertRatesFromUsd(baseCurrency)
  }
  res.json(responseBody);
});

app.get('/api/currencies.json', (req, res) => {
  res.json(currencies);
});


// UTILITY =========================================================

function convertRatesFromUsd(targetCurrency){
  const currToUsd = usdRates[targetCurrency];
  const currencyRates = {};
  Object.getOwnPropertyNames(usdRates).forEach(curr => {
      currencyRates[curr] = (usdRates[curr] / currToUsd).toFixed(2);
  }) 
  return currencyRates;
}


function createError(statusCode, message, description){
  return {
  "error": true,
  "status": statusCode,
  "message": message,
  "description": description
  }
}

app.listen(8080, () => console.log(`App listening on port ${port}!`));

