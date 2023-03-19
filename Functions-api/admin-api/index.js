const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json());

const URI = "mongodb+srv://decrypter:decrypter@boybay.jpiuh9i.mongodb.net/Blood_User";
const JWT_SECRET = "admin"

mongoose.connect( URI ).then( ()=>{
    console.log("Connected to MongoDB.");
}).catch( err => {
    if (err) throw err;
  }
);

const Admin = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminCtrl = {
  registerAdmin: async (req, res) => {
    try {

      const { name, email, password } = req.body;
      const admin = await Admin.findOne( { email } );
      if (admin)
        return res.status(400).json({ msg: "The email already exists." });

      const passwordHash = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({
        name, email, password: passwordHash
      });
      await newAdmin.save();
      res.json({ msg: "Sign up Success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ msg: "No user found." });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      //jwt token if login is a success.
      const payload = { id: admin._id, name: admin.username };
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

        const admin = await Admin.findById(payload.id);
        if (!admin) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAdmins: async (req, res) => {
    try {      
      const token = req.header("Authorization");
      if (!token) return res.status(403).send("Authorization Failed");

      jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) return res.status(404).send("Invalid User");
  
        
        const admin = await Admin.find({ });
        if (!admin) return res.status(400).json({ msg: "No user found." });
        res.send(admin);

      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAdmin: async (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.status(403).send("Authorization Failed");

      jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) return res.status(404).send("Invalid User");

        const {id} = req.params;
        const admin = await Admin.findById(id);
        if (!admin) return res.status(400).json({ msg: "No user found." });
        res.send(admin)

      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  

};


app.post('/loginAdmin', adminCtrl.loginAdmin)
app.post('/registerAdmin', adminCtrl.registerAdmin)
app.get('/verifiedTokenAdmin', adminCtrl.verifiedToken)
app.get('/getAdmin', adminCtrl.getAdmins)
app.get('/getAdmin/:id', adminCtrl.getAdmin)

exports.helloWorld = app;
