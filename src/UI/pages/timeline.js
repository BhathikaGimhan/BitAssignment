window.addEventListener("DOMContentLoaded", () => {
    const mysql = require("mysql");

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: null,
        database: "electron_db",
    });

    connection.connect();

    const sql = "SELECT * FROM `tariff`";

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
                td.addEventListener("click", () => {
                    const input = document.createElement("input");
                    input.type = "text";
                    input.value = value;
                    input.addEventListener("blur", () => {
                        const updatedValue = input.value;
                        td.textContent = updatedValue;
                        row[key] = updatedValue;
                    });
                    td.textContent = "";
                    td.appendChild(input);
                    input.focus();
                });
                dataRow.appendChild(td);
            });
            tbody.appendChild(dataRow);
        });

        table.appendChild(thead);
        table.appendChild(tbody);

        const div = document.getElementById("tableContainer");
        div.appendChild(table);

        function updateDatabase(row) {
            if (!row.hasOwnProperty("id")) {
                console.error("Row does not have an 'id' property");
                return;
            }

            const { id, block, energy_charge, fixed_charge } = row; // Modify this based on your table structure

            const updateSql = `UPDATE tariff SET block = '${block}', energy_charge = '${energy_charge}', fixed_charge = '${fixed_charge}' WHERE id = ${id}`;

            connection.query(updateSql, function(error, results, fields) {
                if (error) throw error;
                console.log("Database updated successfully");
            });
        }

        // Get the submit button element
        const submitButton = document.querySelector(".submit");

        // Add click event listener to the submit button
        submitButton.addEventListener("click", () => {
            const tableRows = document.querySelectorAll("tbody tr");

            const updatePromises = Array.from(tableRows).map((tableRow) => {
                const cells = tableRow.querySelectorAll("td");
                const row = {};

                cells.forEach((cell) => {
                    const columnName = cell.getAttribute("data-column");
                    const cellValue = cell.textContent;
                    row[columnName] = cellValue;
                });

                return new Promise((resolve, reject) => {
                    updateDatabase(row);
                    resolve();
                });
            });

            Promise.all(updatePromises)
                .then(() => {
                    console.log("All updates completed");
                })
                .catch((error) => {
                    console.error("Error occurred during updates:", error);
                })
                .finally(() => {
                    // connection.end(); // Close the database connection after all updates are completed
                });
        });

    });
});