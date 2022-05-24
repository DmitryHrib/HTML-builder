const fs = require('fs');
const path = require('path');
const process = require('process');

let file = fs.createWriteStream(path.join(__dirname, './text.txt'), 'utf-8');
process.stdout.write('Прывітанне сябар. Калі ласка, увядзі слова на беларускай мове:\n');

process.stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        process.stdout.write('Да пабачэння!');
        process.exit();
    }
    file.write(data);
})

process.on('SIGINT', () => {
    process.stdout.write('Да пабачэння!')
    process.exit()
})