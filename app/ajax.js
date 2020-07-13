const Ajax = Object.create(null);
// Ajax stands for asynchronous Javascript and XML

const json = (response) => response.json();

Ajax.query = function (requestObj) {
    const body = JSON.stringify(requestObj);

    return window.fetch("/", {
        // a post request means that instead of making a request in the browser
        // string, it will send a thing in order to have something sent back
        "method": "POST",
        "body": body,
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(json);
};

export default Object.freeze(Ajax);