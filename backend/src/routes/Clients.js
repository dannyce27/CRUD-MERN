//import de la libreria express
import express from "express";
import ClientsController from "../controllers/ClientesController";

//router nos ayuda a cargar los metodos que tendra mi ruta 
const router = express.Router();

router.route("/")
.get(ClientsController.getClients)
.post(ClientsController.createClients)
router.route("/:id")
.put(ClientsController.updateClients)
.delete(ClientsController.deleteClients);

export default router;