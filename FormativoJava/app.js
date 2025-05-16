import express from 'express';
import bodyparser from 'body-parser';


export const Servidor = express();


Servidor.use(bodyparser.json());
Servidor.use(bodyparser.urlencoded({ urlencoded: true }));


Servidor.listen(10000,()=>{
    console.log("Servidor corriendo en el puerto 10000");
});


