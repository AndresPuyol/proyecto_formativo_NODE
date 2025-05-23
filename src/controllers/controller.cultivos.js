import { Pool } from "../database/conexion.js";
import multer from "multer";

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta de almacenamiento
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre único para evitar sobrescrituras
  }
});

const upload = multer({ storage });

export const cargarImagen = upload.single("Img");

// Registrar cultivo con imagen
export const registrarCultivo = async (req, res) => {
  try {
    let { Nombre, Cantidad, Descripcion, Id_Tipo_Cultivo } = req.body;
    let nombre_img = req.file ? req.file.filename : null; // Guarda solo el nombre del archivo

    let sql = `INSERT INTO cultivos (Nombre, Cantidad, Img, Descripcion, Id_Tipo_Cultivo) VALUES (?, ?, ?, ?, ?)`;
    const [results] = await Pool.query(sql, [Nombre, Cantidad, nombre_img, Descripcion, Id_Tipo_Cultivo]);

    results.affectedRows > 0
      ? res.status(200).json({
          message: "Cultivo registrado exitosamente",
          Img: `http://localhost:10000/uploads/${nombre_img}`,
          status: 200
        })
      : res.status(404).json({ message: "No se registró el cultivo", status: 404 });
  } catch (e) {
    res.status(500).json({ message: "Error al registrar cultivo: " + e, status: 500 });
  }
};

// Obtener todos los cultivos
export const obtenerCultivos = async (req, res) => {
  try {
    let sql = `SELECT * FROM cultivos`;
    const [cultivosRegistrados] = await Pool.query(sql);
    if (cultivosRegistrados.length > 0) {
      res.status(200).json({ cultivosRegistrados, status: 200 });
    } else {
      res.status(404).json({ message: "No se encontraron cultivos", status: 404 });
    }
  } catch (e) {
    res.status(500).json({ message: "Error al obtener los cultivos: " + e, status: 500 });
  }
};

// Obtener un cultivo por ID
export const obtenerCultivoPorId = async (req, res) => {
  try {
    const { id_cultivo } = req.params;
    let sql = `SELECT * FROM cultivos WHERE Id_Cultivo = ?`;
    const [cultivoSolicitado] = await Pool.query(sql, [id_cultivo]);

    if (cultivoSolicitado.length > 0) {
      res.status(200).json({ cultivoSolicitado, status: 200 });
    } else {
      res.status(404).json({ message: "No se encontró el cultivo", status: 404 });
    }
  } catch (e) {
    res.status(500).json({ message: "Error al obtener el cultivo: " + e, status: 500 });
  }
};

// Actualizar un cultivo
export const actualizarCultivo = async (req, res) => {
  try {
    const { id_cultivo } = req.params;
    let { Nombre, Cantidad, Img, Descripcion, Id_Tipo_Cultivo } = req.body;

    let sql = `UPDATE cultivos SET Nombre = ?, Cantidad = ?, Img = ?, Descripcion = ?, Id_Tipo_Cultivo = ? WHERE Id_Cultivo = ?`;

    const [results] = await Pool.query(sql, [Nombre, Cantidad, Img, Descripcion, Id_Tipo_Cultivo, id_cultivo]);
    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Cultivo actualizado exitosamente", status: 200 });
    } else {
      res.status(404).json({ message: "No se actualizó el cultivo", status: 404 });
    }
  } catch (e) {
    res.status(500).json({ message: "Error al realizar la actualización: " + e, status: 500 });
  }
};

// Eliminar un cultivo
export const eliminarCultivo = async (req, res) => {
  try {
    const { id_cultivo } = req.params;
    let sql = `DELETE FROM cultivos WHERE Id_Cultivo = ?`;
    const [results] = await Pool.query(sql, [id_cultivo]);

    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Cultivo eliminado exitosamente", status: 200 });
    } else {
      res.status(404).json({ message: "No se eliminó el cultivo", status: 404 });
    }
  } catch (e) {
    res.status(500).json({ message: "Error al eliminar el cultivo: " + e, status: 500 });
  }
};