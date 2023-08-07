import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { CustomBaseEntity } from "./CustomBaeEntity";
import Usuarios from "./Usuarios";
import FileFaceEmployee from "./FileFaceEmployee";

@Entity({ database: 'srssui5_face-recognition', name: 'FACE_EMPLOYEE' })
export default class FaceEmployee extends CustomBaseEntity  {

    @PrimaryGeneratedColumn()
    id: number | null;

    @ManyToOne(() => Usuarios)
    @JoinColumn([{ name: 'id_employee', referencedColumnName: 'id' }])
    user: Usuarios;

    @Column({ name: 'create_date', type: "datetime",insert:false,update:false })
    createDate: Date;

    @Column({ name: 'is_active', type: "tinyint" })
    isActive: number;
    
    @OneToMany(type => FileFaceEmployee, fileFaceEmployees => fileFaceEmployees.faceEmployee)
    fileFaceEmployees?: FileFaceEmployee[];

    constructor(id?:number) {
        super();
        this.id                 = id;
        this.user               = null;
        this.createDate         = null;
        this.isActive           = 1;
    }
}