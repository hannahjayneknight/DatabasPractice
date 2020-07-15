// PICKING A RANDOM WORD AND EXPORTING IT TO DISPLAY ON THE SCREEN

import sqlite3 from "sqlite3";

const db =
    new sqlite3.Database("./sample.db", function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the sample database.");
});

// first you find the length of the database
const queryLength = `SELECT count(*) AS rowCount FROM langs`;


var dbLength = [];
db.serialize(() => {
    db.get(queryLength, [], function (err, row) {
        if (err) {
            return console.error(err.message);
        }
        dbLength.push(row);
            // ? console.log("The length of the database is: " + dbLength)
            // : console.log(`No length found`);
    });
});



db.close(function (err) {
    if (err) {
        console.error(err.message);
    }
    
    console.log("Close the database connection.");
    console.log(dbLength);
});


/*
TRYING TO SAVE QUERY AS A VARIABLE

async function f() {
    var rowCount =
    await db.get(queryLength, [], function (err, row) {
    if (err) {
        return console.error(err.message);
    }
    return row
        ? console.log("The length of the database is: " + row.rowCount)
        : console.log(`No length found`);
    });
    console.log(db);
}

f();
*/

/*
// then you can find a random word
const langID = F.getRandomInt(0, obj.dbLength);
const queryWord = `SELECT langID langID,
name name
FROM langs
WHERE langID  = ?`;
db.get(queryWord, [langID], function (err, row) {
    if (err) {
      return console.error(err.message);
    }
    return row
      ? console.log(row.rowCount)
      : console.log(`No language found with the id ${langID}`);
});
*/


onrequest( () =>
{
    dblookup( () =>
    {
        sendresponsetoclient()
    })
})