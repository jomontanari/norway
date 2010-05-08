var fs = require("fs"),
    sys = require("sys"),   
    nerve = require("../../libs/nerve/nerve"),
    get = nerve.get;

function returnIndex(request, response) {
    writeResponse("html/main.html", response);
}

function returnBookListing(request, response) {
    writeResponse("html/books.html", response);
}

function returnCDListing(request, response) {
    writeResponse("html/cds.html", response);
}

function returnDVDListing(request, response) {
    writeResponse("html/dvds.html", response);
}

function returnJavascriptContent(request, response) {
    writeResponse(request.url.substring(1), response, "text/javascript");
}

function returnCSSContent(request, response) {
    writeResponse(request.url.substring(1), response, "text/css");
}

function writeResponse(fileName, response, contentType) {
    sys.print("Returning filename: " + fileName + "\n");
    var body = fs.readFileSync(fileName, "UTF-8");

    response.sendHeader(200, [
        ["Content-Type", contentType || "text/html"],
        ["Content-Length", body.length]
    ]);
    response.write(body);
    response.end();
}

exports.returnHandlers = function() {
    return [[get("/"), returnIndex],
            [get("/books/list"), returnBookListing],
            [get("/cds/list"), returnCDListing],
            [get("/dvds/list"), returnDVDListing],
            [get(/.+\.js/), returnJavascriptContent],
            [get(/.+\.css/), returnCSSContent]];
};