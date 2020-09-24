function Route(handle, pathName, response, request) {
    console.log("About to route a request for: " + pathName);
    if (typeof handle[pathName] === 'function') {
        return handle[pathName](response, request);
    }
    else {
        console.log("No request handler found for" + pathName);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 not found");
        response.end();
    }
}
exports.route = Route;