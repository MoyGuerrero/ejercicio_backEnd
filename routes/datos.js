const { Router } = require('express');
const { check } = require('express-validator');
const { datos_departamento, datos_clase, datos_familia, consulta_producto, insertar_producto, actualizar_producto, eliminar_producto } = require('../controllers/datos');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();


router.get('/', datos_departamento);


router.post('/clase', datos_clase);

router.post('/familia', datos_familia);

router.post('/consulta_producto', consulta_producto)

router.post('/agregar_producto', [
    check('sku', 'El sku debe de tener un maximo de 6 digitos').isLength({ max: 6 }),
    check('articulo', 'El articulo debe de tener un maximo de 15 digitos').isLength({ max: 15 }),
    check('marca', 'La marca debe de tener un maximo de 15 digitos').isLength({ max: 15 }),
    check('modelo', 'El modelo debe de tener un maximo de 20 digitos').isLength({ max: 20 }),
    check('id_departamento', 'El departamento es obligatrio').not().isEmpty(),
    check('id_clase', 'La clase es obligatoria').not().isEmpty(),
    check('id_familia', 'La familia es obligatoria').not().isEmpty(),
    check('stock', 'El stock debe de tener un maximo de 9 digitos').isLength({ max: 9 }),
    check('cantidad', 'La cantidad debe de tener un maximo de 9 digitos').isLength({ max: 9 }),
    validarCampos
], insertar_producto);

router.post('/actualizar_producto', [
    check('sku', 'El sku debe de tener un maximo de 6 digitos').isLength({ max: 6 }),
    check('articulo', 'El articulo debe de tener un maximo de 15 digitos').isLength({ max: 15 }),
    check('marca', 'La marca debe de tener un maximo de 15 digitos').isLength({ max: 15 }),
    check('modelo', 'El modelo debe de tener un maximo de 20 digitos').isLength({ max: 20 }),
    check('id_departamento', 'El departamento es obligatrio').not().isEmpty(),
    check('id_clase', 'La clase es obligatoria').not().isEmpty(),
    check('id_familia', 'La familia es obligatoria').not().isEmpty(),
    check('stock', 'El stock debe de tener un maximo de 9 digitos').isLength({ max: 9 }),
    check('cantidad', 'La cantidad debe de tener un maximo de 9 digitos').isLength({ max: 9 }),
    validarCampos
], actualizar_producto);

router.post('/eliminar_producto', [check('sku', 'El sku debe de tener un maximo de 6 digitos').isLength({ max: 6 }), validarCampos], eliminar_producto)

module.exports = router;