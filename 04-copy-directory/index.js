const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'), {force: true}, () => {
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) =>{
        if(err) return console.error(err);
        console.log('Directory created successfully!');
    });
    fs.readdir(path.join(__dirname, 'files'), (err, data) => {
        if (err) {
            console.log(err)
        }  
        data.forEach((element) => {    
            fs.copyFile(path.join(__dirname, 'files', element), path.join(__dirname, 'files-copy', element), (err)=>{
                if(err) return console.error(err);
            })    
        })
    })  
});