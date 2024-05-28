
const mongoose = require("mongoose")

require("dotenv").config()
const db = process.env.apiLink

mongoose.connect(db).then(()=> {
    console.log("Database Connected successfully")
}).catch((error)=> {
    console.log(`Unable to connect to datbase ${error}`);
    console.error('Error connecting to MongoDB:', error.message);
 
        // Handle specific error conditions
        if (error.name === 'MongoNetworkError') {
            console.error('Network error occurred. Check your MongoDB server.');
        } else if (error.name === 'MongooseServerSelectionError') {
            console.error('Server selection error. Ensure'
                + ' MongoDB is running and accessible.');
        } else {
            // Handle other types of errors
            console.error('An unexpected error occurred:', error);
        }
})


module.exports = mongoose.connection;