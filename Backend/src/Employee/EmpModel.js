import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    designation: { type: String, required: true },
    salary: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
