require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("./models/Payment.js");

// Import models
const User = require("./models/User");
const Centre = require("./models/Centre.models.js");
const ExamCentre = require("./models/Examcentre.model.js");
const ExamSupritendent = require("./models/ExamSupritendent.models.js");
const Registeration = require("./models/Regi.Form.js");

// Import middlewares and validators
const signupSchema = require("../backend/validators/auth-validator.js");
const validate = require("./middlewares/validate-middlewares");
const errorMiddleware = require("./middlewares/error-middleware");

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(errorMiddleware);
app.use(bodyParser.json());

// Connect to MongoDB
const URI = process.env.MONGODB_URI;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// **Registration API**
app.post("/register", validate(signupSchema), async (req, res) => {
  const { userType, username, email, password } = req.body;

  if (!userType || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userType,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// **Login API**
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// **Centre API**
app.post("/centre", async (req, res) => {
  const { centreCode, centreName, centreCity, centerState, centerCountry } =
    req.body;

  if (
    !centreCode ||
    !centreName ||
    !centreCity ||
    !centerState ||
    !centerCountry
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newCentre = new Centre({
      centreCode,
      centreName,
      centerCountry,
      centerState,
      centreCity,
    });
    const result = await newCentre.save();
    res.status(201).json({ message: "Centre added successfully", result });
  } catch (error) {
    console.error("Error adding centre:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// **ExamCentre API**
app.post("/examCentre", async (req, res) => {
  const { esCode, centreName, examDate, cityName, stateid, countryid } =
    req.body;

  if (
    !esCode ||
    !centreName ||
    !examDate ||
    !cityName ||
    !stateid ||
    !countryid
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newExamCentre = new ExamCentre({
      esCode,
      centreName,
      examDate,
      cityName,
      stateid,
      countryid,
    });

    const result = await newExamCentre.save();
    res.status(201).json({ message: "Exam Centre added successfully", result });
  } catch (error) {
    console.error("Error adding exam centre:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// **ExamSupritendent API**
app.post("/examSupritendent", async (req, res) => {
  const {
    esCode,
    esName,
    esSex,
    email,
    mobile,
    education,
    experience,
    jobType,
    address,
    countryId,
    stateId,
    city,
  } = req.body;

  if (
    !esCode ||
    !esName ||
    !esSex ||
    !email ||
    !mobile ||
    !education ||
    !experience ||
    !jobType ||
    !address ||
    !countryId ||
    !stateId ||
    !city
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newExamSupritendent = new ExamSupritendent({
      esCode,
      esName,
      esSex,
      email,
      mobile,
      education,
      experience,
      jobType,
      address,
      countryId,
      stateId,
      city,
    });
    const result = await newExamSupritendent.save();
    res
      .status(201)
      .json({ message: "Exam Superintendent added successfully", result });
  } catch (error) {
    console.error("Error adding exam superintendent:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// **Registrationform API**
app.post("/registerform", async (req, res) => {
  const {
    userType,
    firstName,
    lastName,
    fatherName,
    motherName,
    tel,
    highestQualification,
    address,
    email,
    dateOfBirth,
    gender,
    level,
    degreeProgram,
    profilepic,
  } = req.body;

  if (
    !userType ||
    !firstName ||
    !lastName ||
    !fatherName ||
    !motherName ||
    !tel ||
    !highestQualification ||
    !address ||
    !email ||
    !dateOfBirth ||
    !gender ||
    !level ||
    !degreeProgram ||
    !profilepic
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const validLevels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  if (!validLevels.includes(level)) {
    return res.status(400).json({ message: "Invalid level selected" });
  }

  if (!/^\d{10}$/.test(tel)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  if (!/.+@.+\..+/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const newRegistration = new Registeration({
      userType,
      firstName,
      lastName,
      fatherName,
      motherName,
      tel,
      highestQualification,
      address,
      email,
      dateOfBirth,
      gender,
      level,
      degreeProgram,
      profilepic,
    });

    // Save to the database
    const result = await newRegistration.save();
    res.status(201).json({ message: "Registered successfully!", result });
  } catch (error) {
    console.error("Error registering:", error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Server error", error });
  }
});

// Get student data
app.get("/registerform", async (req, res) => {
  try {
    const student = await Registeration.findOne();
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student data" });
  }
});

// ROUTE 1 : Create Order Api Using POST Method http://localhost:4000/api/payment/order
app.post("/order", (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
      console.log(order);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

// ROUTE 2 : Create Verify Api Using POST Method http://localhost:4000/api/payment/verify
app.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await payment.save();

      res.json({
        message: "Payement Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

// **Start the server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
