const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'store'
});
 
connection.connect();
module.exports = connection;