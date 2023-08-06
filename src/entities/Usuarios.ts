import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "./CustomBaeEntity";
import config from "../config/config";

@Entity({ database: config.dbUser, name: 'usuarios' })
export default class Usuarios extends CustomBaseEntity  {

    @PrimaryGeneratedColumn({ name: "id_usuario" })
    id: number | null;


    @Column({ type: "varchar" })
    login: string;

    @Column({ type: "varchar" })
    email: string;
    
    @Column({ type: "varchar" })
    nombre: string;

    constructor() {
        super();
        this.id                 = null;
        this.login              = null;
        this.email              = null;
        this.nombre             = null;
    }
}