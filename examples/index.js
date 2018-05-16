const mii = require('../src/index')
const config = require('./config')

const app = new mii(config);

app.run()