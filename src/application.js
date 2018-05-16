const defaultConfig = require("./config");
const path = require("path");
const router = require("./router");
const fs = require("fs-extra");
const baseModule = require("./baseModule");
const utils = require("./utils");

class application {
  constructor(config = {}) {
    if (!config.basepath) {
      throw new error("Config error: basepath is not empty");
    }

    this._basepath = config.basepath;
    this._config = config;

    // 保存 controller 实例
    this._controllers = {};

    let controllerPath = path.resolve(
      config.basepath,
      config.defaultControllerPath
    );

    this.initController(controllerPath);
    this.getController = this.getController.bind(this);
  }

  get basepath() {
    return this._basepath;
  }

  getController(name) {
    return this._controllers[name];
  }

  initController(dir) {
    const controllerFiles = fs.readdirSync(dir);

    controllerFiles.forEach(file => {
      if (path.extname(file) !== ".js") return null;
      let name = utils.endWith(file, this._config.defaultControllerSuffix + '.js');      
      if (name) {
        if(!utils.moduleNameRegexp.test(name)){
          throw new Error(`Controller Name "${name}" 仅容许由字母、数字和中横杠组成，且首位必需是小写字母`)
        }
        let controllerPath = path.resolve(dir, file);
        try {
          let controller = require(controllerPath);
          this._controllers[name] = controller;
        } catch (err) {
          err.message += `Load controller failed in the "${controllerPath}"\n`;
          throw err;
        }
      }
    });
  }

  async render(ctx, controllerName, actionName = "") {    
    if (process.env.NODE_ENV !== "production") {
      if (!utils.routerNameRegexp.test(controllerName)) {
        console.warn(
          `Url 包含的 Controller Path "${controllerName}" 仅容许由小写字母和中横杠组成，比如源文件 "userProfileController"，实际的访问路径为 "user-profile"`
        );
      }

      if (!utils.routerNameRegexp.test(actionName)) {
        console.warn(
          `Url 包含的 Action Path "${actionName}" 仅容许由小写字母和中横杠组成，比如源码Action名为 "getListByIdAction"，实际的访问路径为 "list-by-id"`
        );
      }
    }

    let controller = this.getController(controllerName);
    if(!controller){
      ctx.status = 404;
      return ctx.body = `No Fount`; 
    }
    let ctrl = new controller(
      {
        controllerName,
        actionName
      },
      ctx
    );

    if ("init" in ctrl) {
      await ctrl.init();
    }

    let actionMethodName =
      ctx.method.toLowerCase() + utils.pathToMethodName(actionName) + "Action";
    if (!(actionMethodName in ctrl)) {
      actionMethodName = "any" + utils.pathToMethodName(actionName) + "Action";
    }
    if (actionMethodName in ctrl) {
      await ctrl[actionMethodName].apply(ctrl);
    } else if ("missAction" in ctrl) {
      await ctrl.missAction.apply(ctrl);
    } else {
      ctx.status = 404;
      ctx.body = `No Fount!!!`;
    }
  }
}

module.exports = application;
