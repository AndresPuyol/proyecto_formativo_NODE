import express from "express";
import { 
  registrarTipoUsuario,
  actualizarTipoUsuario,
  eliminarTipoUsuario,
  obtenerTipoUsuario,
  listarTiposUsuario,
  listarUsuariosPorTipo,
  estadisticasPorTipo,
  verificarPermiso
} from "../controllers/controlller.tipo_usuario.js";

import { validarTokenUsuario_EIS as validarToken } from "../middlewares/authentication.js";

const router = express.Router();


router.post("/registrar", validarToken,registrarTipoUsuario);
router.put("/actualizar/:idTipoUsuario", validarToken,actualizarTipoUsuario);
router.delete("/eliminar/:idTipoUsuario", validarToken,eliminarTipoUsuario);
router.get("/buscar/:idTipoUsuario", validarToken,obtenerTipoUsuario);
router.get("/listar", validarToken,listarTiposUsuario);
router.get("/listar-usuarios", validarToken, listarUsuariosPorTipo);
router.get("/estadisticas", validarToken, verificarPermiso(['admin']), estadisticasPorTipo);

export default router;
