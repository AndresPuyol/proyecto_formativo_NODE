import { Pool } from "../database/conexion.js";

// Listar todos los sensores
export const listarSensores = async (req, res) => {
    try {
        const [results] = await Pool.query("SELECT * FROM sensores");
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results });
        } else {
            res.status(404).json({ status: false, msg: "No hay sensores registrados" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al realizar la búsqueda: " + e });
    }
};

// Registrar un nuevo sensor
export const registrarSensor = async (req, res) => {
    try {
        const { Nombre, Id_Surco, Id_Tipo_Sensor } = req.body;
        if (!Nombre) return res.status(400).json({ status: false, msg: "El nombre es obligatorio" });
        if (!Number.isInteger(Id_Surco)) return res.status(400).json({ status: false, msg: "Error en el id del surco" });
        if (!Number.isInteger(Id_Tipo_Sensor)) return res.status(400).json({ status: false, msg: "Error en el id del tipo de sensor" });

        const sql = `INSERT INTO sensores (Nombre, Id_Surco, Id_Tipo_Sensor) VALUES (?, ?, ?)`;
        const [results] = await Pool.query(sql, [Nombre, Id_Surco, Id_Tipo_Sensor]);
        if (results.affectedRows > 0) {
            res.status(200).json({
                status: true,
                msg: "Datos registrados correctamente",
                data: { Nombre, Id_Surco, Id_Tipo_Sensor }
            });
        } else {
            res.status(404).json({ status: false, msg: "Error al registrar los datos" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al realizar el registro: " + e });
    }
};

// Actualizar un sensor existente
export const actualizarSensor = async (req, res) => {
    try {
        const idSensor = req.params.id;
        const { Nombre, Id_Surco, Id_Tipo_Sensor } = req.body;

        const sql = `UPDATE sensores SET Nombre = ?, Id_Surco = ?, Id_Tipo_Sensor = ? WHERE id_Sensor = ?`;
        const [results] = await Pool.query(sql, [Nombre, Id_Surco, Id_Tipo_Sensor, idSensor]);
        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Datos actualizados correctamente" });
        } else {
            res.status(404).json({ status: false, msg: "Error al actualizar los datos" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al realizar la actualización: " + e });
    }
};

// Eliminar un sensor
export const eliminarSensor = async (req, res) => {
    try {
        const idSensor = req.params.id;
        const sql = `DELETE FROM sensores WHERE id_Sensor = ?`;
        const [results] = await Pool.query(sql, [idSensor]);
        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Sensor eliminado correctamente" });
        } else {
            res.status(404).json({ status: false, msg: "Error al eliminar el sensor" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al eliminar: " + e });
    }
};

// Obtener un sensor por ID
export const obtenerSensor = async (req, res) => {
    try {
        const idSensor = req.params.id;
        const sql = `SELECT * FROM sensores WHERE id_Sensor = ?`;
        const [results] = await Pool.query(sql, [idSensor]);
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results[0] });
        } else {
            res.status(404).json({ status: false, msg: "Sensor no encontrado" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al buscar el sensor: " + e });
    }
};