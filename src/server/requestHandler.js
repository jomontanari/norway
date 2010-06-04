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
    var books = [
        {
            id: 1,
            image: "../images/the_definitive_guide.jpg",
            name: "Javascript: The definitive guide",
            price: 42
        },
        {
            id: 2,
            image: "../images/for_web_devs.jpg",
            name: "Javascript: For web developers",
            price: 42
        },
        {
            id: 3,
            image: "../images/missing_manual.jpg",
            name: "Javascript: The missing manual",
            price: 22
        },
        {
            id: 4,
            image: "../images/the_good_parts.jpg",
            name: "Javascript: The good parts",
            price: 12
        }
    ];

    sendResponse(response, JSON.stringify(books), 200, 'text/plain', "UTF-8");
}

function returnCDListing(request, response) {
    var cds = [
        {
            id: 1,
            image: "../images/acdc.jpg",
            name: "AC/DC : Iron Man 2",
            price: 12
        },
        {
            id: 2,
            image: "../images/muse.jpg",
            name: "Muse: Absolution",
            price: 10
        },
        {
            id: 3,
            image: "../images/iron_maiden.jpg",
            name: "Iron Maiden: Brave New World",
            price: 5
        }
    ];
    sendResponse(response, JSON.stringify(cds), 200, 'text/plain', 'UTF-8');
}

function returnDVDListing(request, response) {
    var dvds = [
        {
            id: 1,
            image: "../images/sherlock_holmes.jpg",
            name: "Sherlock Holmes",
            price: 9
        },
        {
            id: 2,
            image: "../images/avatar.jpg",
            name: "Avatar",
            price: 9
        },
        {
            id: 3,
            image: "../images/2012.jpg",
            name: "2012",
            price: 9
        }
    ];
    sendResponse(response, JSON.stringify(dvds), 200, 'text/plain', 'UTF-8');
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

        sendResponse(response, data, responseCode, contentType, encoding);
    });
}

function sendResponse(response, data, responseCode, contentType, encoding) {
    response.sendHeader(responseCode, [
        ["Content-Type", contentType],
        ["Content-Length", data.length]
    ]);
    response.write(data, encoding);
    response.end();

    sys.puts(contentType);
}

