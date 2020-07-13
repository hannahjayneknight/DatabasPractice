const Ajax = Object.create(null);
// Ajax stands for asynchronous Javascript and XML

const json = (response) => response.json();

Ajax.query = function (requestObj) {

    // this is what we had originally
    // return Promise.resolve({
    //     "message": "It's a fake!"
    // });

    return window.fetch("/", {
        // a post request means that instead of making a request in the browser
        // string, it will send a thing in order to have something sent back
        "method": "POST",
        "body": JSON.stringify(requestObj),
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(json);
};

export default Object.freeze(Ajax);