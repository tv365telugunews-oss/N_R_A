import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

/* -----------------------------------
   Sample News Data (temporary)
----------------------------------- */

let news = [
{
 id:1,
 category:"Business",
 title:"Indian Startup Raises $150M",
 description:"Bengaluru fintech startup PayNow raised $150M funding.",
 content:"Bengaluru-based fintech startup PayNow has successfully raised $150 million in Series C funding led by Sequoia Capital and Tiger Global.",
 language:"en",
 location:"Bengaluru",
 time:"5 hours ago"
},

{
 id:2,
 category:"Sports",
 title:"India Wins Cricket Match",
 description:"India defeated Australia in a thrilling match.",
 content:"Team India secured a spot in the final after defeating Australia by 5 wickets in a nail-biting semi-final match.",
 language:"en",
 location:"Ahmedabad",
 time:"1 hour ago"
},

{
 id:3,
 category:"Cinema",
 title:"Ranveer Singh New Film Trailer Released",
 description:"The trailer of the upcoming film Singha 2 released today.",
 content:"Bollywood actor Ranveer Singh's much-awaited movie Singha 2 trailer was released today and received great response from fans.",
 language:"en",
 location:"Mumbai",
 time:"4 hours ago"
}

];


/* -----------------------------------
   API ROUTES
----------------------------------- */

// test route
app.get("/", (req,res)=>{
res.send("NEWS ROBO API RUNNING 🚀");
});


// get all news
app.get("/news",(req,res)=>{
res.json(news);
});


// get single article
app.get("/news/:id",(req,res)=>{

const id = parseInt(req.params.id);

const article = news.find(n => n.id === id);

if(!article){
return res.status(404).json({message:"News not found"});
}

res.json(article);

});


// add news (admin)
app.post("/news",(req,res)=>{

const newArticle = {
id: news.length + 1,
category: req.body.category,
title: req.body.title,
description: req.body.description,
content: req.body.content,
language: req.body.language || "en",
location: req.body.location,
time: "just now"
};

news.push(newArticle);

res.json({
message:"News added successfully",
data:newArticle
});

});


/* -----------------------------------
   START SERVER
----------------------------------- */

app.listen(PORT,()=>{
console.log(`NEWS ROBO server running on port ${PORT}`);
});