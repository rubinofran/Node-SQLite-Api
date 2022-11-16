const { Router } = require('express')
const router = new Router()

router.get('/', obtenerEventos)
router.get('/:id', obtenerEvento)
router.post('/', agregarEvento)
router.put('/:id', modificarEvento)
router.delete('/:id', eliminarEvento)

async function obtenerEventos(req, res, next) {
    res.json({ "api": "eventos" });
    return;
}

async function obtenerEvento(req, res, next) {
    res.json({ "api": "evento" });
    return;
}

async function agregarEvento(req, res, next) {
    res.json({ "api": "nuevo evento" });
    return;
}

async function modificarEvento(req, res, next) {
    res.json({ "api": "modificar evento" });
    return;
}

async function eliminarEvento(req, res, next) {
    res.json({ "api": "eliminar evento" });
    return;
}

module.exports = router