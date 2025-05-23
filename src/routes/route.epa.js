import { Router } from "express";
import { registrarEpa, obtenerEpa, obtenerEpaPorId, actualizarEpa, eliminarEpa } from "../controllers/controller.epa.js";
import { cargarImagen } from "../middlewares/upload.js"

const router = Router();

router.post("/registrar", cargarImagen, registrarEpa);
router.get("/listar", obtenerEpa);
router.get("/obtener/:Id_epa", obtenerEpaPorId);
router.put("/actualizar/:Id_epa", cargarImagen, actualizarEpa);
router.put("/eliminar/:Id_epa", eliminarEpa);

export default router;