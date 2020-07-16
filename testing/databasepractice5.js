// PICKING A RANDOM WORD AND EXPORTING IT TO DISPLAY ON THE SCREEN

import sqlite3 from "sqlite3";

const db =
    new sqlite3.Database("./sample.db", function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the sample database.");
});

// finds a random word from the ones being tested
// (depends on level - NEED TO CHANGE LEVEL FOR THIS)
let level = 1;
const queryWord = `SELECT * FROM (
    SELECT * FROM langs ORDER BY langID LIMIT ${level}
    ) ORDER BY RANDOM() LIMIT 1;`;

const dbObj = {};
db.serialize(function () {
    db.get(queryWord, [], function (err, row) {
        if (err) {
            return console.error(err.message);
        }
        // adds the random to the database object
        dbObj.word = row;
    });
});


db.close(function (err) {
    if (err) {
        console.error(err.message);
    }

    console.log("Close the database connection.");
    console.log(dbObj);
});

/*
FINDS THE LENGTH OF THE DATABASE

// counts the number of rows in the database to find the length
const queryLength = `SELECT count(*) AS rowCount FROM langs`;

db.get(queryLength, [], function (err, row) {
        if (err) {
            return console.error(err.message);
        }
        // adds the length of the database to the database object
        dbObj.length = row.rowCount;
    })
*/