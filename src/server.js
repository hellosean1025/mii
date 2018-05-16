const koaStatic = require("koa-static");
const path = require("path");
const fs = require("fs-extra");
const bodyParser = require("koa-body");
const router = require("./router");

function server(config, getApplication) {
  const koa = config.koa;
  koa.proxy = true;
  koa.use(bodyParser({ multipart: true }));
  koa.use(
    router({
      prefix: config.prefix,
      getApplication: getApplication
    })
  );
  koa.use(koaStatic(path.resolve(config.webpath, "www"), { gzip: true }));

  const args = Array.prototype.concat.apply([config.port], arguments);
  return koa.listen.apply(koa, args);
}

module.exports = server;
