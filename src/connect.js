import { Client } from 'pg'
const connect = new Client({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 3001, // Cổng mặc định của PostgreSQL là 5432
    database: 'DU_AN(BAN_HANG)',
});
export default connect