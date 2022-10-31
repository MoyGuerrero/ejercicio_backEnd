const sql = require('mssql');


const sqlConfig = {
    user: 'sa',
    password: 'Normita2411$',
    database: 'examenTecnico',
    server: 'localhost', 
    trustServerCertificate: true,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000
    }
}

const dbConnection = async () => {
    try {
        let pool = await sql.connect(sqlConfig);
        console.log('Database online!');
        return pool;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbConnection
}