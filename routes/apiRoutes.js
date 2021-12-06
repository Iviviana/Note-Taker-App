//Required dependencies
const router=require('express').Router();
const store=require('../db/store');
const notes=require('../db/db.json');
const uniqid=require('uniqid');

router.get("/notes", (req,res)=>{
    //we call `getNotes` again so we can send to the frontend
    store.getNotes().then((notes)=> {
        return res.json(notes);
    }).catch((err)=> res.status(500).json(err)); //500 error is backend, 400 is frontend
});

//For a new note
router.post("/notes", (req,res)=>{
  
  let newNote=req.body;
  newNote.id=uniqid();
  
  
  store.saveNote(newNote);
  return res.json(newNote);
});

//Delete an existing note
// router.delete("/notes/id:");





module.exports=router;