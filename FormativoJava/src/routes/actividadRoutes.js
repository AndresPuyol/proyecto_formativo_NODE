import { Router } from "express";
import { 
    listarActividades, 
    registrarActividad, 
    actualizarActividad, 
    eliminarActividad, 
    obtenerActividad 
} from "../controllers/actividadController.js";

// import { validarToken } from "../middlewares/authentication.js";

const router = Router();

// router.use(validarToken);
// router.post("/validar", validarUsuario);

router.get("/actividades", /*validarToken,*/ listarActividades);
router.post("/registrar", /*validarToken,*/ registrarActividad);
router.get("/obtener/:id", /*validarToken,*/ obtenerActividad);
router.put("/actualizar/:id", /*validarToken,*/ actualizarActividad);
router.delete("/eliminar/:id", /*validarToken,*/ eliminarActividad);

export default router;