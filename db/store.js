const util=require('util');
const fs=require('fs');

//We're making readFile into an asyncronous function by making it a promise; meaning it has to finish reading the `readFile` before moving on to anything else.
const readFileAsync=util.promisify(fs.readFile);

//Will hold the methods
class Store {
    //this here is telling it to read the information that is in that db.json file.
    read() {
        return readFileAsync("db/db.json","utf8");
    };
    //When the information is pulled from the readFileAsync, it won't be in the correct format that we want so, the below function will set it up and read from the db.json
    getNotes() {
        //the `this` is letting us access the `read()` function since it's not in the scope
        return this.read().then((notes)=> {
            console.log(notes);
            return JSON.parse(notes||"[]");
        })
    };
    
    saveNote(note) {
        this.read().then(noteList=>{
            const notes=JSON.parse(noteList||"[]");
            notes.push(note);

            fs.writeFile("db/db.json",JSON.stringify(notes),err=>{
                if(err) throw err;
                return;
        
            });
        })
        
    };

    deleteNote(id) {
        this.read().then(readList=>{
            //parsing the readList back to javascript
            let oldNotes=JSON.parse(readList||"[]");

            console.log("This is the", oldNotes);
            let position;

            for(var i=0;i<oldNotes.length;i++) {
                
                //the `console.log(oldNotes[i]);` is printing whatever poistion `i` is.
                //console.log(oldNotes[i]);
                if(id===oldNotes[i].id) {
                    //console.log("Deleted position " + i);
                    position=i;
                }
            };
            oldNotes.splice(position,1);
            console.log("This is the new notes",oldNotes);

            //rewrite the database to delete the note.
            fs.writeFile("db/db.json",JSON.stringify(oldNotes),err=>{
                if(err) throw err;
                return;
        
            });
            
        })
    }
   
};

//new Store(); so that you can be able to run all the functions on this file, if you just used `module.exports=Store;` you wouldn't be able to use all the functions and work you have done.
module.exports=new Store();

