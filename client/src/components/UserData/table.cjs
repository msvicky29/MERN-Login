const express = require('express');
const user = require('./sample.json');
const app = express();
const port = 8100;
const cors=require('cors');
app.use(express.json())
const fs=require("fs");
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE"]
}))
app.get("/users", (req, res) => {
    return res.json(user);
});
app.post("/users",(req,res)=>{
    let {name,age,city}=req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"All  fields are required"})
    }
    let id=Date.now();
    user.push({id,name,age,city});
    fs.writeFile("./sample.json",JSON.stringify(user),(err,data)=>{
        return res.json({
            message:"User details added successfully"
        })
    })

})

app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    fs.readFile('./sample.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        let users = JSON.parse(data);
        let filteredUsers = users.filter(user => user.id !== id);
        fs.writeFile('./sample.json', JSON.stringify(filteredUsers), err => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.json(filteredUsers);
        });
    });
});

//update user
app.patch("/users/:id",(req,res)=>{
    let id=Number(req.params.id)
    let {name,age,city}=req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"All  fields are required"})
    }
    let index=user.findIndex((user)=>user.id==id);
    user.splice(index,1,{...req.body})
    
    
    fs.writeFile("./sample.json",JSON.stringify(user),(err,data)=>{
        return res.json({
            message:"User details updated successfully"
        })
    })

})


app.listen(port, () => {
    console.log('User data is listening on port 8100');
});
