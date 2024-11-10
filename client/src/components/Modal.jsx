/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useEmployeeStore } from "../store/employeeStore";

const Modal = ({ isOpen, closeModal, action, employeeData }) => {
  const { createEmployee } = useEmployeeStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (action === "edit" && employeeData) {
      setFormData({
        name: employeeData.name || "",
        email: employeeData.email || "",
        mobileNo: employeeData.mobileNo || "",
        designation: employeeData.designation || "",
        gender: employeeData.gender || "",
        course: employeeData.course || [],
        image: employeeData.image || null,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        mobileNo: "",
        designation: "",
        gender: "",
        course: [],
        image: null,
      });
    }
  }, [action, employeeData]);

  if (!isOpen) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const newCourses = prevData.course.includes(value)
        ? prevData.course.filter((course) => course !== value)
        : [...prevData.course, value];
      return {
        ...prevData,
        course: newCourses,
      };
    });
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEmployee(formData);
      closeModal();
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
      onClick={closeModal}
    >
      <div className="bg-white p-6 rounded-md w-1/3" onClick={handleModalClick}>
        <h2 className="text-xl font-semibold mb-4">
          {action === "create" ? "Create Employee" : "Edit Employee"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border-2 rounded-md p-2"
            />
            {errors?.message && (
              <span className="text-red-500">{errors.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-2 rounded-md p-2"
            />
            {errors?.message && (
              <span className="text-red-500">{errors.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="mobileNo" className="block">
              Mobile No
            </label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className="w-full border-2 rounded-md p-2"
            />
            {errors?.message && (
              <span className="text-red-500">{errors.message}</span>
            )}
          </div>

          {/* Designation Dropdown */}
          <div className="mb-4">
            <label htmlFor="designation" className="block">
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full border-2 rounded-md p-2"
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="MANAGER">MANAGER</option>
              <option value="SALES">SALES</option>
            </select>
            {errors?.designation && (
              <span className="text-red-500">{errors.designation}</span>
            )}
          </div>

          {/* Gender Radio Buttons */}
          <div className="mb-4">
            <label className="block">Gender</label>
            <div>
              <input
                type="radio"
                id="M"
                name="gender"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="M" className="mr-4">
                Male
              </label>

              <input
                type="radio"
                id="F"
                name="gender"
                value="F"
                checked={formData.gender === "F"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="F" className="mr-4">
                Female
              </label>
            </div>
            {errors?.gender && (
              <span className="text-red-500">{errors.gender}</span>
            )}
          </div>

          {/* Course Checkbox */}
          <div className="mb-4">
            <label className="block">Courses</label>
            <div>
              <input
                type="checkbox"
                id="MCA"
                value="MCA"
                checked={formData.course.includes("MCA")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="MCA" className="mr-4">
                MCA
              </label>

              <input
                type="checkbox"
                id="BCA"
                value="BCA"
                checked={formData.course.includes("BCA")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="BCA" className="mr-4">
                BCA
              </label>

              <input
                type="checkbox"
                id="BSC"
                value="BSC"
                checked={formData.course.includes("BSC")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="BSC">BSC</label>
            </div>
            {errors?.course && (
              <span className="text-red-500">{errors.course}</span>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="w-full border-2 rounded-md p-2"
            />
            {errors?.image && (
              <span className="text-red-500">{errors.image}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              {action === "create" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
