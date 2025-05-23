import { Router } from "express";
import { 
    registrarCultivo, 
    obtenerCultivos, 
    obtenerCultivoPorId, 
    actualizarCultivo, 
    eliminarCultivo 
} from "../controllers/controller.cultivos.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Carpeta de almacenamiento

const router = Router();

router.get("/listar", obtenerCultivos);
router.get("/obtener/:id_cultivo", obtenerCultivoPorId);
router.put("/actualizar/:id_cultivo", actualizarCultivo);
router.delete("/eliminar/:id_cultivo", eliminarCultivo);
router.post("/registrar", upload.single("Img"), registrarCultivo);

export default router;