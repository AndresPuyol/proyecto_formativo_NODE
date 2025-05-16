import express from 'express';
import bodyParser from "body-parser";

// Nuevos routers importados
import tipoUsuario from './src/routes/tipo_usuario.routes.js';
import usuario from './src/routes/usuario.routes.js';

const servidor = express();

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));


// Nuevas rutas agregadas
servidor.use('/tipo_usuario', tipoUsuario);
servidor.use('/usuario', usuario);

servidor.listen(2925, () => {
  console.log('Servidor iniciado en el puerto 2925 activo proyecto');
});
