import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "./CustomBaeEntity";
import Usuarios from "./Usuarios";

@Entity({ database: 'srssui5_face-recognition', name: 'FACE_EMPLOYEE' })
export default class FaceEmployee extends CustomBaseEntity  {

    @PrimaryGeneratedColumn()
    id: number | null;

    @ManyToOne(() => Usuarios)
    @JoinColumn([{ name: 'id_employee', referencedColumnName: 'id' }])
    user: Usuarios;

    @Column({ name: 'create_date', type: "datetime" })
    createDate: Date;

    @Column({ name: 'is_active', type: "tinyint" })
    isActive: number;
    
    constructor() {
        super();
        this.id                 = null;
        this.user               = null;
        this.createDate         = null;
        this.isActive           = 1;
    }
}