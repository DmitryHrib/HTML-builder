const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), 'utf-8', (err, res) => {
    if (err) {
        console.log(err)
    }
    res.forEach((element) => {       
        const file = path.extname(path.join(__dirname, 'secret-folder', element));
        const nameFile = path.basename(path.join(__dirname, 'secret-folder', element), file);        
        fs.stat(path.join(__dirname, 'secret-folder', element), (err, stats) => {
            if (err) {
                console.log(err)
            }    
            if (stats.isFile()) {
                let sizeFile = stats.size;
                console.log(`${nameFile} - ${file} - ${sizeFile} bt`);
            }    
        });    
    });   
});