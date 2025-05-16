// controller.usuario.js
import { Pool } from "../database/conexion.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helpers
const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
const validarTelefono = (telefono) => /^[0-9]{7,15}$/.test(telefono);

// ===================== REGISTRO ===================== //
export const registrarUsuario = async (req, res) => {
    try {
        let { Id_Identificacion, Nombre, Apellidos, Telefono, Correo, Password_Hash, Id_Tipo_Usuario } = req.body;

        if (!Id_Identificacion || !Nombre || !Apellidos || !Telefono || !Correo || !Password_Hash || !Id_Tipo_Usuario) {
            return res.status(400).json({ status: false, msg: "Todos los campos son obligatorios." });
        }

        Correo = Correo.toLowerCase().trim();
        Nombre = Nombre.trim();
        Apellidos = Apellidos.trim();

        if (!validarCorreo(Correo)) return res.status(400).json({ status: false, msg: "Formato de correo inválido." });
        if (!validarTelefono(Telefono)) return res.status(400).json({ status: false, msg: "Número de teléfono inválido." });
        if (Password_Hash.length < 6) return res.status(400).json({ status: false, msg: "Contraseña muy corta." });

        const [tipoUsuario] = await Pool.query("SELECT 1 FROM tipo_usuario WHERE Id_Tipo_Usuario = ?", [Id_Tipo_Usuario]);
        if (tipoUsuario.length === 0) return res.status(400).json({ status: false, msg: "Tipo de usuario no válido." });

        const [existeCorreo] = await Pool.query("SELECT 1 FROM usuarios WHERE Correo = ?", [Correo]);
        if (existeCorreo.length > 0) return res.status(409).json({ status: false, msg: "El correo ya está registrado." });

        const hashedPassword = await bcrypt.hash(Password_Hash, 10);

        const [result] = await Pool.query(
            "INSERT INTO usuarios (Id_Identificacion, Nombre, Apellidos, Telefono, Correo, Password_Hash, Id_Tipo_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [Id_Identificacion, Nombre, Apellidos, Telefono, Correo, hashedPassword, Id_Tipo_Usuario]
        );

        res.status(201).json({ status: true, msg: "Usuario registrado correctamente", userId: result.insertId });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error al registrar: " + error.message });
    }
};

// ===================== AUTENTICACIÓN ===================== //
export const iniciarSesion = async (req, res) => {
    try {
        let { Correo, Password } = req.body;
        if (!Correo || !Password) return res.status(400).json({ status: false, msg: "Correo y contraseña son obligatorios." });

        Correo = Correo.toLowerCase().trim();
        const [result] = await Pool.query("SELECT * FROM usuarios WHERE Correo = ?", [Correo]);

        if (result.length > 0 && await bcrypt.compare(Password, result[0].Password_Hash)) {
            const usuario = result[0];
            const token = jwt.sign({ id: usuario.Id_Usuario, correo: usuario.Correo }, process.env.JWT_SECRET || "clave_secreta", { expiresIn: '1y' });
            delete usuario.Password_Hash;
            res.status(200).json({ status: true, msg: "Login exitoso", usuario, token });
        } else {
            res.status(401).json({ status: false, msg: "Credenciales incorrectas." });
        }
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error al iniciar sesión: " + error.message });
    }
};

export const cerrarSesion = async (req, res) => {
    res.status(200).json({ status: true, msg: "Sesión cerrada (token debe eliminarse en el cliente)" });
};

// ===================== ACTUALIZACIÓN ===================== //
export const actualizarUsuario = async (req, res) => {
    try {
        const { Id_Usuario } = req.params;
        let { Nombre, Apellidos, Telefono, Correo, Id_Tipo_Usuario } = req.body;

        if (!Nombre || !Apellidos || !Telefono || !Correo || !Id_Tipo_Usuario)
            return res.status(400).json({ status: false, msg: "Todos los campos son obligatorios." });

        Correo = Correo.toLowerCase().trim();
        if (!validarCorreo(Correo)) return res.status(400).json({ status: false, msg: "Correo inválido." });
        if (!validarTelefono(Telefono)) return res.status(400).json({ status: false, msg: "Teléfono inválido." });

        const [tipoUsuario] = await Pool.query("SELECT 1 FROM tipo_usuario WHERE Id_Tipo_Usuario = ?", [Id_Tipo_Usuario]);
        if (tipoUsuario.length === 0) return res.status(400).json({ status: false, msg: "Tipo de usuario inválido." });

        const [result] = await Pool.query(
            "UPDATE usuarios SET Nombre=?, Apellidos=?, Telefono=?, Correo=?, Id_Tipo_Usuario=? WHERE Id_Usuario=?",
            [Nombre, Apellidos, Telefono, Correo, Id_Tipo_Usuario, Id_Usuario]
        );

        res.status(result.affectedRows > 0 ? 200 : 404).json({ status: result.affectedRows > 0, msg: result.affectedRows > 0 ? "Usuario actualizado." : "No encontrado." });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error al actualizar: " + error.message });
    }
};

export const cambiarPassword = async (req, res) => {
    try {
        const { Id_Usuario } = req.params;
        const { actual, nueva } = req.body;

        const [rows] = await Pool.query("SELECT Password_Hash FROM usuarios WHERE Id_Usuario = ?", [Id_Usuario]);
        if (rows.length === 0) return res.status(404).json({ status: false, msg: "Usuario no encontrado" });

        const match = await bcrypt.compare(actual, rows[0].Password_Hash);
        if (!match) return res.status(401).json({ status: false, msg: "Contraseña actual incorrecta" });

        const nuevaHash = await bcrypt.hash(nueva, 10);
        await Pool.query("UPDATE usuarios SET Password_Hash = ? WHERE Id_Usuario = ?", [nuevaHash, Id_Usuario]);

        res.status(200).json({ status: true, msg: "Contraseña actualizada correctamente." });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error al cambiar contraseña: " + error.message });
    }
};

export const recuperarPassword = async (req, res) => {
    try {
        const { Correo } = req.body;
        const [rows] = await Pool.query("SELECT Id_Usuario FROM usuarios WHERE Correo = ?", [Correo]);

        if (rows.length === 0) return res.status(404).json({ status: false, msg: "Correo no registrado" });

        res.status(200).json({ status: true, msg: "Se ha enviado un correo de recuperación (mock)." });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error al recuperar contraseña: " + error.message });
    }
};

export const obtenerUsuario = async (req, res) => {
    try {
        const { Id_Usuario } = req.params;
        const [results] = await Pool.query("SELECT * FROM usuarios WHERE Id_Usuario = ?", [Id_Usuario]);
        if (results.length > 0) res.status(200).json({ status: true, data: results[0] });
        else res.status(404).json({ status: false, msg: "Usuario no encontrado." });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error al obtener el usuario: " + error.message });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const { Id_Usuario } = req.params;
        const [result] = await Pool.query("DELETE FROM usuarios WHERE Id_Usuario = ?", [Id_Usuario]);
        res.status(result.affectedRows > 0 ? 200 : 404).json({ status: result.affectedRows > 0, msg: result.affectedRows > 0 ? "Usuario eliminado." : "Usuario no encontrado." });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error al eliminar: " + error.message });
    }
};

export const obtenerTodosUsuarios = async (req, res) => {
    try {
        const { search = '', role = '', page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        let filtros = [];
        let params = [];

        if (search) {
            filtros.push("(Nombre LIKE ? OR Apellidos LIKE ? OR Correo LIKE ?)");
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }
        if (role) {
            filtros.push("Id_Tipo_Usuario = ?");
            params.push(role);
        }

        const where = filtros.length > 0 ? `WHERE ${filtros.join(" AND ")}` : '';
        const [results] = await Pool.query(
            `SELECT * FROM usuarios ${where} LIMIT ? OFFSET ?`,
            [...params, Number(limit), Number(offset)]
        );

        res.status(200).json({ status: true, data: results });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error al obtener usuarios: " + error.message });
    }
};

export const asignarRol = async (req, res) => {
    try {
        const { Id_Usuario } = req.params;
        const { Id_Tipo_Usuario } = req.body;

        const [tipo] = await Pool.query("SELECT 1 FROM tipo_usuario WHERE Id_Tipo_Usuario = ?", [Id_Tipo_Usuario]);
        if (tipo.length === 0) return res.status(400).json({ status: false, msg: "Rol no válido." });

        const [result] = await Pool.query("UPDATE usuarios SET Id_Tipo_Usuario = ? WHERE Id_Usuario = ?", [Id_Tipo_Usuario, Id_Usuario]);
        res.status(result.affectedRows > 0 ? 200 : 404).json({ status: result.affectedRows > 0, msg: result.affectedRows > 0 ? "Rol actualizado." : "Usuario no encontrado." });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error al asignar rol: " + error.message });
    }
};
