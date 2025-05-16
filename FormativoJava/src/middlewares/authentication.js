import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Pool } from '../database/conexion.js';

// Validar usuario (login)
export const validarUsuario_EIS = async (req, res) => {
    try {
        const { login, password } = req.body;

        // Asumo que login es el correo para el login de usuario
        const sql = `
            SELECT Id_Usuario, Id_Identificacion, Nombre, Apellidos, Telefono, Correo, Password_Hash, Id_Tipo_Usuario
            FROM usuarios
            WHERE Correo = ?
        `;
        const [results] = await Pool.query(sql, [login]);

        if (results.length > 0) {
            const usuario = results[0];

            // Verificar contraseña con bcrypt
            const passwordValida = await bcrypt.compare(password, usuario.Password_Hash);
            if (!passwordValida) {
                return res.status(401).json({ message: 'Credenciales incorrectas. Usuario no autorizado.', status: 401 });
            }

            // Generar token JWT
            const token = jwt.sign(
                {
                    tipo: 'usuario',
                    id_usuario: usuario.Id_Usuario,
                    identificacion: usuario.Id_Identificacion,
                    nombre: usuario.Nombre,
                    apellidos: usuario.Apellidos,
                    telefono: usuario.Telefono,
                    correo: usuario.Correo,
                    tipo_usuario: usuario.Id_Tipo_Usuario
                },
                process.env.JWT_SECRET || "clave_secreta_super_segura",
                { expiresIn: '1 year' }
            );

            res.status(200).json({ usuario, token });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.', status: 404 });
        }
    } catch (error) {
        console.error("Error en validarUsuario_EIS:", error.message);
        res.status(500).json({ message: 'Error del servidor al validar usuario.', error: error.message, status: 500 });
    }
};

// Middleware para validar token usuario
export const validarTokenUsuario_EIS = (req, res, next) => {
  try {
    // El token se espera en el header Authorization con esquema Bearer
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ status: false, msg: "Token no proporcionado" });

    const token = authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) return res.status(401).json({ status: false, msg: "Token inválido" });

    const secret = process.env.JWT_SECRET || "clave_secreta";
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(401).json({ status: false, msg: "Token inválido o expirado" });

      // Opcional: puedes guardar los datos decodificados en req para usar en rutas siguientes
      req.usuario = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Error en validación de token: " + error.message });
  }
};