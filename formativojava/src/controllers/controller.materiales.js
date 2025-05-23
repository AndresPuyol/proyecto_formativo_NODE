import { Pool } from "../database/conexion.js";


export const registrarMateriales = async (req, res) => {
  try {
    let {
      Nombre,
      Precio,
      Descripcion,
      Tipo_Material,
      Tipo_Medida_Material,
      Cantidad,
    } = req.body;

    let sql = `INSERT INTO materiales (Nombre, Precio, Descripcion, Tipo_Material, Tipo_Medida_Material, Cantidad) VALUES (?, ?, ?, ?, ?, ?)`;

    const [results] = await Pool.query(sql, [
      Nombre,
      Precio,
      Descripcion,
      Tipo_Material,
      Tipo_Medida_Material,
      Cantidad,
    ]);
    if (results.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Material registrado exitosamente", status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se registró el material", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al realizar el registro: " + e, status: 500 });
  }
};

export const obtenerMateriales = async (req, res) => {
    try {
        let sql = `SELECT * FROM materiales`;
        const [materiales_registrados] = await Pool.query(sql);
        if (materiales_registrados.length > 0) {
        res.status(200).json({ materiales_registrados, status: 200 });
        } else {
        res.status(404).json({ message: "No se encontraron materiales", status: 404 });
        }
    } catch (e) {
        res
        .status(500)
        .json({ message: "Error al obtener los materiales: " + e, status: 500 });
    }
}

export const obtenerMaterialesPorId = async (req, res) => {
  try {
    const { idMaterial } = req.params;
    let sql = `SELECT * FROM materiales WHERE id_Material = ?`;
    const [Material_Solicitado] = await Pool.query(sql, [idMaterial]);
    if (Material_Solicitado.length > 0) {
      res.status(200).json({ Material_Solicitado, status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se encontró el material", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al obtener el material: " + e, status: 500 });
  }
}

export const actualizarMateriales = async (req, res) => {
  try {
    const { id_material } = req.params;
    let {
      Nombre,
      Precio,
      Descripcion,
      Tipo_Material,
      Tipo_Medida_Material,
      Cantidad,
    } = req.body;

    let sql = `UPDATE materiales SET Nombre = ?, Precio = ?, Descripcion = ?, Tipo_Material = ?, Tipo_Medida_Material = ?, Cantidad = ? WHERE id_material = ?`;

    const [results] = await Pool.query(sql, [
      Nombre,
      Precio,
      Descripcion,
      Tipo_Material,
      Tipo_Medida_Material,
      Cantidad,
      id_material,
    ]);
    if (results.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Material actualizado exitosamente", status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se actualizó el material", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al realizar la actualización: " + e, status: 500 });
  }
};

export const eliminarMateriales = async (req, res) => {
  try {
    const { id_material } = req.params;
    let sql = `DELETE FROM materiales WHERE id_material = ?`;
    const [results] = await Pool.query(sql, [id_material]);
    if (results.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Material eliminado exitosamente", status: 200 });
    } else {
      res
        .status(404)
        .json({ message: "No se eliminó el material", status: 404 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al eliminar el material: " + e, status: 500 });
  }
}