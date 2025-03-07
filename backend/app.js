// Importo todo lo de la libreria de Express
import express from "express";

// Creo una constante que es igual a la libreria que importé
const app = express();

//Definir las rutas de las funciones que tendra la app 

app.use("Api/Products");

app.use("Api/Login");

// Exporto la constante para poder usar express en otros archivos
export default app;
