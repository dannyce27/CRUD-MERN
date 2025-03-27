//import de la libreria express
import express from "express";


//router nos ayuda a cargar los metodos que tendra mi ruta 
const router = express.Router();

router.route("/")
.get()
.post()
router.route("/:id")
.put()
.delete();

export default router;

