const fs = require('fs');
const formidable = require('formidable');

function start(response) {
  console.log('Request handler START was called.');

  const body = `
    <html>  
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        </head>
        <body>
            <form action="/upload" enctype="multipart/form-data" method="post">
                <input type="file" name="upload">    
                <input type="submit" value="Upload file" />
            </form>
        </body>
    </html>
  `;

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log('Request handler UPLOAD was called.');

  const form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(request, function(error, fields, files) {
    console.log('parsing done');


    fs.rename(files.upload.path, 'test.png', function(error) {
      if(error) {
        fs.unlink('test.png', (err) => {
          if(err) throw err;
        });
        fs.rename(files.upload.path, 'test.png', (err) => {
          if(err) throw err;
        });
      }
    });

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('Received image: <br/>');
    response.write('<img src="/show" />');
    response.end();
  });
}

function show(response) {
  console.log('Request handler SHOW was called');
  response.writeHead(200, { 'Content-Type': 'image/png' });
  fs.createReadStream('./test.png').pipe(response);
}


exports.start = start;
exports.upload = upload;
exports.show = show;
