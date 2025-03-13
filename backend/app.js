// Importo todo lo de la libreria de Express
import express from "express";
import productsRoutes from "./src/routes/Products.js";
import clientsRoutes from "./src/routes/Clients.js"
import employeesRoutes from "./src/routes/Employees.js";
import branchesRoutes from "./src/routes/branches.js"

// Creo una constante que es igual a la libreria que importé
const app = express();


app.use(express.json())
//Definir las rutas de las funciones que tendra la app 

app.use("Api/Products", productsRoutes);

app.use("Api/Clientes", clientsRoutes);

app.use("Api/Empleados", employeesRoutes);

app.use("Api/Sucursales", branchesRoutes);


// Exporto la constante para poder usar express en otros archivos
export default app;
