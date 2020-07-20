import express from "express";
import handler from "../testing/handler.js";

const port = 1711;

const app = express();

app.use("/", express.static("testing"));
app.use("/", express.json());

app.post("/", function (req, res) {
    const requestObject = req.body;
    handler(requestObject).then(function (responseObj) {
        res.json(responseObj);
    });
});

app.listen(port, function () {
    console.log("Listening on port " + port);
});