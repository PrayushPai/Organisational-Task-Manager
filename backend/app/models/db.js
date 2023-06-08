const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

const db = mysql.createPool({
    host: dbConfig.host, // the host name MYSQL_DATABASE: node_mysql
    user: dbConfig.user, // database user MYSQL_USER: MYSQL_USER
    password: dbConfig.password, // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: dbConfig.database // database name MYSQL_HOST_IP: mysql_db
});

module.exports = db;