import { Pool } from "../database/conexion.js";

// Registrar una venta con cálculo automático de `Valor_Total_Venta`
export const registrarVenta = async (req, res) => {
    try {
    let { Fecha, Precio_Unitario, Cantidad_Venta, Id_Produccion } = req.body;
    
    // Cálculo del Valor_Total_Venta
    let Valor_Total_Venta = Precio_Unitario * Cantidad_Venta;
    
    let sql = `INSERT INTO ventas (Fecha, Precio_Unitario, Cantidad_Venta, Valor_Total_Venta, Id_Produccion) VALUES (?, ?, ?, ?, ?)`;

    const [results] = await Pool.query(sql, [Fecha, Precio_Unitario, Cantidad_Venta, Valor_Total_Venta, Id_Produccion]);
    results.affectedRows > 0
        ? res.status(200).json({ message: "Venta registrada exitosamente", status: 200, Valor_Total_Venta })
        : res.status(404).json({ message: "No se registró la venta", status: 404 });
    } catch (e) {
    res.status(500).json({ message: "Error al realizar el registro: " + e, status: 500 });
    }
};

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
    try {
    let sql = `SELECT * FROM ventas`;
    const [ventas] = await Pool.query(sql);
    ventas.length > 0
        ? res.status(200).json({ ventas, status: 200 })
        : res.status(404).json({ message: "No se encontraron ventas", status: 404 });
    } catch (e) {
    res.status(500).json({ message: "Error al obtener las ventas: " + e, status: 500 });
    }
};

// Obtener una venta por ID
export const obtenerVentaPorId = async (req, res) => {
    try {
    const { id_venta } = req.params;
    let sql = `SELECT * FROM ventas WHERE Id_Venta = ?`;
    const [venta] = await Pool.query(sql, [id_venta]);
    venta.length > 0
        ? res.status(200).json({ venta, status: 200 })
        : res.status(404).json({ message: "No se encontró la venta", status: 404 });
    } catch (e) {
    res.status(500).json({ message: "Error al obtener la venta: " + e, status: 500 });
    }
};

// Actualizar una venta con cálculo automático del valor total
export const actualizarVenta = async (req, res) => {
    try {
    const { id_venta } = req.params;
    let { Fecha, Precio_Unitario, Cantidad_Venta, Id_Produccion } = req.body;

    // Recalcular el valor total de la venta
    let Valor_Total_Venta = Precio_Unitario * Cantidad_Venta;

    let sql = `UPDATE ventas SET Fecha = ?, Precio_Unitario = ?, Cantidad_Venta = ?, Valor_Total_Venta = ?, Id_Produccion = ? WHERE Id_Venta = ?`;

    const [results] = await Pool.query(sql, [Fecha, Precio_Unitario, Cantidad_Venta, Valor_Total_Venta, Id_Produccion, id_venta]);
    results.affectedRows > 0
        ? res.status(200).json({ message: "Venta actualizada exitosamente", status: 200, Valor_Total_Venta })
        : res.status(404).json({ message: "No se actualizó la venta", status: 404 });
    } catch (e) {
    res.status(500).json({ message: "Error al realizar la actualización: " + e, status: 500 });
    }
};

// Eliminar una venta
export const eliminarVenta = async (req, res) => {
    try {
    const { id_venta } = req.params;
    let sql = `DELETE FROM ventas WHERE Id_Venta = ?`;
    const [results] = await Pool.query(sql, [id_venta]);
    results.affectedRows > 0
        ? res.status(200).json({ message: "Venta eliminada exitosamente", status: 200 })
        : res.status(404).json({ message: "No se eliminó la venta", status: 404 });
    } catch (e) {
    res.status(500).json({ message: "Error al eliminar la venta: " + e, status: 500 });
    }
};