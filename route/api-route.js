const express = require("express");
const router=express.Router();
const fs= require("fs");
const util=require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync =util.promisify(fs.writeFile);

//endpoint /api/notes
//GET request-should read the db.json file and return all saved notes as json 
router.get("/api/notes",async(req,res)=>{
    let note = await readFileAsync("./db/db.json","utf-8");
    note=JSON.parse(note);
    res.json(note);

})

//endpoint /api/notes
//POST request-should receive a new note to save on the request body,
//add it to the db.json file,and then return the new note to the client.
router.post("/api/notes",async(req,res)=>{
    let note = await readFileAsync("./db/db.json","utf-8");
    note=JSON.parse(note);

    const newnote=req.body;
    newnote.id=note.length+1;
    note.push(newnote);

    await writeFileAsync("./db/db.json",JSON.stringify(note,null,2));
    res.json(note);

 })

 //endpoint /api/notes
 //DELETE request- Should receive a query parameter containing the id of a note to delete
 // In order to delete a note, you'll need to read all notes from the db.json file, 
 //remove the note with the given id property, and then rewrite the notes to the db.json file.
 router.delete("/api/notes/:id",async(req,res)=>{
    let note = await readFileAsync("./db/db.json","utf-8");
    note=JSON.parse(note);

    const deletenote = req.params.id;
     
    console.log(note);

    
    
   note= note.filter(function (value,index){
        console.log(value);
        // if (value.id == deletenote){
        //      note.splice(index,1);
        // }
        return (value.id != deletenote)
        
    });
    console.log(note);
    await writeFileAsync("./db/db.json",JSON.stringify(note,null,2));
    res.json(note);


 })









module.exports=router;