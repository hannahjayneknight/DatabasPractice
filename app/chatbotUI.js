import Ajax from "./ajax.js";

const chatbotUI = Object.create(null);

chatbotUI.init = function () {
    // I always define this helpful shorthands.
    const el = (id) => document.getElementById(id);
    const cloneTemplate = (id) => document.importNode(el(id).content, true);

    let bot;

    const composition = el("composition");
    const messages = el("messages");
    el("send-button").onclick = function () {
        const myMessage = composition.value;
        composition.focus();
        if (myMessage === "") {
            return;
        }
        composition.value = "";
        // storing history on the server side so do not need the previous code
        // instead, the "then" function will be called to return the message
        Ajax.query({
            "type": "message",
            "bot": bot.key,
            "message": myMessage
        }).then(function (response) {
             // I prefer this method, using templates.
            const myTemplate = cloneTemplate("my-message");
            myTemplate.querySelector("[name=message]").textContent = myMessage;
            messages.appendChild(myTemplate);

            const theirTemplate = cloneTemplate("their-message");
            const theirMessage = theirTemplate.querySelector("[name=message]");
            theirMessage.textContent = response.message;
            messages.appendChild(theirTemplate);
            theirMessage.scrollIntoView();
        });
    };

    composition.onkeydown = function (event) {
        // Shift-Enter is allowed for multi-line messages
        if (event.key !== "Enter" || event.shiftKey) {
            return; // do nothing special
        }
        el("send-button").click();
    };

    Ajax.query({"type": "list"}).then(function (bots) {
        bots.forEach(function (b) {
            const botTemplate = cloneTemplate("bot-listing");
            const botName = botTemplate.querySelector("[name=bot]");
            botNames.push(botName);
            botName.textContent = b.name;
            botList.appendChild(botTemplate);
            botName.onclick = function () {
                bot = b;
                botTitle.textContent = `Chatting with ${b.name}`;
                botNames.forEach(function (bn) {
                    bn.setAttribute("aria-selected", false);
                });
                botName.setAttribute("aria-selected", true);
            };
            botName.onkeydown = function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    botName.click();
                }
            };
        });
        bot = bots[0];
        console.log(bot);
        botNames[0].onclick();
    });

    const botList = el("bot-list");
    const botTitle = el("bot-title");
    const botNames = [];

};

export default Object.freeze(chatbotUI);
