const simpleBots = Object.create(null);

const agreeOptions = [
    "Yes!",
    "My Man!",
    "Looking Good!"
];
simpleBots.agreeBot = {
    "name": "Agree Bot",
    "response": function () {
        return agreeOptions[Math.floor(Math.random() * agreeOptions.length)];
    }
};

simpleBots.grumpyBot = {
    "name": "Grumpy Bot",
    "response": () => "No!"
};

simpleBots.reflectBot = {
    "name": "Reflect Bot",
    "response": function (history) {
        return `Hmm, "${history[history.length - 1]}"? Interesting`;
    }
};

simpleBots.pauseBot = {
    "name": "Pause Bot",
    "response": function (history) {
        const lastButOne = history[history.length - 2];
        return lastButOne;
    }
};

export default Object.freeze(simpleBots);
