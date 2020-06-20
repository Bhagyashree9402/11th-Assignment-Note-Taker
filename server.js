const express=require("express");
const app=express();
const PORT= process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("./public/"));

const clientroutes = require("./route/client-route");
app.use(clientroutes);

const apiroutes = require("./route/api-route");
app.use(apiroutes);

app.listen(PORT,()=>{
    console.log(`listening at http://localhost:${PORT}`);
    
})