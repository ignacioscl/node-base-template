import { DataSource } from 'typeorm';
import config from './config';
import FaceEmployee from '../entities/FaceEmployee';
import Usuarios from '../entities/Usuarios';

// Ejemplo de uso de las variables de entorno
const dbHost = config.dbHost;
const dbUser = config.dbUser;
const dbPassword = config.dbPassword;


export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbHost ,
    port: 3306,
    username: dbUser,
  password: dbPassword,/*
  database: process.env.DB_NAME || "myapp",*/
  //logging: ["query"],
  entities: [FaceEmployee,Usuarios], // Register your entity here
})