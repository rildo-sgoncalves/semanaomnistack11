const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/**
 * Tipos de parâmetros:
 * 
 * Query params: Parâmetros nomeados enviados na rota após o símbolo de interrogação (Filtros, paginação)
 * Route params: Parâmatros utilizados para identificar recursoso (/users/:id)
 * Request body: Corpo da requisição utilizado para criar ou alterar recursos
 */
/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 */
/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 * KNEXjs
 */


app.listen(3333);