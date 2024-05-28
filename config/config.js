
const mongoose = require("mongoose")

require("dotenv").config()
const uri = process.env.apiLink

//const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

//const uri = "mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000 // 30 seconds
  });


async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("MongoClient connected to MongoDB Atlas successfully!");

    // Proceed with Mongoose connection after MongoClient is successfully connected
    await mongoose.connect(uri)
      console.log("Mongoose connected to MongoDB Atlas successfully!");

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    
    // Handle specific error conditions
    if (error.name === 'MongoNetworkError') {
      console.error('Network error occurred. Check your MongoDB server.');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('Server selection error. Ensure MongoDB is running and accessible.');
    } else {
      // Handle other types of errors
      console.error('An unexpected error occurred:', error);
    }

  } finally {
    await client.close(); // Close the MongoClient connection if needed
  }
}

connectToMongoDB().catch(console.error);


// mongoose.connect(db).then(()=> {
//     console.log("Database Connected successfully")
// }).catch((error)=> {
//     console.log(`Unable to connect to datbase ${error}`);
//     console.error('Error connecting to MongoDB:', error.message);
 
//         // Handle specific error conditions
//         if (error.name === 'MongoNetworkError') {
//             console.error('Network error occurred. Check your MongoDB server.');
//         } else if (error.name === 'MongooseServerSelectionError') {
//             console.error('Server selection error. Ensure'
//                 + ' MongoDB is running and accessible.');
//         } else {
//             // Handle other types of errors
//             console.error('An unexpected error occurred:', error);
//         }
// })


module.exports = mongoose.connection;