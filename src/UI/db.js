window.addEventListener('DOMContentLoaded', () => {
    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: null,
        database: 'electron_db'
    });

    connection.connect();

    const sql = 'SELECT `name`, `age`, `address`, `other` FROM `test`';

    connection.query(sql, function(error, results, fields) {
        if (error) throw error;

        const name = results[0].other;
        console.log(results[0].name);
        const div = document.getElementById("name");
        div.innerHTML += name;
    });

    connection.end();
});