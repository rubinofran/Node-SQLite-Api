const requireAll = require('require-all')
const toCamelCase = require('to-camel-case')

const components = requireAll({
  dirname: __dirname,
  recursive: true,
  filter: /(route)\.js$/,
  map: (name) => toCamelCase(name),
})

const routers = {}

Object.keys(components).forEach((component) => {
  routers[component] = components[component].route
})

module.exports = { routers }