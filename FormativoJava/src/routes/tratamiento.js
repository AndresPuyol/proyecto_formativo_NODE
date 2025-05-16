import { Router } from 'express';
import {
    registrarTratamiento,
    actualizarTratamiento,
    eliminarTratamiento,
    obtenerTratamiento
} from '../controllers/tratamiento.js';


const router = Router();


router.post('/registrar', registrarTratamiento);
router.put('/actualizar/:id', actualizarTratamiento);
router.delete('/eliminar/:id', eliminarTratamiento);
router.get('/obtener/:id', obtenerTratamiento);

export default router;