import { Router } from 'express';
import {
    registrarTratamiento,
    actualizarTratamiento,
    eliminarTratamiento,
    obtenerTratamiento
} from '../controllers/tratamiento.js';

import { validarTokenUsuario_EIS as validarToken } from "../middlewares/authentication.js";


const router = Router();


router.post('/registrar',validarToken, registrarTratamiento);
router.put('/actualizar/:Id_Tratamiento',validarToken, actualizarTratamiento);
router.delete('/eliminar/:Id_Tratamiento', validarToken,eliminarTratamiento);
router.get('/obtener/:Id_Tratamiento',validarToken, obtenerTratamiento);

export default router;