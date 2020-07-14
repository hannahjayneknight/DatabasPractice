import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./recipes.db");
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


const   queryPromise = function (query, ...queryPara) {
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

// shows how we can export functions as well as objects
export default Object.freeze(handler);

/*
const history = [];

const handlers = {};

const bots = {};

Object.keys(simpleBots).forEach(function (key) {
    bots[key] = simpleBots[key];
});
bots.jeff = advancedBots.newCountdownBot({
    name: "Jeff",
    from: 10,
    then: "Boom!"
});
bots.steve = advancedBots.newCountdownBot({
    name: "Steve",
    from: 10,
    then: "Boom!"
});
bots.math = advancedBots.newMathBot();

handlers.message = function (obj) {
    history.push(obj.message);
    // we use the or operator so that if the parsed in bot doesn't exist, it
    // will still do something
    const botName = obj.bot || "agreeBot";
    const response = bots[botName].response(history);
    return {
        "message": response,
        "bot": botName
    };
};

handlers.list = function () {
    return Object.keys(bots).map((k) => ({
        "key": k,
        "name": bots[k].name
    }));
};

*/
