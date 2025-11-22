import React, { useState } from "react";
import axios from "axios";

export default function Form() {
  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    let temp = {};

    if (!form.employeeId.trim())
      temp.employeeId = "Employee ID is required";

    if (!form.name.trim())
      temp.name = "Name is required";

    if (!form.age || form.age <= 0)
      temp.age = "Enter a valid age";

    if (!form.gender.trim())
      temp.gender = "Gender is required";

    if (!form.email)
      temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Enter a valid email";

    if (!form.phone)
      temp.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone))
      temp.phone = "Phone must be 10 digits";

    if (!form.designation.trim())
      temp.designation = "Designation is required";

    if (!form.salary || form.salary <= 0)
      temp.salary = "Enter a valid salary";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setMessage("Please fix the errors before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/employees", form);
      setMessage("Employee added successfully!");

      setForm({
        employeeId: "",
        name: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
        designation: "",
        salary: "",
      });

      setErrors({});
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error while adding employee");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100 p-6">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Add Employee
        </h1>

        {message && (
          <p className="mb-4 text-center font-medium text-blue-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Employee ID
            </label>
            <input
              type="text"
              placeholder="enter your id"
              className="p-3 border rounded-lg w-full"
              value={form.employeeId}
              onChange={(e) =>
                setForm({ ...form, employeeId: e.target.value })
              }
            />
            {errors.employeeId && (
              <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder=" Name"
              className="p-3 border rounded-lg w-full"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Age
            </label>
            <input
              type="number"
              placeholder="Age"
              className="p-3 border rounded-lg w-full"
              value={form.age}
              onChange={(e) =>
                setForm({ ...form, age: e.target.value })
              }
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Gender
            </label>
            <input
              type="text"
              placeholder="Gender"
              className="p-3 border rounded-lg w-full"
              value={form.gender}
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value })
              }
            />
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="p-3 border rounded-lg w-full"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="10-digit number"
              className="p-3 border rounded-lg w-full"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Designation
            </label>
            <input
              type="text"
              placeholder="Designation"
              className="p-3 border rounded-lg w-full"
              value={form.designation}
              onChange={(e) =>
                setForm({ ...form, designation: e.target.value })
              }
            />
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Salary
            </label>
            <input
              type="number"
              placeholder="Salary"
              className="p-3 border rounded-lg w-full"
              value={form.salary}
              onChange={(e) =>
                setForm({ ...form, salary: e.target.value })
              }
            />
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 mt-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  );
}
