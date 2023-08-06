import FaceEmployeeDao from "../daos/FaceEmployeeDao";
import FaceEmployee from "../entities/FaceEmployee";

export default class FaceEmployeeService {
    private dao;
    //public static PATH_PROFILE = "user_profiles";
    constructor() {
        this.dao       = new FaceEmployeeDao();
    }
    public getById = async (id:number) : Promise<FaceEmployee> => {
        return await this.dao.findOne(id);
    }

    public addFace = async (idEmployee:number,imageBase64:string) : Promise<void> => {
        const emp = await this.getById(idEmployee)
        console.log(emp);
    }
}