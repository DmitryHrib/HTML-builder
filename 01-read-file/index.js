const fs = require('fs');
const path = require('path');

const stream = fs.ReadStream(path.join(__dirname, './text.txt'), 'utf-8');
stream.pipe(process.stdout);


