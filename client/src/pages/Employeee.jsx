import { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore";
import { useEmployeeStore } from "../store/employeeStore";
import Modal from "../components/Modal";

const Employeee = () => {
  const { admin } = useAdminStore();
  const { employee, getEmployee, countEmployee, loading } = useEmployeeStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const openCreateModal = () => {
    setModalAction("create");
    setIsModalOpen(true);
  };

  const openEditModal = (emp) => {
    setModalAction("edit");
    setSelectedEmployee(emp);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (admin) {
      getEmployee(admin?.username);
    }
  }, [admin, getEmployee]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="container mx-auto">
        <div className="w-full gap-3 flex justify-end items-center">
          <h2>Total Count: {countEmployee}</h2>
          <button
            className="bg-green-400 rounded-md py-1 px-2"
            onClick={openCreateModal}
          >
            Create Employee
          </button>
        </div>
        <div className="w-full gap-3 flex justify-end items-center">
          <p>Search</p>
          <input type="text" className="border-2 rounded-md border-black" />
        </div>
      </div>
      <div className="overflow-x-auto mx-auto flex justify-center">
        <table>
          <thead>
            <tr>
              <th className="border px-4 py-2">Unique Id</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Mobile No</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Create date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employee?.map((emp) => (
              <tr key={emp._id}>
                <td className="border px-4 py-2 text-center">{emp._id}</td>
                <td className="border px-4 py-2 text-center">
                  <img
                    src={emp.image}
                    alt="Employee"
                    className="w-12 h-12 mx-auto"
                  />
                </td>
                <td className="border px-4 py-2 text-center">{emp.name}</td>
                <td className="border px-4 py-2 text-center">{emp.email}</td>
                <td className="border px-4 py-2 text-center">{emp.mobileNo}</td>
                <td className="border px-4 py-2 text-center">
                  {emp.designation}
                </td>
                <td className="border px-4 py-2 text-center">{emp.gender}</td>
                <td className="border px-4 py-2 text-center">{emp.course}</td>
                <td className="border px-4 py-2 text-center">
                  {emp.createdAt}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button onClick={() => openEditModal(emp)}>Edit</button> |{" "}
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        action={modalAction}
        employeeData={selectedEmployee}
      />
    </div>
  );
};

export default Employeee;
