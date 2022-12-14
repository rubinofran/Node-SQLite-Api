const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const nombreBD = 'portupuesto.db'
const rutaBD = path.join(__dirname, nombreBD)

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
    this.sqlite3 = new sqlite3.Database(rutaBD, err => {
      if(err) {
        return console.error(`Error al intentar crear la instancia de sqlite3: ${err.message}`)
      }
    })
    console.log('Instancia de sqlite3 creada')
  }

connect() {
    console.log('Conectando a la base de datos')
    this.sqlite3.serialize(() => {
      this.sqlite3.run(crearTablaProducto, err => {
        if(!err) {
          console.log('Tabla Producto creada');
        }
        /* err ? console.log('Accediendo a la BD') : console.log('Tabla Producto creada'); */
      });
      this.sqlite3.run(crearTablaEvento, err => {
        if(!err) {
          console.log('Tabla Evento creada');
        }
        /* err ? console.log('Accediendo a la BD') : console.log('Tabla Evento creada'); */
      });
      this.sqlite3.run(crearTablaVenta, err => {
        if(!err) {
          console.log('Tabla Venta creada');
        }
        /* err ? console.log('Accediendo a la BD') : console.log('Tabla Venta creada'); */
      });
    })
    console.log('Base de datos conectada')
  }

  disconnect() {
    console.log('Desconectando de la base de datos')
    this.sqlite3.close(err => {
      if (err) {
        return console.error(err.message);
      }
    });
    console.log('Base de datos desconectada')
  }
}

module.exports = DB