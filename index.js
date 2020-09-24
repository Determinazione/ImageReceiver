const server = require("./server.js");
const router = require("./router.js");
const requestHandler = require("./requestHandlers.js");
const express = require("express")
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('Hello World');
})
app.listen(port, () => {
    console.log('Example app listening at ${port}');
})

var handle = {}
handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/upload"] = requestHandler.upload;
handle["/show"] = requestHandler.show;

//server.start(router.route, handle);