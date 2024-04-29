import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import {port, urlWet, apiKey} from "./const.js"


const app=express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    const coordinates= await axios.get(urlWet+`q=Praha&appid=${apiKey}`)
    const x=coordinates.data;
   
    let dataA={city: "Praha",temp: x.main.temp,feel: x.main.feels_like,clouds: x.clouds.all,humidity: x.main.humidity,windspeed: x.wind.speed, sS: x.sys.sunset, sR: x.sys.sunrise}
    res.render("index.ejs",{data:dataA});
})

app.post("/teletele",async(req,res)=>{
    let city=req.body.city;
    const coordinates= await axios.get(urlWet+`q=${city}&appid=${apiKey}`)
    const x=coordinates.data;
   
    let dataA={city: city,temp: x.main.temp,feel: x.main.feels_like,clouds: x.clouds.all,humidity: x.main.humidity,windspeed: x.wind.speed, sS: x.sys.sunset, sR: x.sys.sunrise}
    res.render("index.ejs",{data:dataA});
})




app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})