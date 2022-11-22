const { Router } = require('express')
const router = new Router()

/* CRUD */
router.get('/', obtenerProductos)
router.get('/:id', obtenerProducto)
router.post('/', agregarProducto)
router.put('/:id', modificarProducto)
router.delete('/:id', eliminarProducto)
/* **** */

/* CRUD */
function obtenerProductos(req, res) {
    const query = `SELECT * FROM Producto`;    
    req.db.all(query, [], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json(resultado);
    }); 
}

function obtenerProducto(req, res) {
    const query = `SELECT * FROM Producto WHERE Producto_ID = ?`;
    req.db.get(query, [req.params.id], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json(resultado);
    });
}

function agregarProducto(req, res) {
    const { Producto_nombre, Producto_descrip, Producto_marca, Producto_precio_por_unidad, Producto_cantidad } = req.body;
    const query = `INSERT INTO Producto 
                    (Producto_nombre, 
                    Producto_descrip, 
                    Producto_marca, 
                    Producto_precio_por_unidad, 
                    Producto_cantidad) 
                    VALUES 
                    (?, ?, ?, ?, ?)`;
    req.db.run(query, [Producto_nombre, Producto_descrip, Producto_marca, Producto_precio_por_unidad, Producto_cantidad], (err) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json({ status: 'Producto agregado en la BD' });
    });
}

function modificarProducto(req, res) {
    const { Producto_nombre, Producto_descrip, Producto_marca, Producto_precio_por_unidad, Producto_cantidad } = req.body;
    const query = `UPDATE Producto SET 
                    Producto_nombre = ?,
                    Producto_descrip = ?,
                    Producto_marca = ?, 
                    Producto_precio_por_unidad = ?, 
                    Producto_cantidad = ? WHERE Producto_ID = ?`;
    req.db.run(query, [Producto_nombre, Producto_descrip, Producto_marca, Producto_precio_por_unidad, Producto_cantidad, req.params.id], (err) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json({ status: 'Producto actualizado en la BD' });
    })
}

function eliminarProducto(req, res) {
    const query = `DELETE FROM Producto WHERE Producto_ID = ?`;
    req.db.run(query, [req.params.id], (err) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json({ status: 'Producto eliminado de la BD' });
    });
}
/* **** */

module.exports = router