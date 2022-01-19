const { Pool } = require('pg');


const pool = new Pool({
  user: "postgres",
  password: '1234567',
  host: 'localhost',
  port: 5432,
  database: 'pet_management'
});


module.exports = pool;