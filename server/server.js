const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors');


const admin = require('firebase-admin');

let serviceAccount = require('./utils/Key.json'); // Replace with the path to your key file
app.use(express.json());

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

app.delete('/removePlay/:playId', (req, res) => {
  const playId = req.params.playId;
  
  // Reference to the specific play in the 'plays' node in Firebase Realtime Database
  const playRef = admin.database().ref(`plays/${playId}`);

  // Remove the play with the matching playId
  playRef.remove()
    .then(() => {
      res.send('Play successfully removed');
    })
    .catch(error => {
      console.error("Error removing play:", error);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/storePlay', (req, res) => {
  const play = req.body;
  const playID = req.body.id; // Ensure that playID is unique for each play
  console.log('Play Below');
  console.log(play);

  // Reference to your Firebase Realtime Database
  const dbRef = admin.database().ref('plays/' + playID);

  // Set the play object in the database
  dbRef.set(play, (error) => {
      if (error) {
          // Handle the error case
          console.error('Data could not be saved.' + error);
          res.status(500).send('Error saving data to Firebase.');
      } else {
          // Data saved successfully!
          console.log('Data saved successfully.');
          res.status(200).send('Data saved to Firebase.');
      }
  });
});

app.get('/getUserPlays/:userId', (req, res) => {
  const userId = req.params.userId;
  
  // Reference to your 'plays' node in Firebase Realtime Database
  const playsRef = admin.database().ref('plays');

  // Query for plays with the matching userId
  playsRef.orderByChild('userId').equalTo(userId).once('value', (snapshot) => {
    if (snapshot.exists()) {
      const playsData = snapshot.val();
      // Send the data back as a response
      res.json(playsData);
    } else {
      res.status(404).send('No plays found for this user');
    }
  }).catch(error => {
    console.error("Error fetching data:", error);
    res.status(500).send('Internal Server Error');
  });
});


app.get('/storeUserId/:userId', (req, res) => {
    const userId = req.params.userId;
    let ref = db.ref("userIds").child(userId);
  
    ref.set({ addedAt: new Date().toISOString() })
      .then(() => res.send(`UserId ${userId} stored successfully`))
      .catch(error => res.status(500).send(`Error storing userId: ${error}`));
  });

  
app.listen(5000,()=>{console.log("Server started on port 5000");})