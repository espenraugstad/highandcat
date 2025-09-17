const express = require("express");
const app = express();
const PORT = 3000;

const fs = require("fs");

app.use(express.static("public"));

app.get("/list_texts", (req, res)=>{
    // Step 1. Read in all texts from the json file
    const textsPath = "./texts/t1.json";

    fs.readFile(textsPath, "utf-8", (err, data)=>{
        if(err){
            console.error(err);
            return res.status(500).send("Error reading file");
        }

        res.send(JSON.parse(data));

    });

});

app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT);
})