import { Pool } from '../database/conexion.js';

// Registrar una nueva relación Actividad-Material
export const registrarActividadMaterial = async (req, res) => {
    try {
        const { Cantidad_Uso, Id_Actividad, Id_Material } = req.body;

        if (
            Cantidad_Uso === undefined ||
            Id_Actividad === undefined ||
            Id_Material === undefined
        ) {
            return res.status(400).json({ status: false, msg: 'Faltan datos requeridos' });
        }

        const sql = `INSERT INTO actividades_material (Cantidad_Uso, Id_Actividad, Id_Material) VALUES (?, ?, ?)`;
        const [result] = await Pool.query(sql, [Cantidad_Uso, Id_Actividad, Id_Material]);

        res.status(200).json({
            status: true,
            msg: 'Registro exitoso',
            data: {
                Id_Actividad_Material: result.insertId,
                Cantidad_Uso,
                Id_Actividad,
                Id_Material
            }
        });
    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};

// Obtener una relación por ID
export const obtenerActividadMaterial = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `SELECT * FROM actividades_material WHERE Id_Actividad_Material = ?`;
        const [rows] = await Pool.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ status: false, msg: 'No se encontró el registro' });
        }

        res.status(200).json({ status: true, data: rows[0] });
    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};

// Actualizar una relación por ID
export const actualizarActividadMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { Cantidad_Uso, Id_Actividad, Id_Material } = req.body;

        if (
            Cantidad_Uso === undefined ||
            Id_Actividad === undefined ||
            Id_Material === undefined
        ) {
            return res.status(400).json({ status: false, msg: 'Faltan datos requeridos' });
        }

        const sql = `
            UPDATE actividades_material 
            SET Cantidad_Uso = ?, Id_Actividad = ?, Id_Material = ? 
            WHERE Id_Actividad_Material = ?
        `;
        const [result] = await Pool.query(sql, [Cantidad_Uso, Id_Actividad, Id_Material, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, msg: 'No se encontró el registro a actualizar' });
        }

        res.status(200).json({ status: true, msg: 'Actualización exitosa' });
    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};

// Eliminar una relación por ID
export const eliminarActividadMaterial = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `DELETE FROM actividades_material WHERE Id_Actividad_Material = ?`;
        const [result] = await Pool.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, msg: 'No se encontró el registro a eliminar' });
        }

        res.status(200).json({ status: true, msg: 'Eliminación exitosa' });
    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};

// Listar todas las relaciones Actividad-Material
export const listarActividadMaterial = async (req, res) => {
    try {
        const sql = `SELECT * FROM actividades_material`;
        const [rows] = await Pool.query(sql);

        if (rows.length === 0) {
            return res.status(404).json({ status: false, msg: 'No se encontraron registros' });
        }

        res.status(200).json({ status: true, data: rows });
    } catch (e) {
        res.status(500).json({ status: false, msg: 'Error: ' + e.message });
    }
};
