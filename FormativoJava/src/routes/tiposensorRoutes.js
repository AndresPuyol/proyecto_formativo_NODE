import { Router } from "express";
import { 
    listarTiposSensor, 
    registrarTipoSensor, 
    actualizarTipoSensor, 
    eliminarTipoSensor, 
    obtenerTipoSensor 
} from "../controllers/tiposensorController.js";

// import { validarToken } from "../middlewares/authentication.js";

const router = Router();

//router.use(validarToken);
// router.post("/validar", validarUsuario);

router.get("/tiposensores", /*validarToken,*/ listarTiposSensor);
router.post("/registrar", /*validarToken,*/ registrarTipoSensor);
router.get("/obtener/:id", /*validarToken,*/ obtenerTipoSensor);
router.put("/actualizar/:id", /*validarToken,*/ actualizarTipoSensor);
router.delete("/eliminar/:id", /*validarToken,*/ eliminarTipoSensor);

export default router;