const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors');


const admin = require('firebase-admin');

let serviceAccount = require('./utils/Key.json'); // Replace with the path to your key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://playbyplay-f5338-default-rtdb.europe-west1.firebasedatabase.app" // Replace with your Realtime Database URL
});

const db = admin.database();

// Define a reference to a specific location in your database
let ref = db.ref("Plays");

// Write a String to the Database
// ref.set("This is a test string")
//   .then(() => console.log("String added to the database successfully."))
//   .catch(error => console.error("Error writing string to the database: ", error));

// // Read Data
// ref.once("value", function(snapshot) {
//   console.log("Retrieved data from database:", snapshot.val());
// });


app.use(cors());
app.use(bodyParser.json());




app.get("/api", (req,res)=>{
    res.json(
        
        {"users": ["user1","user2","user3"]}
        
        )
})

  
app.get('/storePlay/:play',(req,res)=>{
    const play = req.params.play;
    console.log('Play Below');
    console.log(play);
})

app.get('/storeUserId/:userId', (req, res) => {
    const userId = req.params.userId;
    let ref = db.ref("userIds").child(userId);
  
    ref.set({ addedAt: new Date().toISOString() })
      .then(() => res.send(`UserId ${userId} stored successfully`))
      .catch(error => res.status(500).send(`Error storing userId: ${error}`));
  });

  
app.listen(5000,()=>{console.log("Server started on port 5000");})