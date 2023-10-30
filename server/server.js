const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const User = require('./models/User');
const app = express()
const cors = require('cors');

// Enable All CORS Requests
app.use(cors());
app.use(bodyParser.json());
app.get("/api", (req,res)=>{
    res.json(
        
        {"users": ["user1","user2","user3"]}
        
        )
})
app.get("/formations", (req,res)=>{
    res.json(
        
        {"formations": ["wcwcw","cwc","wwww"]}
        
        )
})


mongoose.connect('mongodb+srv://cluster0.rtexs1r.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));
  

  app.post('/add-user', async (req, res) => {
    const user = new User({
        name: req.body.name
    });

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.listen(5000,()=>{console.log("Server started on port 5000");})