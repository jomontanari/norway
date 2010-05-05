var fs = require("fs"),
    sys = require("sys");

var handlers = initHandlers();

function initHandlers() {
    sys.print("Initialising handlers\n");
    
    var handlers = [];

    handlers["/books/list"] = returnBookListing;
    handlers["/cds/list"] = returnCDListing;
    handlers["/dvds/list"] = returnDVDListing;

    return handlers;
}

function returnIndex(request, response) {
    writeResponse("../html/main.html", response);
}

function returnBookListing(request, response) {
    writeResponse("../html/books.html", response);
}

function returnCDListing(request, response) {
    writeResponse("../html/cds.html", response);
}

function returnDVDListing(request, response) {
    writeResponse("../html/dvds.html", response);
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

exports.returnHandler = function(uri) {
    sys.print('Locating handler for uri: ' + uri + "\n");
//    var handlers = initHandlers();

    var handler =  handlers[uri];

    if (handler == null) {
        sys.print("No handler found for uri, using default");

        handler = returnIndex;
    }

    return handler;
};