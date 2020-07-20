import F from "./usefulfunctions.js";
import H from "./databasepractice6.js";
const UI = Object.create(null);
const el = (id) => document.getElementById(id);



UI.init = function () {
    H.infoTables(function (obj) {
        console.log(obj);
    });

    F.sequence(36).forEach(function (element) {
        // makes a p element which will represent each quiz
        const publicQuiz = document.createElement("p");
        // CHANGE ELEMENT TO THE NAME OF THE QUIZ?
        publicQuiz.setAttribute("id", "Public quiz " + element);
        publicQuiz.setAttribute("class", "Public Quizzes");
        publicQuiz.innerHTML = "";
        el("List of quizzes").append(publicQuiz);
    });

};

export default Object.freeze(UI);