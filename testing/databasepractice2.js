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
    db.run("CREATE TABLE greetings(message text)")
      .run(`INSERT INTO greetings(message)
            VALUES('Hi'),
                  ('Hello'),
                  ('Welcome')`)
      .each(`SELECT message FROM greetings`, function (err, row) {
        if (err){
          throw err;
        }
        console.log(row.message);
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

db.close(function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Close the database connection.");
    });