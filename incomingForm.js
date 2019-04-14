const formidable = require('formidable'),
  http = require('http'),
  sys = require('sys');


http.createServer((req, res) => {
    if(req.url == '/upload' && req.methodtoLowerCase() == 'post') {
        //parse file upload
        const form = new formidable.IncomingForm();
        form.parse(req, function(error, fields, files) {
            res.writeHead(200, { content-type})
        });
    }
});