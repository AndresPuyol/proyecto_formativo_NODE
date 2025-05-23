import { Router } from "express";
import {obtenerMateriales, obtenerMaterialesPorId, registrarMateriales, actualizarMateriales, eliminarMateriales } from "../controllers/controller.materiales.js";

const router = Router();

router.get("/listar", obtenerMateriales);
router.get("/buscar/:idMaterial", obtenerMaterialesPorId);
router.post("/registrar", registrarMateriales);
router.put("/actualizar/:id_material", actualizarMateriales);
router.delete("/eliminar/:id_material", eliminarMateriales);

export default router;
