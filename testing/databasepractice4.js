// UPDATING AND DELETING DATA IN A SQLITE DATABASE

import sqlite3 from "sqlite3";

const db =
    new sqlite3.Database("./sample.db", function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the sample database.");
});

/*
UPDATE table_name
SET column_name = value_1
WHERE id = id_value;
*/

// the following will update 'C' to 'Ansi C'
let data = ['Ansi C', 'C'];
let sql = `UPDATE langs
            SET name = ?
            WHERE name = ?`;

db.run(sql, data, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row(s) updated: ${this.changes}`);

});



/*
DELETE FROM table_name
WHERE column_name = value;
*/
// this will delete an item based on its ID
let id = 3;
// delete a row based on id
db.run(`DELETE FROM langs WHERE rowid=?`, id, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row(s) deleted ${this.changes}`);
});

db.close(function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Close the database connection.");
    });