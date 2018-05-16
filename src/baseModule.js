class baseModule{
  constructor(config){
    this.defaultController = 'site'
    this._basepath = config.basepath;
    this._modules = {}
  }

  get basepath(){
    return this._basepath;
  }
}

module.exports = baseModule