import { Router } from "express";
import {eliminarActividad, actualizarActividad, obtenerActividad, obtenerActividadPorId, registrarActividad } from "../controllers/controller.actividades.js";
import { cargarImagen } from "../middlewares/upload.js";

const router = Router();

router.post("/registrar",cargarImagen, registrarActividad);
router.get("/listar", obtenerActividad);
router.get("/obtener/:Id_actividad", obtenerActividadPorId);
router.put("/actualizar/:Id_actividad", cargarImagen, actualizarActividad);
router.delete("/eliminar/:Id_actividad", eliminarActividad);


export default router;
