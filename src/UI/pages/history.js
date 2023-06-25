window.addEventListener("DOMContentLoaded", () => {
    const mysql = require("mysql");

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: null,
        database: "electron_db",
    });

    connection.connect();

    const sql = "SELECT * FROM `history`";

    connection.query(sql, function(error, results, fields) {
        if (error) throw error;

        const table = document.createElement("table");
        table.style.border = "1px solid black";

        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headerRow = document.createElement("tr");
        Object.keys(results[0]).forEach((key) => {
            const th = document.createElement("th");
            th.textContent = key;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        results.forEach((row) => {
            const dataRow = document.createElement("tr");
            Object.entries(row).forEach(([key, value]) => {
                const td = document.createElement("td");
                td.textContent = value;
                td.setAttribute("data-column", key); // Add data-column attribute to identify the column
                dataRow.appendChild(td);
            });
            tbody.appendChild(dataRow);
        });

        table.appendChild(thead);
        table.appendChild(tbody);

        const div = document.getElementById("tableContainer");
        div.appendChild(table);


    });
});