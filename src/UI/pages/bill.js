let blockValues = [];
let FixedCharge = [];
const para = document.getElementById("para");
para.innerHTML += 'Enter your monthly Electricity Point';

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

        results.forEach((row) => {
            const { energy_charge } = row;
            const { fixed_charge } = row;
            blockValues.push(energy_charge);
            FixedCharge.push(fixed_charge);
        });

        // Call the function that depends on blockValues
        function DisplayData(inputValue) {
            let BillAmount;
            var main, oldData, oldData60, oldData90, oldData120, oldData180;
            if (inputValue < 60) {
                if (inputValue <= 30) {
                    BillAmount = inputValue * blockValues[0] + FixedCharge[0];

                } else if (inputValue > 30 && inputValue <= 60) {
                    main = inputValue - 30;
                    oldData = 30 * blockValues[0];
                    BillAmount = main * blockValues[1] + FixedCharge[1] + oldData;

                }
            } else {
                if (inputValue <= 60) {
                    BillAmount = inputValue * blockValues[2] + FixedCharge[2];

                } else if (inputValue > 60 && inputValue <= 90) {
                    main = inputValue - 60;
                    oldData = 60 * blockValues[2];
                    BillAmount = main * blockValues[3] + FixedCharge[3] + oldData;

                } else if (inputValue > 90 && inputValue <= 120) {
                    main = inputValue - 90;
                    oldData60 = 60 * blockValues[2];
                    oldData90 = 90 * blockValues[3];
                    BillAmount = main * blockValues[4] + FixedCharge[4] + oldData60 + oldData90;

                } else if (inputValue > 120 && inputValue <= 180) {
                    main = inputValue - 120;
                    oldData60 = 60 * blockValues[2];
                    oldData90 = 90 * blockValues[3];
                    oldData120 = 120 * blockValues[4];
                    BillAmount = main * blockValues[5] + FixedCharge[5] + oldData60 + oldData90 + oldData120;

                } else if (inputValue > 180) {
                    main = inputValue - 180;
                    oldData60 = 60 * blockValues[2];
                    oldData90 = 90 * blockValues[3];
                    oldData120 = 120 * blockValues[4];
                    oldData180 = 180 * blockValues[5];
                    BillAmount = main * blockValues[6] + FixedCharge[6] + oldData60 + oldData90 + oldData120 + oldData180;

                }
            }

            para.innerHTML = '';
            para.innerHTML += 'Your monthly Electricity Bill';
            const div = document.getElementById("val");
            div.innerHTML = '';
            const hideval = document.getElementById('hideVal');
            hideval.value = BillAmount;
            div.innerHTML += 'RS, ' + BillAmount + ".00";
            var element = document.getElementById("myElement");
            element.classList.replace("saveBtnHide", "saveBtnShow");

        }

        // Add button click event listener here
        const button = document.getElementById("calculateButton");
        button.addEventListener("click", () => {
            var inputValue = document.getElementById('inputId').value;
            DisplayData(inputValue);
        });


    });

    const billBtn = document.getElementById("saveBill");
    billBtn.addEventListener("click", () => {
        const point = document.getElementById("inputId").value;
        const saveData = document.getElementById("hideVal").value;

        const insertQuery = "INSERT INTO history (saveData, point) VALUES (?, ?)";
        const insertValues = [saveData, point];

        connection.query(insertQuery, insertValues, function(error, results, fields) {
            if (error) {
                console.error("Error saving data:", error);
                return;
            }

            console.log("Data saved successfully!");

            // Close the database connection when done
            // connection.end();
            // app.quit(); // Quit the Electron application if you want
        });
    });


    // const billBtn = document.getElementById('saveBill');
    // billBtn.addEventListener("click", () => {
    //     const saveData = document.getElementById("val");
    //     const point = document.getElementById('inputId').value;
    //     console.log(saveData.innerHTML);
    //     console.log(point);
    // });
    // connection.end();
});