import { Pool } from "../database/conexion.js";

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, img, cb) {
    cb(null, "public/img");
  },
  filename: function (req, img, cb) {
    cb(null, img.originalname);
  },
});

const upload = multer({ storage: storage });
export const cargarImagen = upload.single("img");

export const registrarEpa = async (req, res) => {
  try {
    let {
      Fecha_Encuentro,
      Nombre,
      Descripcion,
      Tipo_Enfermedad,
      Deficiencias,
      Complicaciones,
    } = req.body;

    let nombre_img = req.file.originalname;

    let sql = `INSERT INTO epa (Fecha_Encuentro, Nombre, Descripcion, Tipo_Enfermedad, Deficiencias, Img, Complicaciones) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const [results] = await Pool.query(sql, [
      Fecha_Encuentro,
      Nombre,
      Descripcion,
      Tipo_Enfermedad,
      Deficiencias,
      nombre_img,
      Complicaciones,
    ]);
    if (results.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Epa registrada exitosamente", status: 200 });
    } else {
      res.status(404).json({ message: "No se registró la EPA", status: 404 });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error al realizar el registro de EPA: " + e,
      status: 500,
    });
  }
};


export const obtenerEpa = async (req, res) => {
    try {
        let sql = `SELECT * FROM epa`;
        const [Epa_registradas] = await Pool.query(sql);
        if (Epa_registradas.length > 0) {
        res.status(200).json({ Epa_registradas, status: 200 });
        } else {
        res.status(404).json({ message: "No se encontraron materiales", status: 404 });
        }
    } catch (e) {
        res
        .status(500)
        .json({ message: "Error al obtener los materiales: " + e, status: 500 });
    }
}

export const obtenerEpaPorId = async (req, res) => {
  try {
    const { id_epa } = req.params;
    let sql = `SELECT * FROM epa WHERE id_epa = ?`;
    const [Epa_solicitada] = await Pool.query(sql, [id_epa]);
    if (Epa_solicitada.length > 0) {
      res.status(200).json({ Epa_solicitada, status: 200 });
    } else {
      res.status(404).json({ message: "No se encontró la EPA", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al obtener la EPA: " + e, status: 500 });
  }
};

export const actualizarEpa = async (req, res) => {
  try {
    const { id_epa } = req.params;
    let {
      Fecha_Encuentro,
      Nombre,
      Descripcion,
      Tipo_Enfermedad,
      Deficiencias,
      Complicaciones,
    } = req.body;

    let sql = `UPDATE epa SET Fecha_Encuentro = ?, Nombre = ?, Descripcion = ?, Tipo_Enfermedad = ?, Deficiencias = ?, Complicaciones = ? WHERE id_epa = ?`;

    const [results] = await Pool.query(sql, [
      Fecha_Encuentro,
      Nombre,
      Descripcion,
      Tipo_Enfermedad,
      Deficiencias,
      Complicaciones,
      id_epa,
    ]);
    if (results.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Epa actualizada exitosamente", status: 200 });
    } else {
      res.status(404).json({ message: "No se actualizó la EPA", status: 404 });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error al realizar la actualización de EPA: " + e,
      status: 500,
    });
  }
}

export const eliminarEpa = async (req, res) => {
  try {
    const { id_epa } = req.params;
    let sql = `DELETE FROM epa WHERE id_epa = ?`;
    const [results] = await Pool.query(sql, [id_epa]);
    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Epa eliminada exitosamente", status: 200 });
    } else {
      res.status(404).json({ message: "No se eliminó la EPA", status: 404 });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error al eliminar la EPA: " + e,
      status: 500,
    });
  }
};