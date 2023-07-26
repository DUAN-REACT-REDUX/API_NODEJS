import { Client } from 'pg'
const connect = new Client({
    user: 'postgres',
    password: 'ADMIN',
    host: 'localhost',
    port: 5432, // Cổng mặc định của PostgreSQL là 5432
    database: 'DUAN',
});
export default connect