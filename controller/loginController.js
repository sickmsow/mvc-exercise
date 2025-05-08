const loginModel = require("../model/user");

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  try {
    // Get the user based on email
    const user = await loginModel.getUserByEmail(email);  

    if (!user) {
      return res.status(401).json({ error: "Invalid email." });
    }

    // Compare the passwords (assuming password is stored as a hash)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Successful login
    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error." });
  }
};

module.exports = loginController;
