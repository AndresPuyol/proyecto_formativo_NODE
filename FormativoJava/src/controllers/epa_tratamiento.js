import { Pool } from '../database/conexion.js';

// Registrar una nueva relación
export const registrarEpaTratamiento = async (req, res) => {
    try {
        const { Id_Tratamiento, Id_Epa } = req.body;

        if (!Id_Tratamiento || !Id_Epa) {
            return res.status(400).json({ status: false, msg: 'Faltan datos requeridos' });
        }

        const sql = `INSERT INTO epa_tratamiento (Id_Tratamiento, Id_Epa) VALUES (?, ?)`;
        const [result] = await Pool.query(sql, [Id_Tratamiento, Id_Epa]);

        res.status(200).json({
            status: true,
            msg: 'Registro exitoso',
            data: {
                Id_Epa_Tratamiento: result.insertId,
                Id_Tratamiento,
                Id_Epa
            }
        });
    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};

// Obtener una relación por ID
export const obtenerEpaTratamiento = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `SELECT * FROM epa_tratamiento WHERE Id_Epa_Tratamiento = ?`;
        const [rows] = await Pool.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ status: false, msg: 'No se encontró el registro' });
        }

        res.status(200).json({ status: true, data: rows[0] });
    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};

// Eliminar una relación por ID
export const eliminarEpaTratamiento = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `DELETE FROM epa_tratamiento WHERE Id_Epa_Tratamiento = ?`;
        const [result] = await Pool.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, msg: 'No se encontró el registro a eliminar' });
        }

        res.status(200).json({ status: true, msg: 'Eliminación exitosa' });
    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};
