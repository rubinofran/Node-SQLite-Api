const { Router } = require('express')
const pkg = require('../../package.json')

const router = new Router()

router.get('/', getRoot)
/* router.get('/status', getStatus) */

function getRoot(req, res) {
  console.log('Respondiendo a la solicitud desde root')
  console.log('Enviando respuesta al cliente')

  res.send({
    name: pkg.name,
    version: pkg.version,
    enviroment: process.env.ENV,
  })
}

/* async function getStatus(req, res, next) {
  console.log('Respondiendo a la solicitud de estado')
  
  try {
    const result = await req.pingDatabase()

    if (!result || !result.ok) {
      return res.sendStatus(503)
    }

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
} */

module.exports = router