import { Pool } from "../database/conexion.js";

// Registrar un tipo de cultivo
export const registrarTipoCultivo = async (req, res) => {
  try {
    let { Nombre, Descripcion } = req.body;
    let sql = `INSERT INTO tipo_cultivo (Nombre, Descripcion) VALUES (?, ?)`;

    const [results] = await Pool.query(sql, [Nombre, Descripcion]);
    results.affectedRows > 0
      ? res.status(200).json({ message: "Tipo de cultivo registrado exitosamente", status: 200 })
      : res.status(404).json({ message: "No se registró el tipo de cultivo", status: 404 });
  } catch (e) {
    res.status(500).json({ message: "Error al realizar el registro: " + e, status: 500 });
  }
};

// Obtener todos los tipos de cultivo
export const obtenerTiposCultivo = async (req, res) => {
  try {
    let sql = `SELECT * FROM tipo_cultivo`;
    const [tiposCultivo] = await Pool.query(sql);
    tiposCultivo.length > 0
      ? res.status(200).json({ tiposCultivo, status: 200 })
      : res.status(404).json({ message: "No se encontraron tipos de cultivo", status: 404 });
  } catch (e) {
    res.status(500).json({ message: "Error al obtener los tipos de cultivo: " + e, status: 500 });
  }
};

// Obtener un tipo de cultivo por ID
export const obtenerTipoCultivoPorId = async (req, res) => {
  try {
    const { id_tipo_cultivo } = req.params;
    let sql = `SELECT * FROM tipo_cultivo WHERE Id_Tipo_Cultivo = ?`;
    const [tipoCultivo] = await Pool.query(sql, [id_tipo_cultivo]);
    tipoCultivo.length > 0
      ? res.status(200).json({ tipoCultivo, status: 200 })
      : res.status(404).json({ message: "No se encontró el tipo de cultivo", status: 404 });
  } catch (e) {
    res.status(500).json({ message: "Error al obtener el tipo de cultivo: " + e, status: 500 });
  }
};

// Actualizar un tipo de cultivo
export const actualizarTipoCultivo = async (req, res) => {
  try {
    const { id_tipo_cultivo } = req.params;
    let { Nombre, Descripcion } = req.body;
    let sql = `UPDATE tipo_cultivo SET Nombre = ?, Descripcion = ? WHERE Id_Tipo_Cultivo = ?`;

    const [results] = await Pool.query(sql, [Nombre, Descripcion, id_tipo_cultivo]);
    results.affectedRows > 0
      ? res.status(200).json({ message: "Tipo de cultivo actualizado exitosamente", status: 200 })
      : res.status(404).json({ message: "No se actualizó el tipo de cultivo", status: 404 });
  } catch (e) {
    res.status(500).json({ message: "Error al realizar la actualización: " + e, status: 500 });
  }
};

// Eliminar un tipo de cultivo
export const eliminarTipoCultivo = async (req, res) => {
  try {
    const { id_tipo_cultivo } = req.params;
    let sql = `DELETE FROM tipo_cultivo WHERE Id_Tipo_Cultivo = ?`;

    const [results] = await Pool.query(sql, [id_tipo_cultivo]);
    results.affectedRows > 0
      ? res.status(200).json({ message: "Tipo de cultivo eliminado exitosamente", status: 200 })
      : res.status(404).json({ message: "No se eliminó el tipo de cultivo", status: 404 });
  } catch (e) {
    res.status(500).json({ message: "Error al eliminar el tipo de cultivo: " + e, status: 500 });
  }
};