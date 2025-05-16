import { Router } from "express";
import { obtenerCultivoEpa, obtenerCultivoEpaPorId, registrarCultivoEpa,actualizarCultivoEpa, eliminarCultivoEpa } from "../controllers/controller.cultivo_epa.js";


const router = Router();

router.post("/registrar", registrarCultivoEpa);
router.get("/listar", obtenerCultivoEpa);
router.get("/obtener/:Id_cultivo_epa", obtenerCultivoEpaPorId);
router.put("/actualizar/:Id_cultivo_epa", actualizarCultivoEpa);
router.delete("/eliminar/:Id_cultivo_epa", eliminarCultivoEpa);


export default router;