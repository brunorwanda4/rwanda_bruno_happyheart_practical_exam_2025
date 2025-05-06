const bcrypt = require("bcrypt");
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
      .query("INSERT INTO Users (username, hash_password) VALUES (?, ?)", [
        username,
        hashedPassword,
      ]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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

    const isMatch = await bcrypt.compare(password, user.hash_password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res
      .status(200)
      .json({ message: "Login successful", user_id: user.user_id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
