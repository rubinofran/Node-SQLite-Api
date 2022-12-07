const { Router } = require('express')
const router = new Router()

router.get('/', obtenerVentas)
/* router.get('/:id', obtenerVenta) */
router.post('/', agregarVenta)
/* router.put('/:id', modificarVenta) */
router.delete('/:ide&:idp&:precio', eliminarVenta)

function obtenerVentas(req, res) {
    const query = `SELECT * FROM Venta`;    
    req.db.all(query, [], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json(resultado);
    }); 
}

function agregarVenta(req, res) {
    const { Evento_ID, Producto_ID, Producto_precio } = req.body;
    const query = `INSERT INTO Venta 
                    (Evento_ID, 
                    Producto_ID, 
                    Producto_Precio) 
                    VALUES 
                    (?, ?, ?)`;
    req.db.run(query, [Evento_ID, Producto_ID, Producto_precio], (err) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json({ status: 'Venta agregada en la BD' });
    });
}

function eliminarVenta(req, res) {
    const query = `DELETE FROM Venta WHERE Venta_ID = (SELECT Venta_ID FROM Venta WHERE Evento_ID = ? AND Producto_ID = ? AND Producto_precio = ? LIMIT 1)`;
    req.db.run(query, [req.params.ide, req.params.idp, req.params.precio], (err) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json({ status: 'Venta eliminada de la BD' });
    });
}

module.exports = router