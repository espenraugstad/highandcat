const express = require("express");
const app = express();
const PORT = 3000;

const fs = require("fs");
const textsPath = "./texts/t1.json";

app.use(express.static("public"));

app.get("/list_texts", (req, res)=>{
    console.log(req.headers.referer);
    // Step 1. Read in all texts from the json file

    fs.readFile(textsPath, "utf-8", (err, data)=>{
        if(err){
            console.error(err);
            return res.status(500).send("Error reading file");
        }

        res.send(JSON.parse(data));
    });
});

app.get("/text/:textId", (req, res)=>{
    const textId = req.params.textId;

    fs.readFile(textsPath, "utf-8", (err, data)=>{
        if(err){
            console.error(err);
            return res.status(500).send("Error reading file");
        }

        const allTexts = JSON.parse(data);
        const desiredText = allTexts.filter(text => text.id === parseInt(textId));
        console.log(allTexts);
        res.send(desiredText);
    });

});

app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT);
})