require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const seedAdmin = async () => {
  try {
    await connectDB();

    console.log("EMAIL:", process.env.ADMIN_EMAIL);

    const exists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    console.log("EXISTS:", exists);

    if (exists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    console.log("Created:", admin);

    process.exit(0);
  } catch (error) {
    console.error("SEED ERROR:");
    console.error(error);

    process.exit(1);
  }
};

seedAdmin();