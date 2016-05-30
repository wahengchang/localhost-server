

var static = require('node-static'),
    port = 8080,
    http = require('http');


var file = new static.Server('./', {
    cache: 3600,
    gzip: true
});

console.log("Server starts: localhost:8080")

http.createServer(function(request, response) {
    request.addListener('end', function() {
        file.serve(request, response, function(err, result) {
            if (err) {
                console.error("Error serving " + request.url + " - " + err.message);
                // Respond to the client
                response.writeHead(err.status, err.headers);
                response.end();
            } else {
                console.log("Serving file: " + request.url)
            }
        });
    }).resume();
}).listen(port);