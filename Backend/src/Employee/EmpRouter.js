import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
} from "./EmpController.js";

const router = express.Router();

router.post("/create", createEmployee);
router.get("/list", getAllEmployees);
router.get("/:id", getEmployeeById);

export default router;
