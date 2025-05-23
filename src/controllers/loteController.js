import { Pool } from "../database/conexion.js";

// Listar todos los lotes
export const listarLotes = async (req, res) => {
    try {
        const [results] = await Pool.query("SELECT * FROM lotes");
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: 'No hay lotes registrados', status: 404 });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error al realizar la búsqueda: ' + e, status: 500 });
    }
};

// Registrar un nuevo lote
export const registrarLote = async (req, res) => {
    try {
        const { Longitud, Localizacion, Nombre, Latitud, Area } = req.body;
        if (!Longitud) return res.status(400).json({ message: 'La longitud es obligatoria', status: 400 });
        if (!Number.isInteger(Localizacion)) return res.status(400).json({ message: 'Error en la localización', status: 400 });
        if (!Nombre) return res.status(400).json({ message: 'El nombre es obligatorio', status: 400 });
        if (!Latitud) return res.status(400).json({ message: 'La latitud es obligatoria', status: 400 });
        if (!Area) return res.status(400).json({ message: 'El área es obligatoria', status: 400 });

        const sql = `INSERT INTO lotes (Longitud, Localizacion, Nombre, Latitud, Area) VALUES (?, ?, ?, ?, ?)`;
        const [results] = await Pool.query(sql, [Longitud, Localizacion, Nombre, Latitud, Area]);
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Lote registrado correctamente', status: 200 });
        } else {
            res.status(404).json({ message: 'No se registró el lote', status: 404 });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error al realizar el registro: ' + e, status: 500 });
    }
};

// Actualizar un lote existente
export const actualizarLote = async (req, res) => {
    try {
        const { Longitud, Localizacion, Nombre, Latitud, Area } = req.body;
        const id_Lote = req.params.id;

        const sql = `UPDATE lotes SET Longitud = ?, Localizacion = ?, Nombre = ?, Latitud = ?, Area = ? WHERE id_Lote = ?`;
        const [results] = await Pool.query(sql, [Longitud, Localizacion, Nombre, Latitud, Area, id_Lote]);
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Lote actualizado correctamente', status: 200 });
        } else {
            res.status(404).json({ message: 'No se actualizó el lote', status: 404 });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error al realizar la actualización: ' + e, status: 500 });
    }
};

// Eliminar un lote
export const eliminarLote = async (req, res) => {
    try {
        const id_Lote = req.params.id;
        const sql = `DELETE FROM lotes WHERE id_Lote = ?`;
        const [results] = await Pool.query(sql, [id_Lote]);
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Lote eliminado correctamente', status: 200 });
        } else {
            res.status(404).json({ message: 'No se eliminó el lote', status: 404 });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error al eliminar: ' + e, status: 500 });
    }
};

// Obtener un lote por ID
export const obtenerLote = async (req, res) => {
    try {
        const id_Lote = req.params.id;
        const sql = `SELECT * FROM lotes WHERE id_Lote = ?`;
        const [results] = await Pool.query(sql, [id_Lote]);
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: 'Lote no encontrado', status: 404 });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error al buscar el lote: ' + e, status: 500 });
    }
};