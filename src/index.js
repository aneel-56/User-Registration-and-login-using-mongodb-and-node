const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const UsersCollection = require("./mongodb")
const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) =>{
    res.render("login");
})

app.get("/signup", (req, res) =>{
    res.render("signup");
})

app.post("/signup", async (req, res) => {
    try {
      const { email, password } = req.body; // Extract name and password from request body
  
      await LogInCollection.insertOne({ email, password }); // Insert the data into MongoDB
  
      console.log("User registered successfully");
      res.render("home");
    } catch (err) {
      console.log(err);
      res.send("Error occurred during signup");
    }
  });

  app.post("/login", async(req,res) =>{

    try{
        const check= await LogInCollection.findOne({name:req.body.name})

        if(check.password === req.body.password){
            res.render('home');
        }
        else{
            res.send("wrong password");
        }

    }
    catch{

        res.send("wrong Details");
    }

})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log("Port connected");
})
