const config = require("config");
const Api = require("./lib/api");

const api = new Api(config);
api.Api = Api;

module.exports = api;