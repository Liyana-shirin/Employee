import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./Form.jsx";

const API_BASE = "http://localhost:5000/api/employees";

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
  });

  const [search, setSearch] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  const [loadingList, setLoadingList] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoadingList(true);
      const res = await axios.get(`${API_BASE}/list`);
      setEmployees(res.data.data || []);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    setErrorForm("");
    setLoadingForm(true);

    try {
      const res = await axios.post(`${API_BASE}/create`, formData);
      const created = res.data.data;

      setEmployees((prev) => [created, ...prev]);

      setFormData({
        name: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
        designation: "",
        salary: "",
      });
    } catch (err) {
      if (err.response?.data?.message) {
        setErrorForm(err.response.data.message);
      } else {
        setErrorForm("Something went wrong. Please try again.");
      }
    } finally {
      setLoadingForm(false);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const q = search.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(q) ||
      emp.email?.toLowerCase().includes(q) ||
      emp.designation?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 ">
      <h1 className="text-4xl md:text-3xl font-bold mb-8 text-blue-400 text-center">
        Employee Management System
      </h1>

      <EmployeeForm
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        loading={loadingForm}
        error={errorForm}
        isEditing={false} 
      />

      <div className="flex flex-col gap-3 mb-9">
        <h3 className="font-bold text-xl">Search Employee :</h3>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <input
            type="text"
            placeholder="Search by name, email, or designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-120 border rounded-lg px-3 py-3 bg-white text-sm outline-none 
            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <p className="text-sm text-gray-600">
            Total Employees: <span className="font-semibold">{employees.length}</span>
          </p>
        </div>
      </div>

      <h1 className="font-bold text-2xl mb-5">Employee List</h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm p-3">
            <thead className="bg-white border-b ">
              <tr>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Sl.No</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Name</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Age</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Gender</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Email</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Phone</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Designation</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Salary</th>
              </tr>
            </thead>

            <tbody>
              {loadingList ? (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                    No employees found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp, index) => (
                  <tr
                    key={emp._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 font-bold">{emp.name}</td>
                    <td className="px-4 py-2">{emp.age}</td>
                    <td className="px-4 py-2">{emp.gender}</td>
                    <td className="px-4 py-2">{emp.email}</td>
                    <td className="px-4 py-2">{emp.phone}</td>
                    <td className="px-4 py-2">{emp.designation}</td>
                    <td className="px-4 py-2">₹{emp.salary}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
