import { Router } from "express";
import { obtenerCultivoEpa, obtenerCultivoEpaPorId, registrarCultivoEpa,actualizarCultivoEpa, eliminarCultivoEpa } from "../controllers/controller.cultivo_epa.js";


const router = Router();

router.post("/registrar", registrarCultivoEpa);
router.get("/listar", obtenerCultivoEpa);
router.get("/obtener/:id_cultivo_epa", obtenerCultivoEpaPorId);
router.put("/actualizar/:id_cultivo_epa", actualizarCultivoEpa);
router.delete("/eliminar/:id_cultivo_epa", eliminarCultivoEpa);


export default router;