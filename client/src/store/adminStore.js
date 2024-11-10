import axios from "axios";
import { create } from "zustand";

export const useAdminStore = create((set) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),
  loading: false,
  error: null,

  login: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );
      localStorage.setItem("admin", JSON.stringify(response.data.admin));
      set({ admin: response.data.admin, loading: false });
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        error: error.response?.data?.message || "Login failed",
      });
    }
  },

  logout: async () => {
    localStorage.removeItem("admin");
    set({ admin: null, loading: false });
  },
}));
