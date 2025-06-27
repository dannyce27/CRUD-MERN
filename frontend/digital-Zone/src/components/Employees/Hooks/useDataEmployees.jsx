import { useState } from "react";
import toast from "react-hot-toast";

const useUserDataEmployees = () => {
  const ApiEmployees = "http://localhost:4000/api/employees";

  // Estados para formulario
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dui, setDui] = useState("");
  const [isssNumber, setIsssNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorEmployee, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const cleanData = () => {
    setId("");
    setName("");
    setLastName("");
    setBirthday("");
    setEmail("");
    setAdress("");
    setHireDate("");
    setPassword("");
    setPhoneNumber("");
    setDui("");
    setIsssNumber("");
    setIsVerified(false);
    setError(null);
    setSuccess(null);
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(ApiEmployees);
      if (!res.ok) throw new Error("Error al obtener empleados");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      toast.error("Error al cargar empleados");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !lastName || !birthday || !email || !adress || !hireDate || !password || !phoneNumber || !dui || !isssNumber) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      const newEmployee = {
        name,
        lastName,
        birthday,
        email,
        adress,
        hireDate,
        password,
        phoneNumber,
        dui,
        isssNumber,
        isVerified,
      };

      const res = await fetch(ApiEmployees, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (!res.ok) throw new Error("Error al crear empleado");

      toast.success("Empleado creado");
      setSuccess("Empleado creado correctamente");
      cleanData();
      fetchEmployees();
    } catch (err) {
      toast.error("Error al crear empleado");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await fetch(`${ApiEmployees}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar empleado");
      toast.success("Empleado eliminado");
      fetchEmployees();
    } catch (err) {
      toast.error("Error al eliminar empleado");
    }
  };

  const updateEmployee = (employee) => {
    setId(employee._id);
    setName(employee.name);
    setLastName(employee.lastName);
    setBirthday(employee.birthday?.split("T")[0] || "");
    setEmail(employee.email);
    setAdress(employee.adress);
    setHireDate(employee.hireDate?.split("T")[0] || "");
    setPassword(employee.password);
    setPhoneNumber(employee.phoneNumber);
    setDui(employee.dui);
    setIsssNumber(employee.isssNumber);
    setIsVerified(employee.isVerified);
    setError(null);
    setSuccess(null);
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      setLoading(true);
      const res = await fetch(`${ApiEmployees}/${updatedEmployee._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
      });

      if (!res.ok) throw new Error("Error al actualizar empleado");

      toast.success("Empleado actualizado");
      setSuccess("Empleado actualizado correctamente");
      cleanData();
      fetchEmployees();
    } catch (err) {
      toast.error("Error al actualizar empleado");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    setId,
    name,
    setName,
    lastName,
    setLastName,
    birthday,
    setBirthday,
    email,
    setEmail,
    adress,
    setAdress,
    hireDate,
    setHireDate,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    dui,
    setDui,
    isssNumber,
    setIsssNumber,
    isVerified,
    setIsVerified,
    employees,
    loading,
    errorEmployee,
    success,
    cleanData,
    fetchEmployees,
    handleSubmit,
    deleteEmployee,
    updateEmployee,
    handleUpdate,
  };
};

export default useUserDataEmployees;
