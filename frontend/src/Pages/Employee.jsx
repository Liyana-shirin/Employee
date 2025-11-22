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
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
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
      if (isEditing && editingId) {

        const res = await axios.patch(`${API_BASE}/update/${editingId}`, formData);
        const updated = res.data.data;

        setEmployees((prev) =>
          prev.map((emp) => (emp._id === editingId ? updated : emp))
        );
      } else {
        const res = await axios.post(`${API_BASE}/create`, formData);
        const created = res.data.data;

        setEmployees((prev) => [created, ...prev]);
      }

      setFormData({
        name: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
        designation: "",
        salary: "",
      });
      setIsEditing(false);
      setEditingId(null);
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

  const handleEdit = (emp) => {
    setFormData({
      name: emp.name || "",
      age: emp.age || "",
      gender: emp.gender || "",
      email: emp.email || "",
      phone: emp.phone || "",
      designation: emp.designation || "",
      salary: emp.salary || "",
    });
    setIsEditing(true);
    setEditingId(emp._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setErrorForm("");
    setFormData({
      name: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      designation: "",
      salary: "",
    });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
      alert("Failed to delete employee");
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
        onCancel={handleCancelEdit}
        isEditing={isEditing}
        loading={loadingForm}
        error={errorForm}
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

        <h1 className="font-bold text-2xl mb-5">Employee list </h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm p-3">
            <thead className="bg-white border-b ">
              <tr>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Sl.No</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Name</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Age</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700"> Gender</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Email</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Phone</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">Designation</th>
                <th className="px-4 py-2 text-left font-bold text-gray-700">salary</th>


              </tr>
            </thead>

            <tbody>
              {loadingList ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                    No employees found.
                  </td>
                </tr>
              ) : (
               filteredEmployees.map((emp, index) => (
  <tr
    key={emp._id}
    className={index % 3 === 0 ? "bg-white" : "bg-gray-50"}
  >
    <td className="px-4 py-2">{index + 1}</td>
    <td className="px-4 py-2 font-bold">{emp.name}</td>
    <td className="px-4 py-2">{emp.age}</td>
    <td className="px-4 py-2">{emp.gender}</td>
    <td className="px-4 py-2">{emp.email}</td>
    <td className="px-4 py-2">{emp.phone}</td>
    <td className="px-4 py-2">{emp.designation}</td>

    <td className="px-4 py-2">₹{emp.salary}</td>

    <td className="px-4 py-2">
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(emp)}
          className="px-3 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(emp._id)}
          className="px-3 py-1 rounded-md text-xs bg-red-50 text-red-700 hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </td>
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
