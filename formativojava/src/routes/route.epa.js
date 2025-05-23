import { Router } from "express";
import { registrarEpa, cargarImagen, obtenerEpa, obtenerEpaPorId, actualizarEpa, eliminarEpa } from "../controllers/controller.epa.js";

const router = Router();

router.post("/registrar", cargarImagen, registrarEpa);
router.get("/listar", obtenerEpa);
router.get("/obtener/:id_epa", obtenerEpaPorId);
router.put("/actualizar/:id_epa", actualizarEpa);
router.put("/eliminar/:id_epa", eliminarEpa);

export default router;