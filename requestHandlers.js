function start() {
  console.log('Request hanlder START was called.');
}

function upload() {
  console.log('Request handler UPLOAD was called.');
}


exports.start = start;
exports.upload = upload;
