import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "./CustomBaeEntity";
import FaceEmployee from "./FaceEmployee";


@Entity({ database: 'srssui5_face-recognition', name: 'FILE_FACE_EMPLOYEE' })
export default class FileFaceEmployee extends CustomBaseEntity  {

    @PrimaryGeneratedColumn()
    id: number | null;

    @ManyToOne(() => FaceEmployee)
    @JoinColumn([{ name: 'id_face_employee', referencedColumnName: 'id' }])
    faceEmployee: FaceEmployee;

    @Column({ name: 'create_date', type: "datetime",insert:false,update:false })
    createDate: Date;

    @Column({ type: "varchar"})
    descriptor?: string;
    
    constructor(id?:number,face?:FaceEmployee) {
        super();
        this.id                 = id;
        this.faceEmployee       = face;
        this.createDate         = null;
    }
}