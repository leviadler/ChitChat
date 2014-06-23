var fs = require("fs");

function route(request, response) {
  if (request.url === "/") {
    fileServer('public/index.html', response);
  } else {
    fileServer(request.url.substring(1), response);
  }
}

var fileServer = function(filePath, response) {
  console.log(filePath);
  fs.readFile(filePath, 
              {encoding: 'utf8'},
              function(err, data) {
                if(err) {
                  response.writeHead(404, {"Content-Type": "text/plain"});
                  response.write("Content not found 404!");
                  response.end();
                } else {
                  response.writeHead(200, {"Content-Type": 'text/html'});
                  response.write(data);
                  response.end(); 
                }
              });
            }


exports.route = route;