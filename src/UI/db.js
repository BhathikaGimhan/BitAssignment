window.addEventListener("DOMContentLoaded", () => {
  const mysql = require("mysql");

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "electron_db",
  });

  connection.connect();

<<<<<<< HEAD
  const sql = "SELECT `name`, `age`, `address`, `email` FROM `test`";
=======
    const sql = 'SELECT * FROM `user`';
>>>>>>> 495b682ab50b605e5c30c7f6d2aecd40d6a7ac3d

  connection.query(sql, function (error, results, fields) {
    if (error) throw error;

<<<<<<< HEAD
    const name = results[0].name;
    console.log(results[0].name);
    const div = document.getElementById("name");
    div.innerHTML += name;
  });
=======
        const name = results[0].name;
        console.log(results[0].id);
        const div = document.getElementById("name");
        div.innerHTML += name;
    });
>>>>>>> 495b682ab50b605e5c30c7f6d2aecd40d6a7ac3d

  connection.end();
});
