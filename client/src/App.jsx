import { Link, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAdminStore } from "./store/adminStore";
import Employeee from "./pages/Employeee";

function App() {
  const { admin, logout } = useAdminStore();

  return (
    <>
      {admin ? (
        <header className="container mx-auto">
          <nav className="flex justify-between w-full">
            <div className="flex justify-around w-full">
              <Link to="/dashboard">
                <h1 className="cursor-pointer">Home</h1>
              </Link>
              <Link to="/employee">
                <h1 className="cursor-pointer">Employee List</h1>
              </Link>
              <h1>{admin?.username}</h1>
              <button onClick={logout}>Logout</button>
            </div>
          </nav>
        </header>
      ) : null}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={admin ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/employee"
          element={admin ? <Employeee /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
