const { Router } = require('express')
const router = new Router()

router.get('/', obtenerVentas)
router.get('/:id', obtenerVenta)
router.post('/', agregarVenta)
router.put('/:id', modificarVenta)
router.delete('/:id', eliminarVenta)

async function obtenerVentas(req, res, next) {
    res.json({ "api": "ventas" });
    return;
}

async function obtenerVenta(req, res, next) {
    res.json({ "api": "venta" });
    return;
}

async function agregarVenta(req, res, next) {
    res.json({ "api": "nueva venta" });
    return;
}

async function modificarVenta(req, res, next) {
    res.json({ "api": "modificar venta" });
    return;
}

async function eliminarVenta(req, res, next) {
    res.json({ "api": "eliminar venta" });
    return;
}

module.exports = router