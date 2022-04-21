var path = require("path");
const mime = require('mime');
var fs = require("fs");
const axios = require('axios');


this.injection = function (filename) {
    return new Promise((resolve, reject) => {
        var filepath = path.join(__dirname, filename);
        //console.log("reading file from" + (filepath));
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) return reject(err);
            console.log("1 " + data);
            resolve(data);
        });
    });
}

this.externalInjection = function (filename) {
    return new Promise((resolve, reject) => {
        //console.log("reading file from" + process.cwd());
        var filepath = path.join(process.cwd(), filename);
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

this.getFileInBase64 = function (filename) {
    return new Promise((resolve, reject) => {
        try {
            filename = path.join(process.cwd(), filename);
            // get the mimetype
            const fileMime = mime.getType(filename);
            var file = fs.readFileSync(filename, { encoding: 'base64' });
            resolve(`data:${fileMime};base64,${file}`);
        } catch (error) {
            reject(error);
        }
    });
}

const getBreeds = async (Msg) => {
    try {
        let domain = "https://is-spam-or-not-api.herokuapp.com/?input_sms=";
        let z = domain+Msg;
        // return await axios.get(`https://jsonplaceholder.typicode.com/users`)
        // return await axios.get(`https://is-spam-or-not-api.herokuapp.com/?input_sms=you%20win%20this%20lotery%20click%20the%20button%20below`)
        return await axios.get(z);
    } catch (error) {
        console.error(error)
    }
}

this.checkSpam = async function (Msg) {
    console.log("CheckSpam Function Called, the message is \n" , Msg);
    const breeds = await getBreeds(Msg)
    // console.log(breeds.data);
    if (breeds.data.message) {
        // console.log(breeds.data.message);
        return JSON.stringify(breeds.data);
        // return ('</span > <span style="color:#e6db74">${</span>Object.< span style = "color:#a6e22e" > entries</span > (<span style="color:#a6e22e">breeds</span>.< span style = "color:#a6e22e" > data</span >.< span style = "color:#a6e22e" > message</span >).< span style = "color:#a6e22e" > length</span ><span style="color:#e6db74">}</span><span style="color:#e6db74"> ')
        // console.log(Got </span > <span style="color:#e6db74">${</span>Object.< span style = "color:#a6e22e" > entries</span > (<span style="color:#a6e22e">breeds</span>.< span style = "color:#a6e22e" > data</span >.< span style = "color:#a6e22e" > message</span >).< span style = "color:#a6e22e" > length</span ><span style="color:#e6db74">}</span><span style="color:#e6db74"> breeds)
    }

    // return new Promise((resolve, reject) => {
    //     try {
    //         filename = path.join(process.cwd(), filename);
    //         // get the mimetype
    //         const fileMime = mime.getType(filename);
    //         var file = fs.readFileSync(filename, { encoding: 'base64' });
    //         resolve(`data:${fileMime};base64,${file}`);
    //     } catch (error) {
    //         reject(error);
    //     }
    // });
    // return "Not Spam";
}

this.delay = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

this.saveFileFromBase64 = (base64Data, name, type) => {
    console.log("save file called")
    let extension = mime.getExtension(type)
    try {
        fs.writeFileSync(path.join(process.cwd(), name + "." + extension), base64Data, 'base64')
    } catch (error) {
        console.error("Unable to write downloaded file to disk")
    }
}