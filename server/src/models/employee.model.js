import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
    enum: ["HR", "MANAGER", "SALES"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F"],
  },
  course: {
    type: String,
    required: true,
    enum: ["MCA", "BCA", "BSC"],
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
