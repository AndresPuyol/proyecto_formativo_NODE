import { Pool } from "../database/conexion.js";

// Validaciones
const validarTexto = (texto, min = 1, max = 100) =>
    typeof texto === "string" && texto.trim().length >= min && texto.trim().length <= max;

// Middleware simple para verificar permisos según user_type
export const verificarPermiso = (permisosPermitidos = []) => (req, res, next) => {
    const userType = req.usuario?.user_type || ""; // Debe venir del token decodificado
    if (!permisosPermitidos.includes(userType)) {
        return res.status(403).json({ status: false, msg: "No tienes permiso para realizar esta acción." });
    }
    next();
};

// REGISTRAR tipo de usuario
export const registrarTipoUsuario = async (req, res) => {
    try {
        let { nombre, descripcion = "" } = req.body;

        nombre = nombre?.trim();
        descripcion = descripcion?.trim();

        if (!validarTexto(nombre, 3, 50)) {
            return res.status(400).json({ status: false, msg: "El nombre es obligatorio y debe tener entre 3 y 50 caracteres." });
        }

        const [existe] = await Pool.query(
            "SELECT Id_Tipo_Usuario FROM tipo_usuario WHERE LOWER(nombre) = ?",
            [nombre.toLowerCase()]
        );
        if (existe.length > 0) {
            return res.status(409).json({ status: false, msg: "Ya existe un tipo de usuario con ese nombre." });
        }

        const sql = "INSERT INTO tipo_usuario (nombre, descripcion) VALUES (?, ?)";
        const [result] = await Pool.query(sql, [nombre, descripcion]);

        if (result.affectedRows > 0) {
            return res.status(201).json({ status: true, msg: "Tipo de usuario registrado correctamente", id: result.insertId });
        } else {
            return res.status(400).json({ status: false, msg: "Error al registrar el tipo de usuario." });
        }
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error en el servidor: " + error.message });
    }
};

// ACTUALIZAR tipo de usuario
export const actualizarTipoUsuario = async (req, res) => {
    try {
        const { idTipoUsuario } = req.params;
        let { nombre, descripcion = "" } = req.body;

        nombre = nombre?.trim();
        descripcion = descripcion?.trim();

        if (!validarTexto(nombre, 3, 50)) {
            return res.status(400).json({ status: false, msg: "El nombre es obligatorio y debe tener entre 3 y 50 caracteres." });
        }

        const [existe] = await Pool.query("SELECT Id_Tipo_Usuario FROM tipo_usuario WHERE Id_Tipo_Usuario = ?", [idTipoUsuario]);
        if (existe.length === 0) {
            return res.status(404).json({ status: false, msg: "No se encontró el tipo de usuario." });
        }

        const [duplicado] = await Pool.query(
            "SELECT Id_Tipo_Usuario FROM tipo_usuario WHERE LOWER(nombre) = ? AND Id_Tipo_Usuario != ?",
            [nombre.toLowerCase(), idTipoUsuario]
        );
        if (duplicado.length > 0) {
            return res.status(409).json({ status: false, msg: "Ya existe otro tipo de usuario con ese nombre." });
        }

        const sql = "UPDATE tipo_usuario SET nombre = ?, descripcion = ? WHERE Id_Tipo_Usuario = ?";
        const [result] = await Pool.query(sql, [nombre, descripcion, idTipoUsuario]);

        res.status(result.affectedRows > 0 ? 200 : 400).json({
            status: result.affectedRows > 0,
            msg: result.affectedRows > 0 ? "Datos actualizados correctamente." : "No se realizaron cambios."
        });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error en el servidor: " + error.message });
    }
};

// ELIMINAR tipo de usuario
export const eliminarTipoUsuario = async (req, res) => {
    try {
        const { idTipoUsuario } = req.params;

        const [result] = await Pool.query("DELETE FROM tipo_usuario WHERE Id_Tipo_Usuario = ?", [idTipoUsuario]);

        res.status(result.affectedRows > 0 ? 200 : 404).json({
            status: result.affectedRows > 0,
            msg: result.affectedRows > 0 ? "Tipo de usuario eliminado correctamente." : "Tipo de usuario no encontrado."
        });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error en el servidor: " + error.message });
    }
};

// OBTENER un tipo de usuario
export const obtenerTipoUsuario = async (req, res) => {
    try {
        const { idTipoUsuario } = req.params;

        const [rows] = await Pool.query("SELECT * FROM tipo_usuario WHERE Id_Tipo_Usuario = ?", [idTipoUsuario]);

        if (rows.length > 0) {
            return res.status(200).json({ status: true, data: rows[0] });
        } else {
            return res.status(404).json({ status: false, msg: "Tipo de usuario no encontrado." });
        }
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error en el servidor: " + error.message });
    }
};

// LISTAR todos los tipos de usuario
export const listarTiposUsuario = async (req, res) => {
    try {
        const [rows] = await Pool.query("SELECT * FROM tipo_usuario");

        return res.status(200).json({
            status: true,
            data: rows,
            msg: rows.length > 0 ? "Listado obtenido correctamente." : "No hay tipos de usuario registrados."
        });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error en el servidor: " + error.message });
    }
};

// Listar usuarios filtrados por tipo (nuevo método)
export const listarUsuariosPorTipo = async (req, res) => {
    try {
        const { user_type } = req.query;
        let sql = "SELECT * FROM usuarios";
        const params = [];

        if (user_type) {
            sql += " WHERE user_type = ?";
            params.push(user_type);
        }

        const [rows] = await Pool.query(sql, params);

        return res.status(200).json({
            status: true,
            data: rows,
            msg: rows.length > 0 ? "Usuarios listados correctamente." : "No se encontraron usuarios para el tipo dado."
        });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error en el servidor: " + error.message });
    }
};

// Obtener estadísticas: cantidad de usuarios por tipo (nuevo método)
export const estadisticasPorTipo = async (req, res) => {
    try {
        const sql = "SELECT user_type, COUNT(*) AS cantidad FROM usuarios GROUP BY user_type";
        const [rows] = await Pool.query(sql);

        const stats = {};
        rows.forEach(row => {
            stats[row.user_type] = row.cantidad;
        });

        return res.status(200).json({
            status: true,
            data: stats,
            msg: "Estadísticas obtenidas correctamente."
        });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error en el servidor: " + error.message });
    }
};
