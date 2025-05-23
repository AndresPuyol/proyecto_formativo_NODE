import { Router } from "express";
import { registrarVenta, obtenerVentas, obtenerVentaPorId, actualizarVenta, eliminarVenta } from "../controllers/controller.ventas.js";

const router = Router();

router.post("/registrar", registrarVenta);
router.get("/listar", obtenerVentas);
router.get("/obtener/:id_venta", obtenerVentaPorId);
router.put("/actualizar/:id_venta", actualizarVenta);
router.delete("/eliminar/:id_venta", eliminarVenta);

export default router;