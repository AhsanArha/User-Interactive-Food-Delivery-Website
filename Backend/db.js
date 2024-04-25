const mongoose = require("mongoose");

module.exports = () =>{
    const connectionParams = {
        useNewUrlParser: true, 
        userUnifiedTopology: true
    }

    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("connected to the database successfully");
    }catch(error){
        console.log(error);
        console.log("could not connect database")
    }
}