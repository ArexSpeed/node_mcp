const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

// Env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

//Init cache
let cache = apicache.middleware //store api for how many we want (ex 2 mins)

router.get('/', cache('2 minute'), async (req, res, next) => {

  try {

    //console.log(url.parse(req.url).query) -> for /api?q=Boston&hello=world -> { q: Boston, hello: world }

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query
    })
    const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    // Log the request to the public API
    if(process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`)
    }

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
  
})

module.exports = router;