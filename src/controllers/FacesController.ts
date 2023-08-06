import { NextFunction,Request,Response } from "express";
import FaceEmployeeService from "../services/FaceEmployeeService";

export class FacesController {

    private service : FaceEmployeeService;

    constructor() {
        this.service = new FaceEmployeeService();
    }

    async addFace(req: Request, res: Response,next :NextFunction) {
        try {
            const idEmployee  = req.body.idEmployee;
            const image       = req.body.image;
            console.log((req as any).user)
            if (idEmployee) {
              const user = await this.service.addFace(idEmployee,"");
              res.json(user);
            } else {
              throw new Error("Not user logued");
            }
               
           } catch (error) {
               next(error);
           }
           
         }

}
