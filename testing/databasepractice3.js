// INSERTING DATA INTO A TABLE
// NB need to find a way of making sure a table doesn't already exist

import sqlite3 from "sqlite3";

// NB the database will be created if it does not already exist
// but it will throw an error if you try to open it here
const db =
    new sqlite3.Database("./sample.db", function (err) {
        if (err) {
        console.error(err.message);
        }
        console.log("Connected to the sample database.");
});

// creates a table which will store programming languages
// running this file with only this line of code (as well
// as opening and closing the database) is needed before you
// db.run('CREATE TABLE langs(name text)');

// insert one row into the langs table
db.run(`INSERT INTO langs(name) VALUES(?)`, ['C'], function(err) {
if (err) {
    return console.log(err.message);
}
// get the last insert id
console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// insert multiple rows at once
// to do this, we use map() to map each element in the array to ?
/*
INSERT INTO table_name(column_name)
VALUES(value_1), (value_2), (value_3),...
*/
let languages = ['C++', 'Python', 'Java', 'C#', 'Go'];
let placeholders = languages.map((language) => '(?)').join(',');
let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;

db.run(sql, languages, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows inserted ${this.changes}`);
  });


db.close(function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Close the database connection.");
});