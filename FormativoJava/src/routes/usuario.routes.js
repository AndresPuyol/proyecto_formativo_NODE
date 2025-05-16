import express from "express";
import {
    registrarUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    iniciarSesion,
    obtenerTodosUsuarios,
    cerrarSesion,
    cambiarPassword,
    recuperarPassword,
    asignarRol
} from "../controllers/controller.usuario.js";

// Si tienes un middleware de autenticación por JWT:
import { validarTokenUsuario_EIS as validarToken,validarUsuario_EIS } from "../middlewares/authentication.js";

const router = express.Router();

// Rutas públicas
router.post('/login', iniciarSesion); // Inicio de sesión
router.post('/registrar', registrarUsuario); // Registro
router.post('/validar', validarUsuario_EIS);

// Rutas protegidas
router.get('/listar', validarToken, obtenerTodosUsuarios); // Listar todos los usuarios
router.get('/buscar/:Id_Usuario', validarToken, obtenerUsuario); // Obtener un usuario por ID
router.put('/actualizar/:Id_Usuario', validarToken, actualizarUsuario); // Actualizar un usuario
router.delete('/eliminar/:Id_Usuario', validarToken, eliminarUsuario); // Eliminar un usuario
router.put('/cambiar-password/:Id_Usuario', validarToken,cambiarPassword); // Cambiar contraseña
router.put('/asignar-rol/:Id_Usuario', validarToken,asignarRol);     // Asignar rol a usuario
router.post('/logout', validarToken,cerrarSesion);              // Cerrar sesión (solo info al cliente)
router.post('/recuperar-password', validarToken,recuperarPassword);// Recuperación de contraseña pública
export default router;
