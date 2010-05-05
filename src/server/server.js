var sys = require('sys'),
    http = require('http'),
    requestHandler = require("./requestHandler");

http.createServer(function (req, res) {
    requestHandler.returnHandler(req.url).apply(this, [req, res]);
}).listen(8000);

sys.puts('Server running at http://127.0.0.1:8000/');