const { response } = require("express");
const { dbConnection } = require("../db/database");

const datos_departamento = async (req, res = response) => {

    try {
        const pool = await dbConnection();
        await pool.request()
            .execute('buscar_datos', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        ok: false,
                        msg: 'Error al traer los datos'
                    });
                }

                res.json({
                    ok: true,
                    result: result.recordset
                });
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error hable con el administrador ' + error
        });
    }

}

const datos_clase = async (req, res = response) => {

    const { id } = req.body;

    try {
        const pool = await dbConnection();
        await pool.request()
            .input('id', id)
            .execute('buscar_datos_hijos_departamento', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        ok: false,
                        msg: 'Error al traer los datos'
                    });
                }

                res.json({
                    ok: true,
                    result: result.recordset
                });
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error hable con el administrador ' + error
        });
    }
}

const datos_familia = async (req, res = response) => {

    const { id } = req.body;

    try {
        const pool = await dbConnection();
        await pool.request()
            .input('id', id)
            .execute('buscar_datos_hijos_clase', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        ok: false,
                        msg: 'Error al traer los datos'
                    });
                }

                res.json({
                    ok: true,
                    result: result.recordset
                });
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error hable con el administrador ' + error
        });
    }
}

const consulta_producto = async (req, res = response) => {
    const { sku } = req.body;
    try {
        const pool = await dbConnection();
        await pool.request()
            .input('sku', sku)
            .execute('consulta_producto', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        ok: false,
                        msg: 'Error al traer los datos'
                    });
                }

                res.json({
                    ok: true,
                    result: result.recordset
                });
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error hable con el administrador ' + error
        });
    }
}


const insertar_producto = async (req, res = response) => {

    const {
        sku,
        descontinuado,
        articulo,
        marca,
        modelo,
        id_departamento,
        id_clase,
        id_familia,
        fecha_alta,
        stock,
        cantidad,
        fecha_baja } = req.body
    try {


        if (cantidad > stock) {
            return res.status(400).json({
                ok: false,
                msg: 'La cantidad no debe de ser mayor que el stock'
            });
        }


        const pool = await dbConnection();

        await pool.request()
            .input('sku', sku)
            .input('articulo', articulo)
            .input('marca', marca)
            .input('modelo', modelo)
            .input('id_departamento', id_departamento)
            .input('id_clase', id_clase)
            .input('id_familia', id_familia)
            .input('fecha_alta', fecha_alta)
            .input('stock', stock)
            .input('cantidad', cantidad)
            .input('descontinuado', descontinuado)
            .input('fecha_baja', fecha_baja)
            .execute('agregar_producto', (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        ok: false,
                        msg: 'Sucedio un error al momento de guardar ' + err
                    })
                }

                res.json({
                    ok: true,
                    msg: 'Se agregado correctamente'
                });
            });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error hable con el administrador ' + error
        });
    }

}


const actualizar_producto = async (req, res = response) => {
    const {
        sku,
        articulo,
        marca,
        modelo,
        id_departamento,
        id_clase,
        id_familia,
        stock,
        cantidad,
        descontinuado } = req.body
    try {

        if (cantidad > stock) {
            return res.status(400).json({
                ok: false,
                msg: 'La cantidad no debe de ser mayor que el stock'
            });
        }


        const pool = await dbConnection();

        await pool.request()
            .input('sku', sku)
            .input('articulo', articulo)
            .input('marca', marca)
            .input('modelo', modelo)
            .input('id_departamento', id_departamento)
            .input('id_clase', id_clase)
            .input('id_familia', id_familia)
            .input('stock', stock)
            .input('cantidad', cantidad)
            .input('descontinuado', descontinuado)
            .execute('actualizar_producto', (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        ok: false,
                        msg: 'Sucedio un error al momento de actualizar ' + err
                    })
                }

                res.json({
                    ok: true,
                    msg: 'Actualizado con exito'
                });
            });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error hable con el administrador ' + error
        });
    }
}

const eliminar_producto = async (req, res = response) => {
    const { sku, fecha_baja } = req.body
    try {
        const pool = await dbConnection();

        await pool.request()
            .input('sku', sku)
            .input('fecha_baja', fecha_baja)
            .execute('eliminar_producto', (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        ok: false,
                        msg: 'Sucedio un error al momento de eliminar ' + err
                    })
                }

                res.json({
                    ok: true,
                    msg: 'Eliminado con exito'
                });
            });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error hable con el administrador ' + error
        });
    }
}

module.exports = {
    datos_departamento,
    datos_clase,
    datos_familia,
    consulta_producto,
    insertar_producto,
    actualizar_producto,
    eliminar_producto
}