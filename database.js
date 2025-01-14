const Pool = require('pg').Pool; 
const pool = new Pool({ 
    user: "postgres", 
    password: "mouadbara", 
    database: "gestion des refuges ", 
    host: "localhost", 
    port: "5432" 
}); 
module.exports = pool; 
