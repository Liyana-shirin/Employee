import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "./EmpController.js";

const router = express.Router();

router.post("/create", createEmployee);
router.get("/list", getAllEmployees);
router.get("/:id", getEmployeeById);
router.patch("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

export default router;
