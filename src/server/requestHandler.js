var fs = require("fs"),
        sys = require("sys"),
        nerve = require("../../libs/nerve/nerve"),
        get = nerve.get;

exports.returnHandlers = function() {
    return [[get("/"), returnIndex],
            [get("/books/list"), returnBookListing],
            [get("/cds/list"), returnCDListing],
            [get("/dvds/list"), returnDVDListing],
            [get(/.+\.jpg/), returnJpegContent],
            [get(/.+\.js/), returnJavascriptContent],
            [get(/.+\.css/), returnCSSContent]];
};

function returnIndex(request, response) {
    writeTextResponse("html/main.html", response, 'text/html');
}

function returnBookListing(request, response) {
    writeTextResponse("html/books.html", response, 'text/html');
}

function returnCDListing(request, response) {
    writeTextResponse("html/cds.html", response, 'text/html');
}

function returnDVDListing(request, response) {
    writeTextResponse("html/dvds.html", response, 'text/html');
}

function returnJavascriptContent(request, response) {
    writeTextResponse(request.url.substring(1), response, "text/javascript");
}

function returnCSSContent(request, response) {
    writeTextResponse(request.url.substring(1), response, "text/css");
}

function returnJpegContent(request, response) {
    writeBinaryResponse(request.url.substring(1), response, "image/jpeg");
}

function writeTextResponse(fileName, response, contentType) {
    streamFile(fileName, 'UTF-8', response, contentType);
}

function writeBinaryResponse(fileName, response, contentType) {
    streamFile(fileName, 'binary', response, contentType);
}                      

function streamFile(fileName, encoding, response, contentType) {
    sys.log("Returning filename: " + fileName + "\n");

    fs.readFile(fileName, encoding, function(err, data) {
        var responseCode = 200;

        if (err) {
            responseCode = 404;
            data = "Unable to find file : " + fileName;
        }

        response.sendHeader(responseCode, [
            ["Content-Type", contentType],
            ["Content-Length", data.length]
        ]);
        response.write(data, encoding);
        response.end();
    });
}

