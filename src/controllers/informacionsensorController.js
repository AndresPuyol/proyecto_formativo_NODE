import { Pool } from "../database/conexion.js";

// Validación auxiliar
const testEntero = (n) => Number.isInteger(n) || /^[0-9]+$/.test(n);

// Listar toda la información de sensores
export const listarInformacionSensor = async (req, res) => {
    try {
        const [results] = await Pool.query("SELECT * FROM informacion_sensor");
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results });
        } else {
            res.status(404).json({ status: false, msg: "No se encontraron registros" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al buscar: " + e });
    }
};

// Registrar nueva información de sensor
export const registrarInformacionSensor = async (req, res) => {
    try {
        const { Fecha_Registro, Valor_Maximo, Valor_Minimo, Id_Sensor } = req.body;

        if (!Fecha_Registro) {
            return res.status(400).json({ status: false, msg: "Debe incluir la Fecha_Registro" });
        }
        if (!testEntero(Valor_Maximo)) {
            return res.status(400).json({ status: false, msg: "El Valor_Maximo debe ser numérico" });
        }
        if (!testEntero(Valor_Minimo)) {
            return res.status(400).json({ status: false, msg: "El Valor_Minimo debe ser numérico" });
        }
        if (!testEntero(Id_Sensor)) {
            return res.status(400).json({ status: false, msg: "El Id_Sensor debe ser numérico" });
        }

        const sql = `INSERT INTO informacion_sensor (Fecha_Registro, Valor_Maximo, Valor_Minimo, Id_Sensor) VALUES (?, ?, ?, ?)`;
        const [results] = await Pool.query(sql, [Fecha_Registro, Valor_Maximo, Valor_Minimo, Id_Sensor]);

        if (results.affectedRows > 0) {
            res.status(200).json({
                status: true,
                msg: "Datos registrados correctamente",
                data: {
                    Id_Informacion_Sensor: results.insertId,
                    Fecha_Registro,
                    Valor_Maximo,
                    Valor_Minimo,
                    Id_Sensor
                }
            });
        } else {
            res.status(404).json({ status: false, msg: "Error al registrar" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al registrar: " + e });
    }
};

// Obtener información de sensor por ID
export const obtenerInformacionSensor = async (req, res) => {
    try {
        const Id_Informacion_Sensor = req.params.id;
        const sql = `SELECT * FROM informacion_sensor WHERE Id_Informacion_Sensor = ?`;
        const [results] = await Pool.query(sql, [Id_Informacion_Sensor]);
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results[0] });
        } else {
            res.status(404).json({ status: false, msg: "Registro no encontrado" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al buscar: " + e });
    }
};

// Actualizar información de sensor
export const actualizarInformacionSensor = async (req, res) => {
    try {
        const Id_Informacion_Sensor = req.params.id;
        const { Fecha_Registro, Valor_Maximo, Valor_Minimo, Id_Sensor } = req.body;

        if (!Fecha_Registro) {
            return res.status(400).json({ status: false, msg: "Debe incluir la Fecha_Registro" });
        }
        if (!testEntero(Valor_Maximo)) {
            return res.status(400).json({ status: false, msg: "El Valor_Maximo debe ser numérico" });
        }
        if (!testEntero(Valor_Minimo)) {
            return res.status(400).json({ status: false, msg: "El Valor_Minimo debe ser numérico" });
        }
        if (!testEntero(Id_Sensor)) {
            return res.status(400).json({ status: false, msg: "El Id_Sensor debe ser numérico" });
        }

        const sql = `UPDATE informacion_sensor SET Fecha_Registro = ?, Valor_Maximo = ?, Valor_Minimo = ?, Id_Sensor = ? WHERE Id_Informacion_Sensor = ?`;
        const [results] = await Pool.query(sql, [Fecha_Registro, Valor_Maximo, Valor_Minimo, Id_Sensor, Id_Informacion_Sensor]);

        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Datos actualizados correctamente" });
        } else {
            res.status(404).json({ status: false, msg: "No se realizaron cambios" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al actualizar: " + e });
    }
};

// Eliminar información de sensor
export const eliminarInformacionSensor = async (req, res) => {
    try {
        const Id_Informacion_Sensor = req.params.id;
        // Obtener datos antes de eliminar
        const [info] = await Pool.query(`SELECT * FROM informacion_sensor WHERE Id_Informacion_Sensor = ?`, [Id_Informacion_Sensor]);
        if (info.length === 0) {
            return res.status(404).json({ status: false, msg: "Registro no encontrado" });
        }

        const [results] = await Pool.query(`DELETE FROM informacion_sensor WHERE Id_Informacion_Sensor = ?`, [Id_Informacion_Sensor]);
        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Registro eliminado correctamente", data: info[0] });
        } else {
            res.status(404).json({ status: false, msg: "Error al eliminar" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al eliminar: " + e });
    }
};