require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const connection = require("./db");
const userSchema = require('./model/userSchema');

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

connection();

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
      const check = await userSchema.findOne({ email });

      if (check) {
          // User already exists
          return res.status(400).json({ message: "User already exists" });
      }

      // User doesn't exist, proceed to create a new user
      console.log("username ", username, "email: ", email, "password: ", password);
      const newUser = new userSchema({ username, email, password });
      await newUser.save();

      return res.status(200).json({ message: "Signup successful" });
  } catch (error) {
      // Handle any errors that might occur during this process
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/login", async(req, res)=>{
    const {email, password} = req.body;

    const data = userSchema.findOne({email});
    console.log(data);
    if(data){
        if(data.password === password) res.status(200).json({data:data, message:"successfull login"});
        else{res.status(400).json({message: "password mismatched."})}
    }
    else{res.status(400).json({message:"user not found"})}
})



app.post("/updateCart", async (req, res) => {
  const {email, items} = req.body;
  const data = userSchema.findOne({email});
  await userSchema({email},{$set: {items: items}});
})

app.post("/updateOrder", async (req, res)=>{
    const {email, items} = req.body;
    await userSchema({email}, {$set: {orders: items}});
})

app.get("/", (req, res) => {
  console.log("req of root of server ", req.body);
  res.send("Assalamalaikum");
});

app.listen(
  process.env.PORT,
  console.log(`listening to PORT ${process.env.PORT}`),
);