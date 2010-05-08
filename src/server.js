var sys = require('sys'),
    nerve = require('../libs/nerve/nerve'),
    requestHandler = require("./server/requestHandler");

nerve.create(requestHandler.returnHandlers()).listen(8000);

sys.puts('Server running at http://127.0.0.1:8000/');