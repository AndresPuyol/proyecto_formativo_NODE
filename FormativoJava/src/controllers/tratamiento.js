import { Pool } from '../database/conexion.js';

// Registrar tratamiento
export const registrarTratamiento = async (req, res) => {
    try {
        const { descripcion, fecha_inicio, fecha_final, Tipo_Tratamiento } = req.body;

        if (new Date(fecha_inicio) > new Date(fecha_final)) {
            return res.status(400).json({ status: false, msg: 'Error: La fecha de inicio no puede ser mayor a la fecha final' });
        }

        const sql = `INSERT INTO tratamiento (descripcion, fecha_inicio, fecha_final, Tipo_Tratamiento)
                     VALUES (?, ?, ?, ?)`;
        const [result] = await Pool.query(sql, [descripcion, fecha_inicio, fecha_final, Tipo_Tratamiento]);

        res.status(200).json({
            status: result.affectedRows > 0,
            msg: result.affectedRows > 0 ? 'Registro exitoso' : 'Error en el registro'
        });

    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};

// Actualizar tratamiento
export const actualizarTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, fecha_inicio, fecha_final, Tipo_Tratamiento } = req.body;

        if (new Date(fecha_inicio) > new Date(fecha_final)) {
            return res.status(400).json({ status: false, msg: 'Error: La fecha de inicio no puede ser mayor a la fecha final' });
        }

        const sql = `UPDATE tratamiento
                     SET descripcion = ?, fecha_inicio = ?, fecha_final = ?, Tipo_Tratamiento = ?
                     WHERE id = ?`;
        const [result] = await Pool.query(sql, [descripcion, fecha_inicio, fecha_final, Tipo_Tratamiento, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, msg: 'Error: Tratamiento no encontrado' });
        }

        res.status(200).json({ status: true, msg: 'Actualización exitosa' });

    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};

// Eliminar tratamiento
export const eliminarTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM tratamiento WHERE id = ?`;
        const [result] = await Pool.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, msg: 'Error: Tratamiento no encontrado' });
        }

        res.status(200).json({ status: true, msg: 'Eliminación exitosa' });

    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};

// Obtener tratamiento
export const obtenerTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM tratamiento WHERE id = ?`;
        const [rows] = await Pool.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ status: false, msg: 'Error: Tratamiento no encontrado' });
        }

        res.status(200).json({ status: true, data: rows[0] });

    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};