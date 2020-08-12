// LISTING ALL THE TABLES IN THE DATABASE
import sqlite3 from "sqlite3";

const H = Object.create(null);

H.infoTables = function (cb) {

    const db = new sqlite3.Database("./sample.db", function (err) {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the sample database.");
    });

    const queryTables = `SELECT name FROM sqlite_master
    WHERE type='table'
    ORDER BY name;`;

    const dbObj = {};
    db.serialize(function () {
        db.all(queryTables, [], function (err, row) {
            if (err) {
                return console.error(err.message);
            }
            dbObj.tables = row;
            dbObj.noTables = row.length;
            // prints the name of each table
            dbObj.tables.forEach((el) => console.log(el.name));
            // prints the array containing each table name
            console.log(dbObj.tables);
            console.log(dbObj.noTables);
            console.log(row);
        });
    });

    db.close(function (err) {
        if (err) {
            console.error(err.message);
        }

        console.log("Close the database connection.");
    });

};

// adding a quiz to the database
H.addQuiz = function (tableName, cb) {
    const db = new sqlite3.Database("./sample2.db", function (err) {
        if (err) {
            console.error(err.message);
        }
        // console.log("Connected to the sample database.");
    });

    const createTable = `CREATE TABLE ${tableName} (
        "question" TEXT NOT NULL,
        "answer" TEXT NOT NULL
    );`;

    const dbObj = {};
    db.serialize(function () {
        db.run(createTable, [], function (err, row) {
            if (err) {
                return console.error(err.message);
            }
            // dbObj.word = row;
            console.log(dbObj);
            console.log(row);
        });
    });

    db.close(function (err) {
        if (err) {
            console.error(err.message);
        }
        cb(dbObj);
        // console.log("Close the database connection.");
    });

};

export default Object.freeze(H);