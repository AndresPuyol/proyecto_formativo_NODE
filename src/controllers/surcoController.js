import { Pool } from "../database/conexion.js";

// Listar todos los surcos
export const listarSurcos = async (req, res) => {
    try {
        const [results] = await Pool.query("SELECT * FROM surcos");
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results });
        } else {
            res.status(404).json({ status: false, msg: "No hay surcos registrados" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al realizar la búsqueda: " + e });
    }
};

// Registrar un nuevo surco
export const registrarSurco = async (req, res) => {
    try {
        const { Nombre, Descripcion, Id_Lote, Id_Cultivo } = req.body;
        if (!Nombre) return res.status(400).json({ status: false, msg: "El nombre es obligatorio" });
        if (!Descripcion) return res.status(400).json({ status: false, msg: "La descripcion es obligatoria" });
        if (!Number.isInteger(Id_Lote)) return res.status(400).json({ status: false, msg: "Error en el id del lote" });
        if (!Number.isInteger(Id_Cultivo)) return res.status(400).json({ status: false, msg: "Error en el id del cultivo" });

        const sql = `INSERT INTO surcos (Nombre, Descripcion, Id_Lote, Id_Cultivo) VALUES (?, ?, ?, ?)`;
        const [results] = await Pool.query(sql, [Nombre, Descripcion, Id_Lote, Id_Cultivo]);
        if (results.affectedRows > 0) {
            res.status(200).json({
                status: true,
                msg: "Datos registrados correctamente",
                data: { Nombre, Descripcion, Id_Lote, Id_Cultivo }
            });
        } else {
            res.status(404).json({ status: false, msg: "Error al registrar los datos" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al realizar el registro: " + e });
    }
};

// Actualizar un surco existente
export const actualizarSurco = async (req, res) => {
    try {
        const idSurco = req.params.id;
        const { Nombre, Descripcion, Id_Lote, Id_Cultivo } = req.body;

        const sql = `UPDATE surcos SET Nombre = ?, Descripcion = ?, Id_Lote = ?, Id_Cultivo = ? WHERE id_Surco = ?`;
        const [results] = await Pool.query(sql, [Nombre, Descripcion, Id_Lote, Id_Cultivo, idSurco]);
        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Datos actualizados correctamente" });
        } else {
            res.status(404).json({ status: false, msg: "Error al actualizar los datos" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al realizar la actualización: " + e });
    }
};

// Eliminar un surco
export const eliminarSurco = async (req, res) => {
    try {
        const idSurco = req.params.id;
        const sql = `DELETE FROM surcos WHERE id_Surco = ?`;
        const [results] = await Pool.query(sql, [idSurco]);
        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Surco eliminado correctamente" });
        } else {
            res.status(404).json({ status: false, msg: "Error al eliminar el surco" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al eliminar: " + e });
    }
};

// Obtener un surco por ID
export const obtenerSurco = async (req, res) => {
    try {
        const idSurco = req.params.id;
        const sql = `SELECT * FROM surcos WHERE id_Surco = ?`;
        const [results] = await Pool.query(sql, [idSurco]);
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results[0] });
        } else {
            res.status(404).json({ status: false, msg: "Surco no encontrado" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al buscar el surco: " + e });
    }
};