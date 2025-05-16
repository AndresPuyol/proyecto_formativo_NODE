import express from 'express';
import bodyparser from 'body-parser';
import materiales from './src/routes/route.materiales.js';
import epa from './src/routes/route.epa.js';
import cultivoepa from './src/routes/route.cultivo_epa.js';
import actividad from './src/routes/route.actividades.js';

export const Servidor = express();


Servidor.use(bodyparser.json());
Servidor.use(bodyparser.urlencoded({ urlencoded: true }));



Servidor.use(express.static('public'));


Servidor.use('/materiales', materiales);
Servidor.use('/epa', epa);
Servidor.use('/cultivo_epa', cultivoepa);
Servidor.use('/actividad', actividad);


Servidor.listen(10000,()=>{
    console.log("Servidor corriendo en el puerto 10000");
});


