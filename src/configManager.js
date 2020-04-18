const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname,'../config.json');

const read = () => {
    if( !fs.existsSync(configFile) ) return {};

    try{
        return JSON.parse(fs.readFileSync(configFile));
    }catch (e) {
        console.log('Error reading config file: ', e);
        return {};
    }
};

const save = async (data) => {
    return new Promise((resolve, reject) => {
        try{
            fs.writeFile(configFile, JSON.stringify(data), (error) => {
               if (error) reject(error);
               console.log('resolve');
               resolve();
            });
        }catch (e) {
            console.log('Error saving config file: ', e);
            reject(e);
        }
    });
};
