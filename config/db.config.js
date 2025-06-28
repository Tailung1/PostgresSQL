import { Pool } from "pg";

const pool= new Pool({
    user:"postgres",
    password:"2003",
    host:"localhost",
    port:"5432",
    database:"Ecommerse"
})

export default pool