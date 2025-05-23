import { Pool } from "../database/conexion.js";

export const registrarCultivoEpa = async (req, res) => {
  try {
    let { Id_cultivo, Id_epa } = req.body;
    let sql = `INSERT INTO cultivos_epa (Id_Cultivo, Id_Epa) VALUES (?, ?)`;
    const [results] = await Pool.query(sql, [Id_cultivo, Id_epa]);

    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "relacion de cultivo con epa registrado exitosamente",
        status: 200,
      });
    } else {
      res
        .status(404)
        .json({ message: "No se registró el cultivo_epa", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al realizar el registro: " + e, status: 500 });
  }
};

export const obtenerCultivoEpa = async (req, res) => {
  try {
    let sql = `SELECT * FROM cultivos_epa`;
    const [cultivos_epa_registrados] = await Pool.query(sql);
    if (cultivos_epa_registrados.length > 0) {
      res.status(200).json({ cultivos_epa_registrados, status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron cultivos_epa", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Error al obtener los cultivos_epa: " + e,
        status: 500,
      });
  }
};

export const obtenerCultivoEpaPorId = async (req, res) => {
  try {
    const { Id_cultivo_epa } = req.params;
    let sql = `SELECT * FROM cultivos_epa WHERE id_Cultivo_Epa = ?`;
    const [cultivoEpa_Solicitado] = await Pool.query(sql, [Id_cultivo_epa]);
    if (cultivoEpa_Solicitado.length > 0) {
      res.status(200).json({ cultivoEpa_Solicitado, status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron cultivos_epa", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Error al obtener los cultivos_epa: " + e,
        status: 500,
      });
  }
};

export const actualizarCultivoEpa = async (req, res) => {
  try {
    const { Id_cultivo_epa } = req.params;
    let { Id_cultivo,Id_epa} = req.body;

    let sql = `UPDATE cultivos_epa SET Id_Cultivo = ?, Id_Epa = ? WHERE id_Cultivo_Epa = ?`;

    const [results] = await Pool.query(sql, [
      Id_cultivo,
      Id_epa,
      Id_cultivo_epa,
    ]);

    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "cultivo_epa actualizado exitosamente",
        status: 200,
      });
    } else {
      res
        .status(404)
        .json({ message: "No se actualizó el cultivo_epa", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Error al realizar la actualización: " + e,
        status: 500,
      });
  }
};

export const eliminarCultivoEpa = async (req, res) => {
  try {
    const { Id_cultivo_epa } = req.params;
    let sql = `DELETE FROM cultivos_epa WHERE id_Cultivo_Epa = ?`;
    const [results] = await Pool.query(sql, [Id_cultivo_epa]);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "cultivo_epa eliminado exitosamente",
        status: 200,
      });
    } else {
      res
        .status(404)
        .json({ message: "No se eliminó el cultivo_epa", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al eliminar el cultivo_epa: " + e, status: 500 });
  }
};
