import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const api_url = "https://api.lyrics.ovh/v1/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",async (req,res)=>{
    res.render("index.ejs",
    { 
        content:"Enter the music name to be search for...",
    });
})

app.post("/search", async (req,res)=>
{

    const artist_n = req.body.artistname;
    const song_n = req.body.songname;

    try {
        const fullurl = api_url + artist_n + "/" + song_n;
        const respond = await axios.get(fullurl);
        const rawdata = JSON.stringify(respond.data.lyrics);

        // removeing the ""
        var withoutquotes = rawdata.replace('\"','');
        
        //spliting the string into list
        var song = withoutquotes.split('\\n');
        res.render("index.ejs",
        { 
            content: song,
        });

    } catch (error) {
        res.render("index.ejs", { content: "There is an error" }); 
    }
})


// on button click

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`);
})