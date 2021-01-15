// Helpers for various tasks
//Dependecies
const crypto = require('crypto')
const config = require('../config')
const https = require('https')
const querystring = require('querystring')

// Container for all the helpers
const helpers = {}

// Parse a JSON string to an object in all cases without throwing
helpers.parseJsonToObject = (str) => {
  try {
    let obj = JSON.parse(str)
  } catch (error) {
    return {}
  }
}

//Create a SHA256 hash
helpers.hash = (str)=>{
  if(typeof(str) == 'string' && str.length > 0){
    const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex')
    return hash
  }else{
    return false
  }
}

// Create a string of random 
helpers.createRandomString = (strLength) => {
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could go into a string
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    let str = '';
    for(i = 1; i <= strLength; i++) {
        // Get a random charactert from the possibleCharacters string
        const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        // Append this character to the string
        str+=randomCharacter;
    }
    // Return the final string
    return str;
  } else {
    return false;
  }
};

//Send an SMS via Twilio
helpers.sendTwilioSms = (phone, msg, callback) => {
  // validate parameters
  phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
  if(phone && msg){
    // Configure teh request payload
    const payload = {
      'From': config.twilio.fromPhone,
      'To': '+48'+phone,
      'Body': msg
    }
    //Stringify the payload
    const stringPayload = querystring.stringify(payload)

    // configure the request details
    const requestDetails = {
      'protocol': 'https:',
      'hostname': 'api.twilio.com',
      'method': 'POST',
      'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
      'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    }

    const req = https.request(requestDetails, (res) => {
      // Grab the status of sent request
      const status = res.statusCode
      // Callback successfully if the request went through
      if(status == 200 || status == 201){
        callback(false);
      } else {
        callback('Status code returned was '+status);
      }
    })
    // Bind to the error event so it doesn't get thrown
    req.on('error',(e) => {
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();
  }else{
    callback('Given parameters were missing or invalid')
  }

}


module.exports = helpers