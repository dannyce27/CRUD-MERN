import express from "express";
import logoutController from "../controllers/logout.js";

//router nos ayuda a cargar los metodos que tendra mi ruta 
const router = express.Router();

router.route("/")
.post(logoutController.logout)
;

export default router;