const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
const axios = require('axios');

app.use(cors())
app.use(express.json());

const URI = "mongodb+srv://decrypter:decrypter@boybay.jpiuh9i.mongodb.net/Blood_User";

mongoose.connect( URI ).then( ()=>{
    console.log("Connected to MongoDB.");
}).catch( err => {
    if (err) throw err;
  }
);

const Camps = require("./model");

const campCtrl = {
  createCamp: async (req, res) => {
    try {

      const { campName, location, startTime, endTime } = req.body;
      
      const token = req.header("Authorization");
      if (!token) res.status(404).json({ msg: "Authorizarion Failed." });
      const response = await axios.get('https://asia-south1-team-decrypters.cloudfunctions.net/admin-api/verifiedTokenAdmin', {
        headers :{
          Authorization : token
        }
      })
      if (!response.data) res.status(404).json({ msg: "Authorizarion Failed." });

      const camps = await Camps.findOne( { campName } );
      if (camps)
        return res.status(400).json({ msg: "The Camp already exists." });

      const newCamp = new Camps({
        campName, location, donors: [], startTime, endTime, createdBy: `jdfjdfhdjfh`
      });

      await newCamp.save();
      res.json({ msg: "New Camp Created Successfully" });

      sendMail({campName, location, startTime, endTime}).catch( err=>{
        console.log(err)
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getCampsLists: async (req, res) => {
    try {
        const camps = await Camps.find({ });
        if (!camps) return res.status(400).json({ msg: "No user found." });
        res.send(camps);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getCamp: async (req, res) => {
    try {
        const {id} = req.params;
        const camps = await Camps.findById(id);
        if (!camps) return res.status(400).json({ msg: "No user found." });
        res.send(camps)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  donorRegisterted: async (req, res) => {
    try {
        const {id} = req.params;
        const camp = await Camps.findById(id);
        if (!camp) return res.status(400).json({ msg: "No Camp Found." });
        
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({ msg: "No Valid Donor Found." });

        const response = await axios.get("https://asia-south1-team-decrypters.cloudfunctions.net/donor-api/getdonorheader", {
          headers: { Authorization: token}
        })
        if (camp.donors.includes(response.data._id) ) return res.json({ msg: "User Already Registered to Camp." });
        
        camp.donors.push(response.data._id)
        camp.save()
        res.json({ msg: "User Added Successfully Registered to Camp." });
    } catch (err) {
      return res.status(500).json({ msg: err.response.data.msg });
    }
  },

  sendNotiDonor: async (req,res)=>{
    try {
      const {donorEmail, message, subject, requesterEmail} = req.body;
      const msg = {
        from: '222navjot@gmail.com', 
        to: requesterEmail,
        bcc: donorEmail,
        subject: subject, 
        text: message, 
      }
      sendMailNoti(msg);
      res.json({msg: "Message Send to Donor"})
    } catch (error) {
      return res.status(500).json({ msg: err.response.data.msg });
    }
  },

  getRegisteredCamps: async (req,res)=>{
    try {
      const token = req.header("Authorization")
      if(!token) return res.status(400).json({ msg: "No Valid Donor Found." });

      const response = await axios.get("https://asia-south1-team-decrypters.cloudfunctions.net/donor-api/getdonorheader", {
        headers: { Authorization: token}
      })
      const camp = await Camps.find({ });
      if (!camp) return res.status(400).json({ msg: "No Camp Found." });
      const filtered = camp.filter( value => value.donors.includes(response.data._id));
      res.json(filtered)
    } catch (error) {
      return res.status(500).json({ msg: err.response.data.msg });
    }
  },

};

app.post('/createCamp', campCtrl.createCamp)
app.get('/getCampsLists', campCtrl.getCampsLists)
app.get('/getCamps/:id', campCtrl.getCampsLists)
app.get('/getRegisteredCamps', campCtrl.getRegisteredCamps)
app.patch('/donorRegisterted/:id', campCtrl.donorRegisterted);

app.post('/sendNotiDonor', campCtrl.sendNotiDonor)

exports.helloWorld = app;


async function sendMail( camp ) {
  const { campName, location, startTime, endTime } = camp ;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "222navjot@gmail.com",
      pass: `frnvbktttzmevbat`
    }
  });

  const donors = await axios.get('https://asia-south1-team-decrypters.cloudfunctions.net/donar-api/getDonor')
  const filteredEmails =  donors.data.map( data => data.email );
  console.log(filteredEmails)

  const msg = {
    from: '222navjot@gmail.com', 
    to: filteredEmails, 
    subject: `New Blood Donation Camp | ${campName} | ${location}`, 
    text: `New Blood Donation Camp | ${campName} | ${location} | Start Date: ${new Date(startTime).toLocaleDateString('en-IN')} | End Date: ${new Date(endTime).toLocaleDateString('en-IN')}`, 
  }
 await transporter.sendMail(msg);

}


async function sendMailNoti( msg ) { ;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "222navjot@gmail.com",
      pass: `frnvbktttzmevbat`
    }
  });

 await transporter.sendMail(msg);

}