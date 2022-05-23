const fs = require('fs');
const path = require('path');

const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');
const write = fs.createWriteStream(bundleFile);  
fs.readdir(path.join(__dirname, 'styles'), (err, data) => {
    if (err) {
        console.log(err)
    }      
    data.forEach((element) => {    
        if(path.extname(path.join(__dirname, "styles", element)) === '.css')  {
            const readFile = fs.createReadStream(path.join(__dirname, 'styles', element));
            readFile.on('data', (res) => {
            fs.appendFile(bundleFile, res, ()=>{})
            })
        }
    })
})