import { Router } from "express";
import { registrarTipoCultivo, obtenerTiposCultivo, obtenerTipoCultivoPorId, actualizarTipoCultivo, eliminarTipoCultivo } from "../controllers/controller.tipoCultivo.js";

const router = Router();

router.post("/registrar", registrarTipoCultivo);
router.get("/listar", obtenerTiposCultivo);
router.get("/obtener/:id_tipo_cultivo", obtenerTipoCultivoPorId);
router.put("/actualizar/:id_tipo_cultivo", actualizarTipoCultivo);
router.delete("/eliminar/:id_tipo_cultivo", eliminarTipoCultivo);

export default router;