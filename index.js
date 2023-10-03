import express from "express";
import bodyParser from "body-parser";
const app=express();
const port=3000;
var todayList=[];
var workList=[];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/tody",(req,res)=>{
    res.render("index.ejs",{tList:todayList});
})
app.get("/work",(req,res)=>
{
res.render("work.ejs",{wList:workList});
})
app.post("/submit",(req,res)=>
{
    var item=req.body["today"];
    var simple=item.slice(0,1).toUpperCase()+item.slice(1).toLowerCase();
    if((item.trim()!="") && (workList.includes(simple.replace(/\s+/g, ' ').trim())===false) )
    {
        workList.push(simple.replace(/\s+/g, ' ').trim());
   
    }
   res.redirect("/work");
})
app.post("/today",(req,res)=>
{
    var item=req.body["today"];
    var simple=item.slice(0,1).toUpperCase()+item.slice(1).toLowerCase();
    if((item.trim()!="") && (todayList.includes(simple.replace(/\s+/g, ' ').trim())===false) )
    {
        todayList.push(simple.replace(/\s+/g, ' ').trim());
        console.log(todayList);
    }
   
    res.redirect("/tody");
})
app.get("/",(req,res)=>
{
res.render("front.ejs");
});
app.listen(port,()=>
{
console.log(`Server is running on port ${port}`);
});
