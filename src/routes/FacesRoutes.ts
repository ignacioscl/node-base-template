import { Router } from "express";
import { FacesController } from "../controllers/FacesController";


const facesRouter       = Router();
const facesController   = new FacesController();

// GET /users
facesRouter.post("/addFace", (req, res, next) => facesController.addFace(req,res,next));

export default facesRouter;