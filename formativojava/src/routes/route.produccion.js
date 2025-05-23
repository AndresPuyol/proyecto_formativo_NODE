import { Router } from "express";
import { registrarProduccion, obtenerProducciones, obtenerProduccionPorId, actualizarProduccion, eliminarProduccion } from "../controllers/controller.produccion.js";

const router = Router();

router.post("/registrar", registrarProduccion);
router.get("/listar", obtenerProducciones);
router.get("/obtener/:id_produccion", obtenerProduccionPorId);
router.put("/actualizar/:id_produccion", actualizarProduccion);
router.delete("/eliminar/:id_produccion", eliminarProduccion);

export default router;