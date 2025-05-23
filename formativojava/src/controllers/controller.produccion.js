import { Pool } from "../database/conexion.js";

// Registrar una producción
export const registrarProduccion = async (req, res) => {
    try {
    let { Cantidad, Fecha, Id_Cultivo } = req.body;
    let sql = `INSERT INTO produccion (Cantidad, Fecha, Id_Cultivo) VALUES (?, ?, ?)`;

    const [results] = await Pool.query(sql, [Cantidad, Fecha, Id_Cultivo]);
    results.affectedRows > 0
        ? res.status(200).json({ message: "Producción registrada exitosamente", status: 200 })
        : res.status(404).json({ message: "No se registró la producción", status: 404 });
    } catch (e) {
    res.status(500).json({ message: "Error al realizar el registro: " + e, status: 500 });
    }
};

// Obtener todas las producciones
export const obtenerProducciones = async (req, res) => {
    try {
    let sql = `SELECT * FROM producciones`;
    const [producciones] = await Pool.query(sql);
    producciones.length > 0
        ? res.status(200).json({ producciones, status: 200 })
        : res.status(404).json({ message: "No se encontraron producciones", status: 404 });
    } catch (e) {
    res.status(500).json({ message: "Error al obtener las producciones: " + e, status: 500 });
    }
};

// Obtener una producción por ID
export const obtenerProduccionPorId = async (req, res) => {
try {
    const { id_produccion } = req.params;
    let sql = `SELECT * FROM produccion WHERE Id_Produccion = ?`;
    const [produccion] = await Pool.query(sql, [id_produccion]);
    produccion.length > 0
    ? res.status(200).json({ produccion, status: 200 })
    : res.status(404).json({ message: "No se encontró la producción", status: 404 });
} catch (e) {
    res.status(500).json({ message: "Error al obtener la producción: " + e, status: 500 });
}
};

// Actualizar una producción
export const actualizarProduccion = async (req, res) => {
try {
    const { id_produccion } = req.params;
    let { Cantidad, Fecha, Id_Cultivo } = req.body;
    let sql = `UPDATE produccion SET Cantidad = ?, Fecha = ?, Id_Cultivo = ? WHERE Id_Produccion = ?`;

    const [results] = await Pool.query(sql, [Cantidad, Fecha, Id_Cultivo, id_produccion]);
    results.affectedRows > 0
    ? res.status(200).json({ message: "Producción actualizada exitosamente", status: 200 })
    : res.status(404).json({ message: "No se actualizó la producción", status: 404 });
} catch (e) {
    res.status(500).json({ message: "Error al realizar la actualización: " + e, status: 500 });
}
};

// Eliminar una producción
export const eliminarProduccion = async (req, res) => {
try {
    const { id_produccion } = req.params;
    let sql = `DELETE FROM produccion WHERE Id_Produccion = ?`;

    const [results] = await Pool.query(sql, [id_produccion]);
    results.affectedRows > 0
    ? res.status(200).json({ message: "Producción eliminada exitosamente", status: 200 })
    : res.status(404).json({ message: "No se eliminó la producción", status: 404 });
} catch (e) {
    res.status(500).json({ message: "Error al eliminar la producción: " + e, status: 500 });
}
};