import React, { useState, useEffect } from "react";
import axios from "axios"; // Correct import
import Form from "./Form";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data.data);
    } catch (error) {
      setMessage("Error fetching employees");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeAdded = () => {
    setMessage("Employee added successfully!");
    fetchEmployees();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        setMessage("Employee deleted successfully!");
        fetchEmployees();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting employee");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Employee Management System
          </h1>
          <p className="text-gray-600">
            Add, view, and delete employee records
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-medium ${
              message.includes("Error")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Form onEmployeeAdded={handleEmployeeAdded} />
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Employee List
              </h2>
              <button
                onClick={fetchEmployees}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading employees...</p>
              </div>
            ) : employees.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No employees found. Add some employees to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left text-gray-700 font-medium">
                        ID
                      </th>
                      <th className="py-3 px-4 text-left text-gray-700 font-medium">
                        Name
                      </th>
                      <th className="py-3 px-4 text-left text-gray-700 font-medium">
                        Designation
                      </th>
                      <th className="py-3 px-4 text-left text-gray-700 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr
                        key={employee._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-gray-600">
                          {employee.employeeId}
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-800">
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {employee.designation}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDelete(employee._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;