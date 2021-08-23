const base64url = require('base64url');
const crypto = require('crypto');
const signatureFunction = crypto.createSign('RSA-SHA256');
const verifyFunction = crypto.createVerify('RSA-SHA256');
const fs = require('fs');

// ISSUANCE 
const headerObj = {
  alg: 'RS256',
  typ: 'JWT'
};

const payloadObj = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022
};

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const base64UrlHeader = base64url(headerObjString);
const base64UrlPayload = base64url(payloadObjString);

console.log(base64UrlHeader);

signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload);
signatureFunction.end();

const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf-8');
const signatureBase64 = signatureFunction.sign(PRIV_KEY, 'base64');

const signatureBase64Url = base64url.fromBase64(signatureBase64);

// VERIFICATION

// example JWT from site
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const jwtParts = JWT.split('.');

// //console.log(jwtParts);

const headerInBase64UrlFormat = jwtParts[0];
const payloadInBase64UrlFormat = jwtParts[1];
const signatureInBase64UrlFormat = jwtParts[2];

verifyFunction.write(headerInBase64UrlFormat + '.' + payloadInBase64UrlFormat);
verifyFunction.end();

const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat);

const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf-8');

const signatureIsValid = verifyFunction.verify(PUB_KEY, jwtSignatureBase64, 'base64');

// const decodedHeader = base64url.decode(headerInBase64UrlFormat);
// const decodedPayload = base64url.decode(payloadInBase64UrlFormat);
// const decodedSignature = base64url.decode(signatureInBase64UrlFormat);

// console.log(decodedHeader);
// console.log(decodedPayload);
