const mongoose = require("mongoose");

const regiSchema = new mongoose.Schema(
  {
    userType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    tel: { type: String, required: true, validate: /^\d{10}$/ }, // Validates a 10-digit phone number
    highestQualification: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Validates email formate
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    level: {
      type: String,
      required: true,
      enum: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate", "NA"],
    },
    degreeProgram: { type: String, required: true },
    profilepic: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", regiSchema);
