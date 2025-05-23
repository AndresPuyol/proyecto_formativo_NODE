import { Router } from "express";
import { 
    listarSurcos, 
    registrarSurco, 
    actualizarSurco, 
    eliminarSurco, 
    obtenerSurco 
} from "../controllers/surcoController.js";

// import { validarToken } from "../middlewares/authentication.js";

const router = Router();

//router.use(validarToken);
// router.post("/validar", validarUsuario);

router.get("/surcos", /*validarToken,*/ listarSurcos);
router.post("/registrar", /*validarToken,*/ registrarSurco);
router.get("/obtener/:id", /*validarToken,*/ obtenerSurco);
router.put("/actualizar/:id", /*validarToken,*/ actualizarSurco);
router.delete("/eliminar/:id", /*validarToken,*/ eliminarSurco);

export default router;