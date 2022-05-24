const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) =>{
//     if (err) {
//         console.log(err)
//     } 
// });
fs.rm(path.join(__dirname, 'project-dist'), {force: true, recursive: true}, (err) => {
    if (err) console.log(err);
    fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
        if(err) return console.error(err);

        createAssets();
        createStyle();
        createHtml();
    })
}) 
/////////HTML start
function createHtml() { 
    fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), fs.constants.COPYFILE_FICLONE, (err) => {
        if (err) {
            console.log(err)
        } 

    })
}
/////////HTMl end
/////////Style start
function createAssets() {     
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
        if (err) {
            console.log(err)
        }    
    })
    fs.readdir(path.join(__dirname, 'assets'), (err, assets) => {
        if (err) {
            console.log(err)
        }  
        assets.forEach((assetsPap) => {    
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', assetsPap), {recursive: true}, (err) => {
                if (err) {
                    console.log(err)
                }     
            })
            fs.readdir(path.join(__dirname, 'assets', assetsPap), (err, pap) => {
                if (err) {
                    console.log(err)
                } 
                pap.forEach((assetsFile) => {
                    fs.copyFile(path.join(__dirname, "assets", assetsPap, assetsFile), path.join(__dirname, "project-dist", "assets", assetsPap, assetsFile), fs.constants.COPYFILE_FICLONE, (err)=>{
                        if (err) {
                            console.log(err)
                        }
                    });
                })
            });
        });
    });
}
/////////Assets end
/////////Style start
function createStyle() {
    const bundleFile = path.join(__dirname, 'project-dist', 'style.css');
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
        });
    });
}
/////////Style end