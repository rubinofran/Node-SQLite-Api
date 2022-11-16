const { Router } = require('express')
const router = new Router()

router.get('/', obtenerProductos)
router.get('/:id', obtenerProducto)
router.post('/', agregarProducto)
router.put('/:id', modificarProducto)
router.delete('/:id', eliminarProducto)

async function obtenerProductos(req, res, next) {
    const query = `SELECT * FROM Producto`;    
    const aux = await req.db.all(query, [], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.json(resultado)
    }); 
}

async function obtenerProducto(req, res, next) {
    const query = `SELECT * FROM Producto WHERE Producto_ID = ?`;
    const aux = await req.db.get(query, [req.params.id], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.json(resultado);
    });
}

async function agregarProducto(req, res, next) {
    const { Producto_nombre, Producto_descrip, Producto_marca, Producto_precio_por_unidad, Producto_cantidad } = req.body;
    const query = `INSERT INTO Producto 
                    (Producto_nombre, 
                    Producto_descrip, 
                    Producto_marca, 
                    Producto_precio_por_unidad, 
                    Producto_cantidad) 
                    VALUES 
                    (?, ?, ?, ?, ?)`;
    const aux = await req.db.run(query, [Producto_nombre, Producto_descrip, Producto_marca, Producto_precio_por_unidad, Producto_cantidad], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.json({ status: 'Producto guardado en la BD' });
    })
}

async function modificarProducto(req, res, next) {
    const { Producto_nombre, Producto_descrip, Producto_marca, Producto_precio_por_unidad, Producto_cantidad } = req.body;
    const query = `UPDATE Producto SET 
                    Producto_nombre = ?,
                    Producto_descrip = ?,
                    Producto_marca = ?, 
                    Producto_precio_por_unidad = ?, 
                    Producto_cantidad = ? WHERE Producto_ID = ?`;
    const aux = await req.db.run(query, [Producto_nombre, Producto_descrip, Producto_marca, Producto_precio_por_unidad, Producto_cantidad, req.params.id], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.json({ status: 'Producto actualizado en la BD' });
    })
}

async function eliminarProducto(req, res, next) {
    const query = `DELETE FROM Producto WHERE Producto_ID = ?`;
    const aux = await req.db.run(query, [req.params.id], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.json({ status: 'Producto eliminado de la BD' });
    });
}

module.exports = router