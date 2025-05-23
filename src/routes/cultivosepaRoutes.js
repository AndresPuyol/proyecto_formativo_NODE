import { Router } from "express";
import {
    listarCultivosEpa,
    registrarCultivoEpa,
    actualizarCultivoEpa,
    eliminarCultivoEpa,
    obtenerCultivoEpa
} from "../controllers/cultivosepaController.js";

// import { validarToken } from "../middlewares/authentication.js";

const router = Router();

// router.use(validarToken);

router.get("/cultivosepas", /*validarToken,*/ listarCultivosEpa);
router.post("/registrar", /*validarToken,*/ registrarCultivoEpa);
router.get("/obtener/:id", /*validarToken,*/ obtenerCultivoEpa);
router.put("/actualizar/:id", /*validarToken,*/ actualizarCultivoEpa);
router.delete("/eliminar/:id", /*validarToken,*/ eliminarCultivoEpa);

export default router;