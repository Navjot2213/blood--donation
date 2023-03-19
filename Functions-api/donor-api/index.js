const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json());

const URI = "mongodb+srv://decrypter:decrypter@boybay.jpiuh9i.mongodb.net/Blood_User";
const JWT_SECRET = "kuchBhi"

mongoose.connect( URI ).then( ()=>{
    console.log("Connected to MongoDB.");
}).catch( err => {
    if (err) throw err;
  }
);

const Users = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  registerUser: async (req, res) => {
    try {

      const { name, email, password, dob, Medical_Condition, bloodGroup, gender } = req.body;
      const user = await Users.findOne( { email } );
      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        dob,
        Medical_Condition, 
        bloodGroup,
        gender,
        rewardPoints: 0
      });
      await newUser.save();
      res.json({ msg: "Sign up Success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "No user found." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      //jwt token if login is a success.
      const payload = { id: user._id, name: user.username };
      const token = jwt.sign(payload, JWT_SECRET , {
        expiresIn: "1d",
      });

      res.json({ token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) return res.send(false);

        const user = await Users.findById(payload.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getdonors: async (req, res) => {
    try {
        const users = await Users.find({ });
        if (!users) return res.status(400).json({ msg: "No user found." });
        res.send(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getdonor: async (req, res) => {
    try {
        const {id} = req.params ;
        const user = await Users.findById(id);
        if (!user) return res.status(400).json({ msg: "No user found." });
        res.send(user)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getdonorheader: async(req, res)=>{
    const token = req.header("Authorization")
    if(!token) return res.send({ msg: "No user found."} );
      jwt.verify(token, JWT_SECRET, async (err, payload) => {
          if (err) return res.send({ msg: "No user found."} );
          const user = await Users.findById(payload.id);
          if (!user) return res.send({ msg: "No user found."} );
          return res.send(user);
      })
    }

};


app.post('/loginUser', userCtrl.loginUser)
app.post('/registerUser', userCtrl.registerUser)
app.get('/verifiedToken', userCtrl.verifiedToken)
app.get('/getdonor', userCtrl.getdonors)
app.get('/getdonor/:id', userCtrl.getdonor)
app.get('/getdonorheader', userCtrl.getdonorheader)

exports.helloWorld = app;
