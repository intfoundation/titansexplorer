'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  rpcHost: '101.32.74.50',
  rpcPort: '8555',
})
