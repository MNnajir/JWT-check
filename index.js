const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const secretkey = "secretkey"

app.get("/", (req, res) =>{
    res.send({
        message: "Hello, World!"
    })
})
app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "najirkhan",
        email: "najir@example.com"
    }
    jwt.sign({user}, secretkey, 
        {expiresIn: "1h"}, (err, token) =>{
            res.json({
                token: token
            })
        
        });
})
app.post("/profile", verifyToken, (req, res)=>{
    jwt.verify(req.token,secretkey,(err, authData) =>{
     if(err){
        res.send("Invalid Token")
      }else{
        res.json({
         message: "profile accessed",
         authData: authData
      })
   }
 })
})
function verifyToken(req, res, next){
    const bearerHeader = req.header('authorization')
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ")
        const token = bearer[1]
        req.token = token;
        next()
    }else{
        res.send({
            result:"Token is not valid"
        })
    }
 }
        


app.listen(5000, () => {
    console.log('Server is running on port 5000')
})