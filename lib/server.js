const http = require('http')
const express = require('express')
const morgan = require('morgan') 
const expressBodyParser = require('body-parser')

const cors = require('cors')

const { routers } = require('../components')

class Server {
  constructor(config, database) {
    this.config = config
    this.database = database

    console.log('Creando instancia de aplicación express y servidor HTTP')
    this.app = express()
    this._httpServer = http.createServer(this.app)
    console.log('Instancia de aplicación express y servidor HTTP creada')

    this.app.set('trust proxy', 1)

    this._setupExpressMiddleware()
    this._setupExpressRoutes()
    /* this._setupErrorHandler() */
  }

  async listen() {
    console.log('Intentando vincular el servidor HTTP a %s', this.config.server.url)

    this._httpServer.listen(this.config.server.port || 3000, (err) => {
      if (err) {
        return Promise.reject(err)
      }

      console.log('Servidor HTTP vinculado')
      return Promise.resolve()
    })
  }

  async close() {
    this._httpServer.close((err) => {
      if (err) {
        return Promise.reject(err)
      }
      return Promise.resolve()
    })
  }

  _setupExpressMiddleware() {
    this.app.request.config = this.config
    this.app.request.db = this.database.sqlite3
    /* this.app.request.pingDatabase = (...args) => this.database.ping(...args) */

    const requestQuery = () => (req, res, next) => {
      req.select = req.query.select
      req.sort = req.query.sort
      req.populate = req.query.populate
      req.offset = req.query.offset ? parseInt(req.query.offset, 10) : 0
      req.limit = req.query.limit
        ? Math.min(parseInt(req.query.limit, 10), this.config.server.maxResultsLimit)
        : this.config.server.maxResultsLimit

      delete req.query.sort
      delete req.query.offset
      delete req.query.limit
      delete req.query.select
      delete req.query.populate

      next(null)
    }

    console.log('Adjuntando middlewares a la aplicación express')

    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(cors())

    this.app.use(expressBodyParser.raw())
    this.app.use(expressBodyParser.json({ limit: '50mb' }))
    this.app.use(expressBodyParser.urlencoded({ extended: true }))
    this.app.use(requestQuery())
    console.log('Middlewares adjuntos')
  }

  _setupExpressRoutes() {
    console.log('Adjuntando enrutadores de recursos a la aplicación Express')
    /* this.app.get('/favicon.ico', (req, res) => res.status(204)) */

    this.app.use('/', routers.status)
    /* this.app.use('/users', routers.user) */
    this.app.use('/api/eventos', routers.event);
    this.app.use('/api/productos', routers.product);  
    this.app.use('/api/ventas', routers.sale);

    console.log('Enrutadores de recursos adjuntos')
  }

/*     _setupErrorHandler() {
    this.logger.verbose('Attaching error handler')
    // eslint-disable-next-line no-unused-vars
    this.app.use((err, req, res, next) => {
      if (!err.statusCode) {
        err.statusCode = Server.statusCodeByErrorName[err.name] || 500
      }
      const isMongooseValidationError = err instanceof Mongoose.Error.ValidationError
      if (isMongooseValidationError) {
        req.logger.debug('Mongoose validation error', JSON.stringify(err))
        res.status(err.statusCode).json({
          errors: Object.keys(err.errors).map((field) => ({
            field,
            message: err.errors[field].message,
            kind: err.errors[field].kind,
          })),
        })
      } else {
        req.logger.error(err.toString(), err)
        req.logger.verbose('Responding to client', err.toString())
        res.status(err.statusCode).send(err.toString())
      }
    })
    this.logger.verbose('Error handler attached')
  } */
}

/* Server.statusCodeByErrorName = {
  ValidationError: 400,
  CastError: 400,
  UnauthorizedError: 401,
}  */

module.exports = Server