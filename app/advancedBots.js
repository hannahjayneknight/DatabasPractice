/**
 * The Advanced Bots in this file are all generated
 * with the factory functions
 */
const advancedBots = Object.create(null);

advancedBots.newCountdownBot = function (spec) {
    const {name, then, after} = spec;
    let {from} = spec;
    return {
        "name": "Countdown " + name,
        "response": function () {
            if (from === 0) {
                from = -1;
                return then;
            }
            if (from === -1) {
                return after || "...";
            }
            const message = `${from}!`;
            from = from - 1;
            return message;
        }
    };
};

advancedBots.newMathBot = function () {

    const hiddenFunction = function (x) {
        return Math.sin(2 * x);
    };

    return {
        "name": "MathBot",
        "response": function (history) {
            const last = history[history.length - 1];
            return hiddenFunction(last);
        }
    };
};

export default Object.freeze(advancedBots);
