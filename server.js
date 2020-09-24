var http = require("http");
var url = require("url");
function Start(route, handle) {
    function OnRequest(request, response) {
        var pathName = url.parse(request.url).pathname;
        console.log("Path name is: " + pathName);
        route(handle, pathName, response, request);
    }
    http.createServer(OnRequest).listen(8888);
    console.log("Server has started");
}
exports.start = Start;