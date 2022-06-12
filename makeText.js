/** Command-line tool to generate Markov text. */

const markovMachine = require("./markov");
const fs = require("fs");
const axios = require("axios");
const argv = process.argv;

function generateMarkovText(text){
    let generated_text = new markovMachine.MarkovMachine(text);
    return generated_text.makeText();
}

function textFromFile(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            // handle possible error
            console.error(`Error reading ${err["path"]}:`);
            console.error(err);
            process.exit(1);
        }else{
            let text = generateMarkovText(data);
            console.log(text);
        }
    });
}

async function textFromURL(url){
    try {
        const response = await axios.get(url);
        let text = generateMarkovText(response.data);
        console.log(text);
    } catch (err){
        // handle possible error
        console.error(`Error fetching ${url}:`);
        console.error(err);
        process.exit(1);
    }
}


let source_method = argv[2];
let source_text = argv[3];

if(source_method == "file"){
    textFromFile(source_text);
}else if(source_method == "url"){
    textFromURL(source_text);
}else{
    console.error(`This is not a method: ${source_method}`);
    process.exit(1);
}