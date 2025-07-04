// Importo todo lo de la libreria de Express
import express from "express";
import productsRoutes from "./src/routes/Products.js";
import clientsRoutes from "./src/routes/Clients.js"
import employeesRoutes from "./src/routes/Employees.js";
import branchesRoutes from "./src/routes/branches.js"
import RegisterEmployes from "./src/routes/RegisterEmployees.js"
import loginRoutes from "./src/routes/login.js"
import cookieParser from "cookie-parser";
import PasswordRoute from "./src/routes/recoveryPassword.js";
import salesRoute from "./src/routes/sales.js"
import cors from "cors";

import registerClientsRoutes from "./src/routes/registerClientsController.js";
// Creo una constante que es igual a la libreria que importé
const app = express();


app.use(express.json())
//Definir las rutas de las funciones que tendra la app 

app.use(cors());

//Que postman acepte guardar cookies
app.use(cookieParser())

app.use("/api/Products", productsRoutes);

app.use("/api/clients", clientsRoutes);

app.use("/api/Employees", employeesRoutes);

app.use("/api/Sucursales", branchesRoutes);

app.use("/api/RegisterEmployees", RegisterEmployes);

app.use("/api/Login",  loginRoutes)

app.use("/api/registerClients", registerClientsRoutes);

app.use ("/api/recoveryPassword", PasswordRoute);

app.use("/api/sales", salesRoute);




// Exporto la constante para poder usar express en otros archivos
export default app;
