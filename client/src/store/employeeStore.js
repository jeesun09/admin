import axios from "axios";
import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
  employee: [],
  countEmployee: 0,
  loading: false,

  getEmployee: async (username) => {
    set({ loading: true });

    try {
      const employees = await axios.get(
        `http://localhost:5000/api/employee/get-employees?username=${username}`
      );
      set({
        employee: employees.data.data,
        countEmployee: employees.data.data.length,
        loading: false,
      });
    } catch (error) {
      console.error("Error getting employees: ", error);
      set({ loading: false });
    }
  },

  createEmployee: async (formData) => {
    set({ loading: true });

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.mobileNo ||
        !formData.image
      ) {
        set({ loading: false });
        return console.error("Missing required fields");
      }

      const response = await axios.post(
        "http://localhost:5000/api/employee/create-employee",
        formData
      );

      console.log("Create Employee Response: ", response.data);
      set((prev) => ({
        employee: [...prev.employee, response.data.data],
        countEmployee: prev.countEmployee + 1,
      }));

      // End loading state
      set({ loading: false });
    } catch (error) {
      console.error("Error creating employee: ", error);
      set({ loading: false });
    }
  },
}));
