/**
 * 1. 路径中多个单词时，使用中划线 `-` 来连接
   2. 不允许在路径中出现大写字母（查询参数名称除外）
 */

const controller = require('./controller')
const application = require('./application')
const server = require('./server')
const path = require('path')
const utils = require('./utils')
const fs= require('fs-extra')

const defaultConfig = require("./config");

class mii {
  constructor(config){
    if(!config.webpath){
      throw new Error('Global config error: webpath is not empty.')
    }

    this._config = config = Object.assign({}, defaultConfig, config);

    this.webpath = config.webpath;
    this.basepath = path.resolve(config.webpath, config.defaultApplication)
    this._applications = {}

    this.loadApplication(config.defaultApplication, this.basepath)
    this.loadModules()
    
  }

  loadModules(){
    let modulesPath = path.resolve(this.webpath, this._config.defaultModulePath)
    if(!utils.dirExist(modulesPath)){
      return;
    }
    let modules = fs.readdirSync(modulesPath);
    modules.forEach(modulePath=>{
      let name = utils.endWith(modulePath, this._config.defaultModuleSuffix);
      if(name){
        this.loadApplication(name, path.resolve(modulesPath, modulePath))
      }
    })
  }

  getConfig(name){
    if(name)return this._config[name]
    return this._config;
  }

  getApplication(name){
    return this._applications[name]
  }

  getApplicationConfig(name, basepath){
    return Object.assign({}, this.getConfig(), {
      basepath: basepath,
      name: name
    })
  }

  loadApplication(name, basepath){
    let app= new application(this.getApplicationConfig(name, basepath))
    this._applications[name] = app;
  }

  run(){
    return server(this.getConfig() ,this.getApplication.bind(this))
  }
}

mii.controller = controller;

module.exports = mii;
