var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
//var confData=require('conf/Data-dev.js')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_VERSION:new Date(),
  //CONF_DATA:confData
  ENV_DEV:true,
  API_URL_ROOT:'"http://localhost:9000/api"',
  API_URL_GET_SERVER_LIST:'"http://center.doom.dragonest.net:9000/api/getserverlist"'
})
