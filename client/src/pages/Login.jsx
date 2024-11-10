import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../store/adminStore";

const Login = () => {
  const navigate = useNavigate();
  const { admin, login, setAdmin } = useAdminStore();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

 useEffect(() => {
   if (admin === null) {
     const storedAdmin = localStorage.getItem("admin");
     if (storedAdmin) {
       setAdmin(JSON.parse(storedAdmin));
       navigate("/dashboard");
     }
   }
 }, [admin, navigate, setAdmin]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleFormSubmit}>
          <h1 className="text-center font-semibold text-xl mb-4">Login</h1>
          <div>
            <label htmlFor="username" className="">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-2 h-7"
            />
          </div>
          <div>
            <label htmlFor="password" className="">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-2 h-7"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 mt-2 rounded-md py-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
