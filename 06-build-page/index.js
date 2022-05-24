const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'project-dist'), {force: true, recursive: true}, (err) => {
    if (err) console.log(err);
    fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
        if (err) {
            console.log(err)
        }; 
        createAssets();
        createStyle();
        createHtml();
    })
}) 
/////////HTML start
function createHtml() {  
    fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, ((err, listFile) => {
        if (err) throw err;
        fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
            } 
          let template = data;
          for (element of listFile) {
            let fileName = element.name.split('.')[0];
            fs.readFile(path.join(__dirname, 'components', element.name), 'utf-8', (err, cont) => {
                if (err) {
                    console.log(err)
                }
              template = template.replace(`{{${fileName}}}`, cont);                                              
              fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, (err) => {
                if (err) {
                    console.log(err)
                }
              });       
            });  
          }
        });  
      }));
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