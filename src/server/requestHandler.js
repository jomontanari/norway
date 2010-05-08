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

function writeResponse(fileName, response) {
    var body = fs.readFileSync(fileName, "UTF-8");

    response.sendHeader(200, [
        ["Content-Type", "text/html"],
        ["Content-Length", body.length]
    ]);
    response.write(body);
    response.close();
}

exports.returnHandlers = function() {
    return [[get("/"), returnIndex],
            [get("/books/list"), returnBookListing],
            [get("/cds/list"), returnCDListing],
            [get("/dvds/list"), returnDVDListing]];
};