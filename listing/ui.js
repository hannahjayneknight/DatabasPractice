import F from "./usefulfunctions.js";
// import H from "./databasepractice6.js";
const UI = Object.create(null);
const el = (id) => document.getElementById(id);

UI.init = function () {
};

// THE TIMER
UI.startTimer = function () {
    const mins = 0.5;
    const now = Date.now();
    const deadline = mins * 60 * 1000 + now;

    let computerFunction = setInterval(function () {
        el("computerTimer").textContent = F.getRandomInt(0, 36);
    }, F.getRandomInt(1500, 5000));

    let timerID = setInterval(function () {
        let currentTime = Date.now();
        let distance = deadline - currentTime;
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (parseInt(seconds) === 0) {
            clearInterval(timerID);
            clearInterval(computerFunction);


        } else {
            el("timer").textContent = seconds;
        }
    }, 500);

};

UI.findWinner = function () {
    let currentBoard = [
        2, 3, 2, 2, 2, 2,
        2, 3, 2, 2, 2, 2,
        2, 3, 2, 2, 2, 2,
        3, 3, 3, 4, 4, 4,
        3, 3, 3, 4, 4, 4,
        3, 3, 3, 4, 4, 4
    ];
    let orderedBoard = currentBoard.concat().sort((a, b) => a - b);
    // let currentBoard = F.randomBoard();
    // let orderedBoard = currentBoard.concat().sort((a, b) => a - b);
    // first finds the score of each player
    // scores [0] = score of player 1 etc
    let scores = [0, 0, 0, 0];
    currentBoard.forEach(function (element) {
        if (element === 1) {
            scores[0] += 1;
        } else if (element === 2) {
            scores[1] += 1;
        } else if (element === 3) {
            scores[2] += 1;
        } else if (element === 4) {
            scores[3] += 1;
        }
    });

    // orders the scores from lowest to highest
    let ordered = scores.concat().sort((a, b) => a - b);

    // places is an array containing the player numbers in ascending order
    // of placing. If there was a draw, it will be a nested array.
    // element 0 corresponds to fourth place, element 3 is 1st
    let places = [];
    F.sequence(4).forEach(function (element) {
        // gets the player number/ numbers of those who came that place
        // .map() is to convert the index to the player number
        places.push(F.getAllIndexes(scores, ordered[element]).map((x) => x + 1));
    });
    el("places").textContent = F.uniq(places);
    console.log(F.uniq(places));
    el("currentBoard").innerHTML = orderedBoard;
    el("scores").innerHTML = scores;


};


export default Object.freeze(UI);