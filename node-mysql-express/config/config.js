require('dotenv').config(); // Load .env variables

module.exports = {
  development: {
    username: "root",
    password: "",
    database: "students",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: 'root',
    password: 'rfoSVVtZvElZPrlhELoUALyDyywFtvhN',
    database: 'railway',
    host: 'switchyard.proxy.rlwy.net',
    port: 59645,
    dialect: 'mysql'
  }
};
