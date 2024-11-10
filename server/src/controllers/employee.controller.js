import Admin from "../models/admin.model.js";
import Employee from "../models/employee.model.js";
import uploadImageOnCloudinary from "../utils/cloudinary.js";

export const getEmployees = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    const employees = await Employee.find();
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employee found" });
    }
    res.status(200).json({ data: employees });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const { name, email, mobileNo, designation, gender, course } =
    req.body;
    
  if (
    !name ||
    !email ||
    !mobileNo ||
    !designation ||
    !gender ||
    !course
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  let imageLocalPath;
  if(req.file) {
    imageLocalPath = req.file.path;
  }

  let imageUrl;
  if (imageLocalPath) {
    try {
      imageUrl = await uploadImageOnCloudinary(imageLocalPath);
    } catch (error) {
      console.log("Error uploading image: ", error.message);
    }
  }
  if(!imageUrl) {
    return res.status(500).json({ message: "Failed to upload image" });
  }

  try {
    const newEmployee = await Employee.create({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
      image: imageUrl,
    });
    console.log("New Employee: ", newEmployee); //TODO: Remove this line

    if (!newEmployee) {
      return res.status(500).json({ message: "Failed to create employee" });
    }

    return res
      .status(201)
      .json({ message: "Employee created successfully", data: newEmployee });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  const { name, email, mobileNo, designation, gender, course, image } =
    req.body;
  if (
    !name ||
    !email ||
    !mobileNo ||
    !designation ||
    gender ||
    course ||
    image
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const employee = await Employee.findOne({ _id: req.params.id });
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
      image,
    });
    if (!updatedEmployee) {
      return res.status(500).json({ message: "Failed to update employee" });
    }
    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.deleteOne();
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
