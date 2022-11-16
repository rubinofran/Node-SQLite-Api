const Server = require('./server')
const DB = require('./database')

class Api {
  constructor(config, logger) {
    this.config = config
    this.isRunning = false
    this.database = new DB(config)
    this.server = new Server(config, this.database)
  }

  async start() {
    if (this.isRunning) {
      throw new Error('No se puede iniciar Api porque ya se está ejecutando')
    }
    this.isRunning = true

    console.log('Iniciando Api')
    await Promise.all([this.database.connect(), this.server.listen()])
    console.log('Api lista y esperando solicitudes')

    return { url: this.config.server.url }
  }

  async stop() {
    if (!this.isRunning) {
      throw new Error('No se puede detener BaseApi porque ya se detuvo')
    }
    this.isRunning = false

    console.log('Deteniendo Api')
    await Promise.all([this.database.disconnect(), this.server.close()])
    console.log('BaseApi cerró todas las conexiones y las detuvo con éxito')
  }
}

module.exports = Api