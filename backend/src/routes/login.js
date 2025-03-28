//import de la libreria express
import express from "express";
import loginController from "../controllers/login.js";

//router nos ayuda a cargar los metodos que tendra mi ruta 
const router = express.Router();

router.route("/")
.post(loginController.login)
;

export default router;