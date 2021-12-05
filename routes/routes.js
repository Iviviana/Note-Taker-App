// Required dependencies

//Path is a node dependency, but we still need to require it to use it
const path=require('path');
//lets us make post\get\delete requests
const router=require('express').Router();

//Notes file
router.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//Index file
router.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"));
});

module.exports=router;