import sqlite3 from "sqlite3";

const db =
    new sqlite3.Database("../chinook.db", sqlite3.OPEN_READWRITE, function (err) {
        if (err) {
        console.error(err.message);
        }
        console.log("Connected to the chinook database.");
    });



// serialize runs each statement in a queue so that only one
// statement can be executed at a time
db.serialize(function () {
    // Queries scheduled here will be serialized.
    db.run("CREATE TABLE greetings(message text)") // Create a new table.
      .run(`INSERT INTO greetings(message)
            VALUES('Hi'),
                  ('Hello'),
                  ('Welcome')`) // Insert data into the table.
      .each(`SELECT message FROM greetings`, function (err, row) {
        if (err){
          throw err;
        }
        console.log(row.message); // Query data from the table.
      });
});

/*
HOW TO NEST THE SERIALIZE METHOD

db.serialize(() => {
  // queries will execute in serialized mode
  db.serialize(() => {
    // queries will execute in serialized mode
  });
  // queries will execute in serialized mode
});

*/




// parallelize means that queries are run in parallel but
// should only be used if the database is very large
db.parallelize(() => {
    dbSum(1, 1, db);
    dbSum(2, 2, db);
    dbSum(3, 3, db);
    dbSum(4, 4, db);
    dbSum(5, 5, db);
  });


db.close(function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Close the database connection.");
    });


function dbSum(a, b, db) {
    db.get('SELECT (? + ?) sum', [a, b], (err, row) => {
        if (err) {
        console.error(err.message);
        }
        console.log(`The sum of ${a} and ${b} is ${row.sum}`);
    });
    }

/*
HOW TO NEST THE PARALLELIZE METHOD

db.parallelize(() => {
  // queries will execute in parallel mode
  db.parallelize(() => {
    // queries will execute in parallel mode
  });
  // queries will execute in parallel mode
});

*/