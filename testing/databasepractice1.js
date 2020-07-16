// QUERYING DATA FROM AN SQLITE DATABASE

import sqlite3 from "sqlite3";
// other method of writing this:
// const sqlite3 = require('sqlite3').verbose();



// returns a database object and opens the database connection automatically
// callback function for if the database does not open
const db =
    new sqlite3.Database("./sample.db", sqlite3.OPEN_READWRITE, function (err) {
        if (err) {
        console.error(err.message);
        }
        console.log("Connected to the chinook database.");
    });



// .all() retrieves all rows and places them in the memory
// which is why forEach is used
let sql = `SELECT DISTINCT Name name FROM playlists
ORDER BY name`;

db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.name);
    });
  });



// .get() is used when you know the query results contains zero rows or one row
let sql2 = `SELECT PlaylistId id,
Name name
FROM playlists
WHERE PlaylistId  = ?`;
let playlistId = 3;

db.get(sql2, [playlistId], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row
      ? console.log(row.id, row.name)
      : console.log(`No playlist found with the id ${playlistId}`);

  });



// .each() executes a query for each row in the resulting set
let sql3 = `SELECT FirstName firstName,
                  LastName lastName,
                  Email email
            FROM customers
            WHERE Country = ?
            ORDER BY FirstName`;

db.each(sql3, ['USA'], (err, row) => {
    if (err) {
        throw err;
    }
    console.log(`${row.firstName} ${row.lastName} - ${row.email}`);
    });



db.close(function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Close the database connection.");
    });
