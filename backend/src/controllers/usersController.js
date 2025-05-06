const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.query("INSERT INTO Users (username, hash_password) VALUES (?, ?)", [username, hash],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId });
    });
};

exports.getAllUsers = (req, res) => {
  db.query("SELECT user_id, username FROM Users", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.getUserById = (req, res) => {
  db.query("SELECT user_id, username FROM Users WHERE user_id = ?", [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows[0]);
    });
};

exports.updateUser = (req, res) => {
  const { username } = req.body;
  db.query("UPDATE Users SET username = ? WHERE user_id = ?", [username, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User updated" });
    });
};

exports.deleteUser = (req, res) => {
  db.query("DELETE FROM Users WHERE user_id = ?", [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User deleted" });
    });
};
