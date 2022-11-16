const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const rutaBD = path.join(__dirname, 'portupuesto.db')

const crearTablaProducto = `CREATE TABLE Producto (
                Producto_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                Producto_nombre TEXT NOT NULL,
                Producto_descrip TEXT,
                Producto_marca TEXT NOT NULL,
                Producto_precio_por_unidad REAL NOT NULL DEFAULT 0,
                Producto_cantidad INTEGER NOT NULL DEFAULT 0
            );`

const crearTablaEvento = `CREATE TABLE Evento (
                Evento_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                Evento_nombre TEXT NOT NULL,
                Evento_descrip TEXT,
                Evento_clave_BM TEXT NOT NULL,
                Evento_monto REAL NOT NULL DEFAULT 0,
                Evento_fecha TEXT NOT_NULL,
                Evento_estado TEXT check(Evento_estado = "inactivo" or Evento_estado = "activo" or Evento_estado = "finalizado") DEFAULT "inactivo"
            );`

const crearTablaVenta = `CREATE TABLE Venta (
                Venta_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                Producto_ID INTEGER,
                Evento_ID INTEGER,
                Producto_precio REAL NOT NULL DEFAULT 0,
                FOREIGN KEY(Producto_ID) REFERENCES Producto(Producto_ID),
                FOREIGN KEY(Evento_ID) REFERENCES Evento(Evento_ID)
            );`

class DB {
  constructor(config) {
    this.config = config
    console.log('Creando instancia de sqlite3')
    this.sqlite3 = new sqlite3.Database(rutaBD)
    console.log('Instancia de sqlite3 creada')
  }

  /* async */ connect() {
    console.log('Conectando a la base de datos')
    // **********
    this.sqlite3.run(crearTablaProducto, err => {
      err ? console.log('Accediendo a la BD') : console.log('Tabla Producto creada, accediendo a la BD');
    });
    this.sqlite3.run(crearTablaEvento, err => {
      err ? console.log('Accediendo a la BD') : console.log('Tabla Evento creada, accediendo a la BD');
    });
    this.sqlite3.run(crearTablaVenta, err => {
      err ? console.log('Accediendo a la BD') : console.log('Tabla Venta creada, accediendo a la BD');
    });
    console.log('Base de datos conectada')
  }

  /* async  */disconnect() {
    console.log('Desconectando de la base de datos')
    
    /* await this.mongoose.disconnect() */
    console.log('Base de datos desconectada')
  }

  /*   async ping() {
    if (!this.mongoose.connection.db) {
      return Promise.reject(new Error('No conectado a la base de datos'))
    }
    return this.mongoose.connection.db.admin().ping()
  } */

}

module.exports = DB