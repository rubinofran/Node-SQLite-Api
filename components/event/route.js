const { Router } = require('express')
const router = new Router()

/* CRUD */
router.get('/', obtenerEventos)
router.get('/:id', obtenerEvento)
router.post('/', agregarEvento)
router.put('/:id', modificarEvento)
router.delete('/:id', eliminarEvento)
/* **** */

/* CRUD */
function obtenerEventos(req, res) {
    const query = `SELECT * FROM Evento`;    
    req.db.all(query, [], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json(resultado);
    }); 
}

function obtenerEvento(req, res) {
    const query = `SELECT * FROM Evento WHERE Evento_ID = ?`;
    req.db.get(query, [req.params.id], (err, resultado) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json(resultado);
    });
}

function agregarEvento(req, res) {
    const { Evento_nombre, Evento_descrip, Evento_clave_BM, Evento_fecha } = req.body;
    const query = `INSERT INTO Evento 
                    (Evento_nombre, 
                    Evento_descrip, 
                    Evento_clave_BM, 
                    Evento_fecha, 
                    Evento_monto,
                    Evento_estado) 
                    VALUES 
                    (?, ?, ?, ?, 0, "inactivo")`;
    req.db.run(query, [Evento_nombre, Evento_descrip, Evento_clave_BM, Evento_fecha], (err) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json({ status: 'Evento agregado en la BD' });
    });
}

function modificarEvento(req, res) {
    const { Evento_nombre, Evento_descrip, Evento_clave_BM, Evento_monto, Evento_fecha, Evento_estado } = req.body;
    const query = `UPDATE Evento SET 
                    Evento_nombre = ?,
                    Evento_descrip = ?,
                    Evento_clave_BM = ?, 
                    Evento_monto = ?,
                    Evento_fecha = ?,
                    Evento_estado = ?
                    WHERE Evento_ID = ?`;
    req.db.run(query, [Evento_nombre, Evento_descrip, Evento_clave_BM, Evento_monto, Evento_fecha, Evento_estado, req.params.id], (err) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json({ status: 'Evento actualizado en la BD' });
    })
}

function eliminarEvento(req, res) {
    const query = `DELETE FROM Evento WHERE Evento_ID = ?`;
    req.db.run(query, [req.params.id], (err) => {
        if(err) {
            res.json({ "error": err.message });
            return;
        }
        res.status(200).json({ status: 'Evento eliminado de la BD' });
    });
}
/* **** */

module.exports = router