const PatientDB = require("../models/usermodel");
const nodemailer = require("nodemailer");
const bcrypt=require("bcrypt");


const CreateFolder = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone_No,Date,Time } = req.body;

    let CreatePassword = generatePassword(4);
    console.log("password:", CreatePassword)
    const passvalue= await bcrypt.hash(CreatePassword,10)
    const patientData = new PatientDB({ FirstName, LastName, Email:passvalue, Phone_No,Date,Time });
    await SendmailTransport(Email, CreatePassword,FirstName,Date,Time);
    res.json({
      success:true,
      data: patientData,
      message:"Your Booking is Confirmed"
    });
  } catch (error) {
  res.status(500).send({message:"Not booked",success:false,error})
  }
};


const GetPatient = async (req, res) => {
  try {
    const PData = req.params.id;
    const getPatientData = await PatientDB.findById({ _id: PData });

    res.json({
      Data: getPatientData,
    });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};
function generatePassword(length) {
 
  let character = "12345678900";
  let password = "";
  for (let index = 0; index < length; index++) {
    password += character.charAt(Math.floor(Math.random() * character.length));
  }
  return password;
}
const SendmailTransport = async (Email, CreatePassword,FirstName,Date,Time) => {
  try {
  console.log("data",FirstName,Date,Time)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "psphealthcare96@gmail.com",
        pass: "xjaf oeas xnmh isav",
      },
    });
    const mailOption = {
      from: "prabupalni1999@gmail.com",
      to: Email,
      subject: "Welcome to PSP Health Care ",
    
      text: `Dear ${FirstName},

      I am writing this letter to confirm our appointment scheduled on ${Date} at ${Time}. I am excited to meet you and discuss the details of our future endeavors.
      
      As agreed, the meeting will take place at 37/1 Hospital Street, Rajamangalam, Chennai-600 401, and I will be available at the venue on time. Please let me know if there is any change in your schedule or if you need to reschedule the meeting.
      
      During the meeting, we will discuss health checkup. I have prepared some documents, and I hope they will be of help in understanding the concepts better.
      
      If you need any further information or have any queries, please feel free to contact me via email or phone. I will be more than happy to assist you in any way possible.
      
      Once again, I am looking forward to meet you and discussing the details further.
      
      Best regards,
       
      ${FirstName}  
      You are OTP  ${CreatePassword}`,
    };
    await transporter.sendMail(mailOption);
    console.log("OTP send it");
  } catch (error) {
    console.log(`mail error:${error.message}`);
  }
};
module.exports = { CreateFolder, GetPatient };
