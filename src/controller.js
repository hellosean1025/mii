module.exports = class controller{
  constructor(config, ctx){
    this.ctx = ctx;
    this.params = Object.assign(
      {},
      ctx.request.query,
      ctx.request.body,
      ctx.params
    );
    this.controllerName = config.controllerName;
    this.actionName = config.actionName;
  }

  render(data){
    return this.ctx.body = data;
  }
}