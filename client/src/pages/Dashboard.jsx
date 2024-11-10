import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../store/adminStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const { admin } = useAdminStore();

  useEffect(() => {
    if (admin === null) {
      navigate("/");
    }
  }, [admin, navigate]);

  return (
    <div className="container m-auto w-full min-h-screen">
      <h1>Dashboard</h1>
      <div className=" w-full h-full flex justify-center items-center">
        <h1>Welcome admin panel</h1>
      </div>
    </div>
  );
};

export default Dashboard;
