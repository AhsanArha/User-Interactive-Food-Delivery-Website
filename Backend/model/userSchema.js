const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {type: String}, 
    email: {type: String},
    password: {type: String},
    carts: {type: Array},
    orders: {type: Array},
}, {collection: "userData"});

module.exports = mongoose.model("userFormModel", userSchema)

//userData is collection name