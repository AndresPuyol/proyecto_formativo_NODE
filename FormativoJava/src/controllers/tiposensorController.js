import { Pool } from "../database/conexion.js";

// Listar todos los tipos de sensores
export const listarTiposSensor = async (req, res) => {
    try {
        const [results] = await Pool.query("SELECT * FROM tipo_sensor");
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results });
        } else {
            res.status(404).json({ status: false, msg: "No hay tipos de sensores registrados" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al realizar la búsqueda: " + e });
    }
};

// Registrar un nuevo tipo de sensor
export const registrarTipoSensor = async (req, res) => {
    try {
        const { Nombre } = req.body;
        if (!Nombre) return res.status(400).json({ status: false, msg: "El nombre es obligatorio" });

        const sql = `INSERT INTO tipo_sensor (Nombre) VALUES (?)`;
        const [results] = await Pool.query(sql, [Nombre]);
        if (results.affectedRows > 0) {
            res.status(200).json({
                status: true,
                msg: "Datos registrados correctamente",
                data: { Nombre }
            });
        } else {
            res.status(404).json({ status: false, msg: "Error al registrar los datos" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al realizar el registro: " + e });
    }
};

// Actualizar un tipo de sensor existente
export const actualizarTipoSensor = async (req, res) => {
    try {
        const idTipoSensor = req.params.id;
        const { Nombre } = req.body;

        const sql = `UPDATE tipo_sensor SET Nombre = ? WHERE id_Tipo_Sensor = ?`;
        const [results] = await Pool.query(sql, [Nombre, idTipoSensor]);
        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Datos actualizados correctamente" });
        } else {
            res.status(404).json({ status: false, msg: "Error al actualizar los datos" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al realizar la actualización: " + e });
    }
};

// Eliminar un tipo de sensor
export const eliminarTipoSensor = async (req, res) => {
    try {
        const idTipoSensor = req.params.id;
        const sql = `DELETE FROM tipo_sensor WHERE id_Tipo_Sensor = ?`;
        const [results] = await Pool.query(sql, [idTipoSensor]);
        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Tipo de sensor eliminado correctamente" });
        } else {
            res.status(404).json({ status: false, msg: "Error al eliminar el tipo de sensor" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al eliminar: " + e });
    }
};

// Obtener un tipo de sensor por ID
export const obtenerTipoSensor = async (req, res) => {
    try {
        const idTipoSensor = req.params.id;
        const sql = `SELECT * FROM tipo_sensor WHERE id_Tipo_Sensor = ?`;
        const [results] = await Pool.query(sql, [idTipoSensor]);
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results[0] });
        } else {
            res.status(404).json({ status: false, msg: "Tipo de sensor no encontrado" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al buscar el tipo de sensor: " + e });
    }
};