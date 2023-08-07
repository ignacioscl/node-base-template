import { SelectQueryBuilder } from 'typeorm'
import { AppDataSource } from '../config/mysqlDatabase';
import FaceEmployee from '../entities/FaceEmployee';
import FaceEmployeeFilter from '../filters/FaceEmployeeFilter';
import config from '../config/config';
import BussinessError from '../types/exceptions/BussinessError';
import FileFaceEmployee from '../entities/FileFaceEmployee';


export class  FaceEmployeeDao{
    private manager;
    constructor() {
        this.manager = AppDataSource.manager;
    }

    public  findOne = async (id:number) : Promise<FaceEmployee> => {
        const face : FaceEmployee = await AppDataSource.manager
        .createQueryBuilder(FaceEmployee, "fe")
        .leftJoinAndSelect("fe.user", "u")
        .leftJoinAndSelect("fe.fileFaceEmployees", "ffe")
        .where("fe.id_employee = :id", { id: id })
        .getOne();
        
        
        return (face ? face.toJSON() : null);
    }
    public fetch = async (filter : FaceEmployeeFilter) : Promise<[FaceEmployee[],number]> => {
        filter.currentPage = (!filter.currentPage ? 0 : filter.currentPage);
        filter.pageSize     = (filter.pageSize ? filter.pageSize : config.pageSize);
        let query : SelectQueryBuilder<FaceEmployee> = AppDataSource.manager
                    .getRepository(FaceEmployee)
                    .createQueryBuilder("fe")
                    .innerJoinAndSelect("fe.user", "u")

        if (filter) {
            if (filter.id) {
                query.andWhere(" fe.id_employee=:id", {id:filter.id});
            } else if (filter.isActive>-1 || !filter.isActive) {
                query.andWhere(" fe.is_active=:active", {active:filter.isActive});
            }
            if (filter.orderBy === null || filter.orderBy === '') {
                query.orderBy("u.nombre");
            } else {
                query.orderBy(filter.orderBy);
            }
        }
       

        const total = await query
                                .skip(filter.currentPage)
                                .take(filter.pageSize)
                                .getCount();
        const results = (await query
                                .skip(filter.currentPage)
                                .take(filter.pageSize)
                                .getRawAndEntities()) as any;
        //const user  = (await query.getMany()) as any;
        const rawResults = results.raw; // Obtener los resultados en formato "raw"
        const faces = results.entities; 

        let ret     = faces.map((e : FaceEmployee) => e.toJSON())
        
        return [ret,total];
    }


    public saveUpdate = async (face : FaceEmployee) : Promise<FaceEmployee> => {
        return await this.manager.save(FaceEmployee,face);
    }

    public addFile = async (idFace:number) : Promise<FileFaceEmployee> => {
        return await this.manager.save(FileFaceEmployee,new FileFaceEmployee(null,new FaceEmployee(idFace)));
    }
    public updateFile = async (file:FileFaceEmployee) : Promise<void> => {
        await this.manager.save(FileFaceEmployee,file);
    }
    public updateStatus = async (idEmployee : number,isActive: 0|1) : Promise<void> => {
        await this.manager
            .createQueryBuilder()
            .update(FaceEmployee)
            .set({
                isActive: isActive
            })
            .where("id_employee = :id", { id: idEmployee })
            .execute();
    }
    public delete = async (idEmployee : number) : Promise<void> => {

        const queryBuilder = AppDataSource.manager
        .createQueryBuilder()
        .delete()
        .from(FaceEmployee)
        .where("id_employee = :idEmployee", { idEmployee });
 
        await queryBuilder.execute();
        
    }
    
}

export default FaceEmployeeDao;