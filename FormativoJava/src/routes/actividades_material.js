import express from 'express';
import {
    registrarActividadMaterial,
    obtenerActividadMaterial,
    actualizarActividadMaterial,
    eliminarActividadMaterial,
    listarActividadMaterial
} from '../controllers/actividades_material.js';

const router = express.Router();

router.post('/registrar', registrarActividadMaterial);
router.get('/obtener/:id', obtenerActividadMaterial);
router.put('/actualizar/:id', actualizarActividadMaterial);
router.delete('/eliminar/:id', eliminarActividadMaterial);
router.get('/listar', listarActividadMaterial);

export default router;
