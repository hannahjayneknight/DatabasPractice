import Ajax from "./ajax.js";

const UI = Object.create(null);
const el = (id) => document.getElementById(id);



UI.init = function () {
    const requestBox = el("requestBox");
    const responseBox = el("responseBox");
    const display = el("display");

    el("user-input").onkeydown = function (event) {
        // Do nothing special if the skift or enter keys are pressed.
        if (event.key !== "Enter" || event.shiftKey) {
            return;
        }

        const request = {
            "type": "lists",
            "bot": "grumpyBot",
            "message": el("user-input").value
        };
        requestBox.value = JSON.stringify(request);

        // Ajax has a method called "query" that can send an object
        // the server might not ever return, it could be broken or time out etc
        // response is a "promise" for an object, not an object itself
        const response = Ajax.query(request);
        // Promise.resolve({"message": "It's a fake!"});

        // sets the content of the responseBox
        response.then(function (object) {
            responseBox.textContent = JSON.stringify(object);
        });

        // "then" is a method that says, once we've got the promise, what
        // do we do with it? We pass it a function/ callback.
        // Note that responseMessage returns another promise.
        const responseMessage = response.then((res) => res.message);

        // I don't have a responseMessage, but if I did...
        responseMessage.then(function (msg) {
            display.textContent = msg;
        });

        event.preventDefault();
    };
};

export default Object.freeze(UI);