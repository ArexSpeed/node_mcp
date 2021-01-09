// Create and export configuration variables

// Container for all the enviroments
let environments = {};

// Staging (default) enviroment
environments.staging = {
  'port': 3000,
  'envName': 'staging'
}

// Production enviroments
environments.production = {
  'port': 5000,
  'envName': 'production'
}

//Detemine which env was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

//Check that the current environment is one of the env above, if not, default to dtaging
const enviromentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//Export the module
module.exports = enviromentToExport;