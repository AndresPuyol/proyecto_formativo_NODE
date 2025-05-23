import { Pool } from "../database/conexion.js";

// Funciones auxiliares
const testString = (str) => typeof str === "string" && str.trim().length > 0;
const validateDate = (date) => !isNaN(Date.parse(date));

// Registrar una nueva actividad
export const registrarActividad = async (req, res) => {
    try {
        const { Titulo, Descripcion, Fecha, Img, Id_Identificacion, Id_Cultivo } = req.body;

        if (!testString(Titulo)) {
            return res.status(400).json({ status: false, msg: "El título debe ser un texto" });
        }
        if (!testString(Descripcion)) {
            return res.status(400).json({ status: false, msg: "La descripción debe ser un texto" });
        }
        if (!validateDate(Fecha)) {
            return res.status(400).json({ status: false, msg: "La fecha no es válida" });
        }

        const sql = `INSERT INTO actividades (Titulo, Descripcion, Fecha, Img, Id_Identificacion, Id_Cultivo) VALUES (?, ?, ?, ?, ?, ?)`;
        const [results] = await Pool.query(sql, [
            Titulo.trim(),
            Descripcion.trim(),
            Fecha,
            Img || null,
            Id_Identificacion,
            Id_Cultivo
        ]);

        if (results.affectedRows > 0) {
            res.status(200).json({
                status: true,
                msg: "Actividad registrada correctamente",
                data: { Titulo, Descripcion, Fecha, Img, Id_Identificacion, Id_Cultivo }
            });
        } else {
            res.status(404).json({ status: false, msg: "Error al registrar la actividad, ya está registrada" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al registrar la actividad: " + e });
    }
};

// Obtener una actividad por ID
export const obtenerActividad = async (req, res) => {
    try {
        const Id_Actividad = req.params.id;
        const sql = `SELECT * FROM actividades WHERE Id_Actividad = ?`;
        const [results] = await Pool.query(sql, [Id_Actividad]);
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results[0] });
        } else {
            res.status(404).json({ status: false, msg: "No se encontraron registros de la actividad con ID: " + Id_Actividad });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al buscar la actividad: " + e });
    }
};

// Actualizar una actividad existente
export const actualizarActividad = async (req, res) => {
    try {
        const Id_Actividad = req.params.id;
        const { Titulo, Descripcion, Fecha, Img, Id_Identificacion, Id_Cultivo } = req.body;

        if (!testString(Titulo)) {
            return res.status(400).json({ status: false, msg: "El título debe ser un texto" });
        }
        if (!testString(Descripcion)) {
            return res.status(400).json({ status: false, msg: "La descripción debe ser un texto" });
        }

        const sql = `UPDATE actividades SET Titulo = ?, Descripcion = ?, Fecha = ?, Img = ?, Id_Identificacion = ?, Id_Cultivo = ? WHERE Id_Actividad = ?`;
        const [results] = await Pool.query(sql, [
            Titulo.trim(),
            Descripcion.trim(),
            Fecha,
            Img || null,
            Id_Identificacion,
            Id_Cultivo,
            Id_Actividad
        ]);

        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Actividad actualizada correctamente" });
        } else {
            res.status(404).json({ status: false, msg: "Error al actualizar la actividad" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al actualizar la actividad: " + e });
    }
};

// Eliminar una actividad
export const eliminarActividad = async (req, res) => {
    try {
        const Id_Actividad = req.params.id;
        // Opcional: obtener datos antes de eliminar
        const [actividad] = await Pool.query(`SELECT * FROM actividades WHERE Id_Actividad = ?`, [Id_Actividad]);
        if (actividad.length === 0) {
            return res.status(404).json({ status: false, msg: "Actividad no encontrada" });
        }

        const [results] = await Pool.query(`DELETE FROM actividades WHERE Id_Actividad = ?`, [Id_Actividad]);
        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Actividad eliminada correctamente", data: actividad[0] });
        } else {
            res.status(404).json({ status: false, msg: "Error al eliminar la actividad" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al eliminar la actividad: " + e });
    }
};

// Listar todas las actividades
export const listarActividades = async (req, res) => {
    try {
        const [results] = await Pool.query("SELECT * FROM actividades");
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results });
        } else {
            res.status(404).json({ status: false, msg: "No se encontraron registros de actividades" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al buscar actividades: " + e });
    }
};