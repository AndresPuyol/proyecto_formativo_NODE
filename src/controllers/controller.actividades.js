import { Pool } from "../database/conexion.js";


export const registrarActividad = async (req, res) => {
  try {
    let { Titulo, Fecha, Descripcion, Id_Usuario, Id_Cultivo } = req.body;

    let nombre_img = req.file.originalname;

    let sql = `INSERT INTO actividades (Titulo, Fecha, Descripcion, Img, Id_Identificacion, Id_Cultivo) VALUES (?, ?, ?, ?, ?, ?)`;


    const [results] = await Pool.query(sql, [
      Titulo,

      Fecha,
      Descripcion,
      nombre_img,
      Id_Usuario,
      Id_Cultivo,
    ]);
    if (results.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Actividad registrada exitosamente", status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se registró la Actividad", status: 404 });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error al realizar el registro de la Actividad: " + e,
      status: 500,
    });
  }
};

export const obtenerActividad = async (req, res) => {
  try {
    let sql = `SELECT * FROM actividades`;
    const [Actividades_registradas] = await Pool.query(sql);
    if (Actividades_registradas.length > 0) {
      res.status(200).json({ Actividades_registradas, status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron Actividades", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Error al obtener las Actividades: " + e,
        status: 500,
      });
  }
};


export const obtenerActividadPorId = async (req, res) => {
  try {
    const { Id_actividad } = req.params;
    let sql = `SELECT * FROM actividades WHERE Id_Actividad = ?`;
    const [Actividad_Solicitada] = await Pool.query(sql, [Id_actividad]);
    if (Actividad_Solicitada.length > 0) {
      res.status(200).json({ Actividad_Solicitada, status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron Actividades", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Error al obtener las Actividades: " + e,
        status: 500,
      });
  }
};

export const actualizarActividad = async (req, res) => {
  try {
    const { Id_actividad } = req.params;
    let { Titulo, Fecha, Descripcion, Id_Usuario, Id_Cultivo } = req.body;

    let nombre_img = req.file.originalname;

    let sql = `UPDATE actividades SET Titulo = ?, Fecha = ?, Descripcion = ?, Img = ?, Id_Identificacion = ?, Id_Cultivo = ? WHERE Id_Actividad = ?`;

    const [results] = await Pool.query(sql, [
      Titulo,
      Fecha,
      Descripcion,
      nombre_img,
      Id_Usuario,
      Id_Cultivo,
      Id_actividad,
    ]);
    if (results.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Actividad actualizada exitosamente", status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se actualizó la Actividad", status: 404 });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error al realizar la actualización de la Actividad: " + e,
      status: 500,
    });
  }
};

export const eliminarActividad = async (req, res) => {
  try {
    const { Id_actividad } = req.params;
    let sql = `DELETE FROM actividades WHERE Id_Actividad = ?`;
    const [results] = await Pool.query(sql, [Id_actividad]);
    if (results.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Actividad eliminada exitosamente", status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se eliminó la Actividad", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Error al eliminar la Actividad: " + e,
        status: 500,
      });
  }
};