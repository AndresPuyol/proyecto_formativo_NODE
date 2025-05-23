import { Router } from "express";
import {
    listarInformacionSensor,
    registrarInformacionSensor,
    actualizarInformacionSensor,
    eliminarInformacionSensor,
    obtenerInformacionSensor
} from "../controllers/informacionsensorController.js";

// import { validarToken } from "../middlewares/authentication.js";

const router = Router();

// router.use(validarToken);

router.get("/informacionsensores", /*validarToken,*/ listarInformacionSensor);
router.post("/registrar", /*validarToken,*/ registrarInformacionSensor);
router.get("/obtener/:id", /*validarToken,*/ obtenerInformacionSensor);
router.put("/actualizar/:id", /*validarToken,*/ actualizarInformacionSensor);
router.delete("/eliminar/:id", /*validarToken,*/ eliminarInformacionSensor);

export default router;