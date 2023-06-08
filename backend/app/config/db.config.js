module.exports = {
    host: process.env.DATABASE_HOST, // the host name MYSQL_DATABASE: node_mysql
    user: process.env.DATABASE_USER, // database user MYSQL_USER: MYSQL_USER
    password: process.env.DATABASE_PASSWORD, // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: process.env.DATABASE_NAME, // database name MYSQL_HOST_IP: mysql_db
    port: process.env.DATABASE_PORT // database port MYSQL_TCP_PORT: 3306
};