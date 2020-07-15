import sqlite3 from "sqlite3";
// other method of writing this:
// const sqlite3 = require('sqlite3').verbose();

// returns a database object and opens the database connection automatically
// callback function for if the database does not open
const db =
new sqlite3.Database("./recipes.db", sqlite3.OPEN_READWRITE, function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the chinook database.");
  });



const handlers = Object.create(null);



const handler = function (obj) {

    return Promise.resolve(handlers[obj.type]);

};

handlers.listRecipes = function (obj) {
    const query = (
        "SELECT recipes.*, categories.category " +
        "FROM recipes LEFT JOIN categories " +
        "ON recipes.fkCategory = categories.pkCategories " +
        "WHERE category = ?"
    );
    return queryPromise(query, obj.message);
};

handlers.newRecipe = function (obj) {
    const query = (
        "INSERT into recipes " +
        "VALUES (null, ?, ?)" // first ? is the name of the recipe the other is
        // the key for the category
    );
    return actionPromise(query, obj.recipe, obj.fkCategory);
};

const actionPromise = function (query, ...queryPara) {

    return new Promise(function (resolve, reject) {
        db.run(query, queryPara, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.changes);
            db.close();
        });
    });

};


const queryPromise = function (query, ...queryPara) {
    return new Promise(function (resolve, reject) {
        const db = new sqlite3.Database("./recipes.db");
        db.run(query, queryPara, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });

};

export default Object.freeze(handler);
