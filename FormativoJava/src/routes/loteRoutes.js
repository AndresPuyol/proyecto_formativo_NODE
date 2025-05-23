import { Router } from "express";
import { 
    listarLotes, 
    registrarLote, 
    actualizarLote, 
    eliminarLote, 
    obtenerLote 
} from "../controllers/loteController.js";

// import { validarToken } from "../middlewares/authentication.js";

const router = Router();

//router.use(validarToken);
// router.post("/validar", validarUsuario); 

router.get("/lotes", /*validarToken,*/ listarLotes);
router.post("/registrar", /*validarToken,*/ registrarLote);
router.get("/obtener/:id", /*validarToken,*/ obtenerLote);
router.put("/actualizar/:id", /*validarToken,*/ actualizarLote);
router.delete("/eliminar/:id", /*validarToken,*/ eliminarLote);

export default router;