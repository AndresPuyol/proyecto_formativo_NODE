import { Router } from 'express';
import {
    registrarEpaTratamiento,
    obtenerEpaTratamiento,
    eliminarEpaTratamiento
} from '../controllers/epa_tratamiento.js';

const router = Router();

router.post('/registrar', registrarEpaTratamiento);
router.get('/obtener/:id', obtenerEpaTratamiento);
router.delete('/eliminar/:id', eliminarEpaTratamiento);

export default router;
