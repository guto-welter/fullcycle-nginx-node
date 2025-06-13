const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

connection.query(`CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`);

app.get('/', (req, res) => {
  const name = `Gustavo - FULL CYCLE ROCKS!!`;
  connection.query(`INSERT INTO people(name) VALUES (?)`, [name], (err) => {
    if (err) {
      return res.send('Erro ao inserir nome');
    }

    connection.query(`SELECT name FROM people`, (err, results) => {
      if (err) {
        return res.send('Erro ao buscar nomes');
      }

      const names = results.map(row => `<li>${row.name}</li>`).join('');
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${names}</ul>`);
    });
  });
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port);
});
