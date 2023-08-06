import FaceEmployeeDao from "../daos/FaceEmployeeDao";
import FaceEmployee from "../entities/FaceEmployee";
import Usuarios from "../entities/Usuarios";
import BussinessError from "../types/exceptions/BussinessError";

export default class FaceEmployeeService {
    private dao : FaceEmployeeDao;
    //public static PATH_PROFILE = "user_profiles";
    constructor() {
        this.dao       = new FaceEmployeeDao();
    }
    public getById = async (id:number) : Promise<FaceEmployee> => {
        return await this.dao.findOne(id);
    }

    public addFace = async (idEmployee:number,imageBase64:string) : Promise<void> => {
        if (imageBase64 && imageBase64.length>100) {
            let emp = await this.getById(idEmployee)
            if (!emp) {
                const user = new FaceEmployee();
                user.user = new Usuarios(idEmployee);
                emp = await this.dao.saveUpdate(user);
            }
        } else {
            throw new BussinessError("Image not set",-101);
        }
        

    }

    public delete = async (idEmployee:number) : Promise<void> => {
        await this.dao.delete(idEmployee);
    }
}