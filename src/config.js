const koa = require('koa')
module.exports = {
  koa: new koa(),
  prefix: '/api',
  port: 8888,
  defaultApplication: 'app',
  defaultControllerPath: 'controllers',
  defaultModulePath: 'modules',
  defaultLogPath: 'logs',
  defaultModelPath: 'models',
  defaultControllerSuffix: 'Controller',
  defaultModuleSuffix: 'Module'
}