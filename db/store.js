const util=require('util');
const fs=require('fs');

//We're making readFile into an asyncronous function by making it a promise; meaning it has to finish reading the `readFile` before moving on to anything else.
const readFileAsync=util.promisify(fs.readFile);

//Will hold the methods
class Store {
    //this here is telling it to read the information that is in that db.json file.
    read() {
        return readFileAsync("db/db.json","utf8");
    }
    //When the information is pulled from the readFileAsync, it won't be in the correct format that we want so, the below function will set it up and read from the db.json
    getNotes() {
        //the `this` is letting us access the `read()` function since it's not in the scope
        return this.read().then((notes)=> {
            console.log(notes);
            return notes;
        })
    }
};

module.exports=new Store();

