const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../config/db");

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "email and password are required" });

  try {
    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM Users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
      .promise()
      .query("INSERT INTO Users (username, password_hash) VALUES (?, ?)", [
        username,
        hashedPassword,
      ]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret-key'; // Replace with a strong, unique secret
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db
      .promise()
      .query("SELECT * FROM Users WHERE username = ?", [username]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If credentials are correct, generate a JWT
    const payload = {
      user_id: user.user_id,
      username: user.username,
      // Add additional user info to payload if needed
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      token,
      user_id: user.user_id,
      username: user.username
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};