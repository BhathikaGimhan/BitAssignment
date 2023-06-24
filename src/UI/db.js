window.addEventListener('DOMContentLoaded', () => {
    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: null,
        database: 'electron_db'
    });

    connection.connect();

    const sql = 'SELECT * FROM `user`';

    connection.query(sql, function(error, results, fields) {
        if (error) throw error;

        const name = results[0].name;
        console.log(results[0].id);
        const div = document.getElementById("name");
        div.innerHTML += name;
    });

    connection.end();
});