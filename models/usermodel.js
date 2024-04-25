const { mongoose,model} = require("mongoose");

const patient= new mongoose.Schema({
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    Email:{
        type:String
    },
    Phone_No:{
        type:Number
    },
    Date:{
        type:String
    },
    Time:{
        type:String
    }
});
const PatientDB= mongoose.model("patient",patient);
module.exports= PatientDB;