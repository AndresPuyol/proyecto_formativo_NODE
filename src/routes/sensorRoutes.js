import { Router } from "express";
import { 
    listarSensores, 
    registrarSensor, 
    actualizarSensor, 
    eliminarSensor, 
    obtenerSensor 
} from "../controllers/sensorController.js";

// import { validarToken } from "../middlewares/authentication.js";

const router = Router();

//router.use(validarToken);
// router.post("/validar", validarUsuario);

router.get("/sensores", /*validarToken,*/ listarSensores);
router.post("/registrar", /*validarToken,*/ registrarSensor);
router.get("/obtener/:id", /*validarToken,*/ obtenerSensor);
router.put("/actualizar/:id", /*validarToken,*/ actualizarSensor);
router.delete("/eliminar/:id", /*validarToken,*/ eliminarSensor);

export default router;