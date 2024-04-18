const PatientDB = require("../models/usermodel");
const CreateFolder = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone_No } = req.body;
    const patientData = new PatientDB({ FirstName, LastName, Email, Phone_No });
    await patientData.save();
    res.json({
      data: patientData,
    });
  } catch (error) {
    res.json({
      Error: error.message,
    });
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
module.exports = { CreateFolder, GetPatient };
