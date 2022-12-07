const { Router } = require('express')
const pkg = require('../../package.json')

const router = new Router()

router.get('/', getRoot)

function getRoot(req, res) {
  console.log('Respondiendo a la solicitud desde root')
  console.log('Enviando respuesta al cliente')

  res.send({
    name: pkg.name,
    version: pkg.version,
    enviroment: process.env.ENV,
  })
}

module.exports = router