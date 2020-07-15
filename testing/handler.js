const handlers = Object.create(null);

handlers.findword = (
    "SELECT "
)

export default Object.freeze(handlers);
/*

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
*/
