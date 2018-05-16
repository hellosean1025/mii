const path = require('path')
const fs = require('fs-extra');



module.exports = function(options){
  const {prefix, getApplication} = options;  
  return async function(ctx, next){
    
    if(ctx.path.indexOf(prefix) === 0){
      let pathname = ctx.path.substr(prefix.length).split('/').filter(item => item != '');
      let moduleName = 'app'
      let controllerName = ''
      let actionName = ''

      if(pathname.length === 3){
        moduleName = pathname[0]
        controllerName = pathname[1]
        actionName = pathname[2]
      }else if(pathname.length === 2){
        controllerName = pathname[0]
        actionName = pathname[1]
      }else{
        return await next()
      }
      let app = getApplication(moduleName)
      if(!app) return await next()
      return await app.render(ctx, controllerName, actionName)
    }
    return await next()
  };
}