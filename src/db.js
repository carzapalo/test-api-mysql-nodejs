//createpoll es para tener varios hilos de conexion
import {createPool} from 'mysql2/promise'
import  {DB_HOST,DB_USER,DB_PASSWORD, DB_PORT, DB_DATABASE} from'./config.js';

//creamos la conexion

export const con=createPool({
    host: DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    port:DB_PORT,
    database:DB_DATABASE
});