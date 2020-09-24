var querystring = require("querystring"), fs = require("fs"), formidable = require("formidable");

function Start(response) {
    console.log("Request handler \"Start\" was called.")
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html" charset=UTF-8"/>'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload" multiple="multiple" />'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function Upload(response, request) {
    console.log("Request handler \"Upload\" was called.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, field, files) {
        fs.renameSync(files.upload.path, "C:/Users/jomini813/test.png");
        response.writeHead(200, {"Content-Type":"text/html"});
        response.write("Recived image: <br/>");
        response.write("<img src='/show' />")
        response.end();
    })
}

function Show(response) {
    console.log("Request handler \"Show\" was called.");
    fs.readFile("C:/Users/jomini813/test.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    })
}

exports.start = Start;
exports.upload = Upload;
exports.show = Show;