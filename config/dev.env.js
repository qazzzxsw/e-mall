'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"/api/cosmo-crrc"',
  VUE_APP_CAC: '"htttp://192.168.0.162:5041/cac"',
  VUE_APP_ROUTEPBASE: '""',
})
