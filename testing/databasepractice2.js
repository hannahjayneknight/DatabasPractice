import sqlite3 from "sqlite3";

const db =
    new sqlite3.Database("./chinook.db", sqlite3.OPEN_READWRITE, function (err) {
        if (err) {
        console.error(err.message);
        }
        console.log("Connected to the chinook database.");
    });

db.close(function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Close the database connection.");
    });