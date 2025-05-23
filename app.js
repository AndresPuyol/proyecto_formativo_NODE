import express from 'express';
import bodyParser from "body-parser";

// Nuevos routers importados
import tipoUsuario from './src/routes/tipo_usuario.routes.js';
import usuario from './src/routes/usuario.routes.js';
import materiales from './src/routes/route.materiales.js';
import epa from './src/routes/route.epa.js';
import cultivoepa from './src/routes/route.cultivo_epa.js';
import actividad from './src/routes/route.actividades.js';
import lote from './src/routes/loteRoutes.js';
import sensor from './src/routes/sensorRoutes.js';
import surco from './src/routes/surcoRoutes.js';
import tiposensor from './src/routes/tiposensorRoutes.js';
import cultivosepa from './src/routes/cultivosepaRoutes.js';
import informacionsensor from './src/routes/informacionsensorRoutes.js';
import tratamiento from './src/routes/tratamiento.js';
import epatratamiento from './src/routes/epa_tratamiento.js';
import activadesmaterial from './src/routes/actividades_material.js';


const servidor = express();

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));


// Nuevas rutas agregadas
servidor.use('/activadesmaterial', activadesmaterial);
servidor.use('/epa_tratamiento', epatratamiento);
servidor.use('/tratamiento',tratamiento)
servidor.use('/tipo_usuario', tipoUsuario);
servidor.use('/usuario', usuario);
servidor.use('/materiales', materiales);
servidor.use('/epa', epa);
servidor.use('/cultivo_epa', cultivoepa);
servidor.use('/actividad', actividad);
servidor.use('/lote', lote);
servidor.use('/sensor', sensor);
servidor.use('/surco', surco);
servidor.use('/tiposensor', tiposensor);
servidor.use('/cultivosepa', cultivosepa);
servidor.use('/informacionsensor', informacionsensor);

servidor.listen(2925, () => {
  console.log('Servidor iniciado en el puerto 2925 activo proyecto');
});
