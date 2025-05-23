import { Pool } from "../database/conexion.js";

// Validación auxiliar
const testEntero = (n) => Number.isInteger(n) || /^[0-9]+$/.test(n);

// Registrar un nuevo CultivoEpa
export const registrarCultivoEpa = async (req, res) => {
    try {
        const { Id_Cultivo, Id_Epa } = req.body;

        if (!testEntero(Id_Cultivo)) {
            return res.status(400).json({ status: false, msg: "El Id_Cultivo debe ser un número" });
        }
        if (!testEntero(Id_Epa)) {
            return res.status(400).json({ status: false, msg: "El Id_Epa debe ser un número" });
        }

        const sql = `INSERT INTO cultivos_epa (Id_Cultivo, Id_Epa) VALUES (?, ?)`;
        const [results] = await Pool.query(sql, [Id_Cultivo, Id_Epa]);

        if (results.affectedRows > 0) {
            res.status(200).json({
                status: true,
                msg: "Datos registrados correctamente",
                data: { Id_Cultivo, Id_Epa }
            });
        } else {
            res.status(404).json({ status: false, msg: "Error al registrar, ya existe el registro" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al registrar: " + e });
    }
};

// Obtener un CultivoEpa por ID
export const obtenerCultivoEpa = async (req, res) => {
    try {
        const Id_CultivoEpa = req.params.id;
        const sql = `SELECT * FROM cultivos_epa WHERE Id_Cultivo_Epa = ?`;
        const [results] = await Pool.query(sql, [Id_CultivoEpa]);
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results[0] });
        } else {
            res.status(404).json({ status: false, msg: "No se encontraron registros del cultivo epa con id: " + Id_CultivoEpa });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al buscar: " + e });
    }
};

// Actualizar un CultivoEpa existente
export const actualizarCultivoEpa = async (req, res) => {
    try {
        const Id_CultivoEpa = req.params.id;
        const { Id_Cultivo, Id_Epa } = req.body;

        if (!testEntero(Id_Cultivo)) {
            return res.status(400).json({ status: false, msg: "El Id_Cultivo debe ser un número" });
        }
        if (!testEntero(Id_Epa)) {
            return res.status(400).json({ status: false, msg: "El Id_Epa debe ser un número" });
        }

        const sql = `UPDATE cultivos_epa SET Id_Cultivo = ?, Id_Epa = ? WHERE Id_Cultivo_Epa = ?`;
        const [results] = await Pool.query(sql, [Id_Cultivo, Id_Epa, Id_CultivoEpa]);

        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Datos actualizados correctamente" });
        } else {
            res.status(404).json({ status: false, msg: "Error al actualizar, no se realizaron cambios" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al actualizar: " + e });
    }
};

// Eliminar un CultivoEpa
export const eliminarCultivoEpa = async (req, res) => {
    try {
        const Id_CultivoEpa = req.params.id;
        // Obtener datos antes de eliminar
        const [cultivoepa] = await Pool.query(`SELECT * FROM cultivos_epa WHERE Id_Cultivo_Epa = ?`, [Id_CultivoEpa]);
        if (cultivoepa.length === 0) {
            return res.status(404).json({ status: false, msg: "Registro no encontrado" });
        }

        const [results] = await Pool.query(`DELETE FROM cultivos_epa WHERE Id_Cultivo_Epa = ?`, [Id_CultivoEpa]);
        if (results.affectedRows > 0) {
            res.status(200).json({ status: true, msg: "Registro eliminado correctamente", data: cultivoepa[0] });
        } else {
            res.status(404).json({ status: false, msg: "Error al eliminar" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al eliminar: " + e });
    }
};

// Listar todos los CultivoEpa
export const listarCultivosEpa = async (req, res) => {
    try {
        const [results] = await Pool.query("SELECT * FROM cultivos_epa");
        if (results.length > 0) {
            res.status(200).json({ status: true, data: results });
        } else {
            res.status(404).json({ status: false, msg: "No se encontraron registros" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: "Error al buscar: " + e });
    }
};