// Request handlers

// Dependecies
const _data = require('./data')
const helpers = require('./helpers')

//Define the handlers
const handlers = {};

// Ping handlers
handlers.ping = (data, callback) => {
  callback(200)
}

//handlers users
handlers.users = (data, callback) => {
  const acceptableMethods = ['post', 'get', 'put', 'delete']
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback)
  }else{
    callback(405)
  }
}

//Container
handlers._users = {}

// Users - post
// Required data: firstName, lastName, phone, password, toAgreement
handlers._users.post = (data, callback) => {
  //Check that all required fields are filed out
  const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false
  const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false
  const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false

  if(firstName && lastName && phone && password & tosAgreement){
    // Make sure that the user doesnt already exist
    _data.read('users', phone, (err, data)=>{
      if(err){
        // Hash password
        const hashedPassword = helpers.hash(password)
      }else{
        // User already exist
        callback(400,{'Error': 'A user with that phone already exist'})
      }
    })
  }else{
    callback(400,{'Error':'Missing required field'})
  }

}
// Users - get
handlers._users.get = (data, callback) => {

}
// Users - put
handlers._users.put = (data, callback) => {

}
// Users - delete
handlers._users.delete = (data, callback) => {

}


//Not found handler
handlers.notFound = (data, callback) => {
  callback(404)
}


module.exports = handlers
