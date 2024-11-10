import Admin from "../models/admin.model.js";

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Admin does not exist" });
    }
    if (password !== admin.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", admin: admin });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
