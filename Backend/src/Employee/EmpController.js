import Employee from "../Employee/EmpModel.js";

export const createEmployee = async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json({ success: true, message: "Employee created", data: emp });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email must be unique",
        field: error.keyValue,
      });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const emp = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: emp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);

    if (!emp)
      return res.status(404).json({ success: false, message: "Employee not found" });

    res.status(200).json({ success: true, data: emp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




