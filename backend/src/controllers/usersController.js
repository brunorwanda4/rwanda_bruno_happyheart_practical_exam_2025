const db = require("../config/db");
const bcrypt = require("bcrypt");

// Create a new user
// Refactored to use .then()/.catch() for bcrypt.hash instead of async/await
exports.createUser = (req, res) => {
  const { username, password } = req.body;

  // Basic validation (optional, but good practice)
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Hash the password using bcrypt.hash which returns a Promise
  bcrypt.hash(password, 10)
    .then(hash => {
      // Once the password is hashed, perform the database insert using the callback pattern
      db.query("INSERT INTO Users (username, hash_password) VALUES (?, ?)", [username, hash],
        (err, result) => {
          if (err) {
            // Log database error
            console.error("Database error creating user:", err);
            // Send a generic server error response
            return res.status(500).json({ message: "Failed to create user" });
          }
          // Send success response with the new user's ID
          res.status(201).json({ id: result.insertId, username: username }); // Optionally include username in response
        });
    })
    .catch(err => {
      // Handle errors that occur during the bcrypt hashing process
      console.error("Error hashing password:", err);
      // Send a generic server error response for hashing failure
      res.status(500).json({ message: "Failed to process password" });
    });
};

// Get all users
// This function already uses the callback pattern and no async/await
exports.getAllUsers = (req, res) => {
  db.query("SELECT user_id, username FROM Users", (err, rows) => {
    if (err) {
      console.error("Database error fetching all users:", err);
      return res.status(500).json({ message: "Failed to fetch users" });
    }
    res.json(rows);
  });
};

// Get a single user by ID
// This function already uses the callback pattern and no async/await
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  db.query("SELECT user_id, username FROM Users WHERE user_id = ?", [userId],
    (err, rows) => {
      if (err) {
        console.error(`Database error fetching user by ID ${userId}:`, err);
        return res.status(500).json({ message: "Failed to fetch user" });
      }
      // Check if user was found
      if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(rows[0]);
    });
};

// Update a user by ID
// This function already uses the callback pattern and no async/await
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { username } = req.body;

  if (!username) {
     return res.status(400).json({ message: "Username is required for update" });
  }

  db.query("UPDATE Users SET username = ? WHERE user_id = ?", [username, userId],
    (err, result) => {
      if (err) {
        console.error(`Database error updating user by ID ${userId}:`, err);
        return res.status(500).json({ message: "Failed to update user" });
      }
      // Check if user was found and updated
      if (result.affectedRows === 0) {
         return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User updated successfully" });
    });
};

// Delete a user by ID
// This function already uses the callback pattern and no async/await
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM Users WHERE user_id = ?", [userId],
    (err, result) => {
      if (err) {
        console.error(`Database error deleting user by ID ${userId}:`, err);
        return res.status(500).json({ message: "Failed to delete user" });
      }
      // Check if user was found and deleted
       if (result.affectedRows === 0) {
         return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    });
};
