import chatbotUI from "./chatbotUI.js";

// it's not the client anymore that deals with which bot is being
// used but the server
window.addEventListener("DOMContentLoaded", function () {
    chatbotUI.init();
});
