import React, { useEffect, useState } from "react";
import useUserDataEmployees from "../components/Employees/Hooks/useDataEmployees.jsx";
import EmployeesCard from "../components/Employees/EmployeesCard.jsx";
import "../styles/employeesPage.css";

const EmployeesPage = () => {
  const {
    employees,
    fetchEmployees,
    deleteEmployee,
    handleUpdate,
    handleSubmit,
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
    cleanData,
  } = useUserDataEmployees();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditEmployee = async (updatedEmployee) => {
    await handleUpdate(updatedEmployee);
    fetchEmployees();
  };

  return (
    <div className="employees-page">
      <header className="employees-header">
        <h1>Bienvenido a la página de Empleados</h1>
        <p>Aquí puedes ver y gestionar todos los empleados registrados.</p>

        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cerrar formulario" : "Agregar empleado"}
        </button>

        {showForm && (
          <form className="add-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Dirección" value={adress} onChange={(e) => setAdress(e.target.value)} required />
            <input type="date" placeholder="Fecha de nacimiento" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
            <input type="date" placeholder="Fecha de contratación" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />
            <input type="text" placeholder="Teléfono" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            <input type="text" placeholder="DUI" value={dui} onChange={(e) => setDui(e.target.value)} required />
            <input type="text" placeholder="ISSS" value={isssNumber} onChange={(e) => setIsssNumber(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label>
              Verificado:
              <input type="checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)} />
            </label>
            <button className="save-btn" type="submit">Guardar</button>
          </form>
        )}
      </header>

      <section className="employees-grid">
        {employees.length === 0 ? (
          <p className="no-employees">No hay empleados registrados todavía.</p>
        ) : (
          employees.map((employee) => (
            <EmployeesCard
              key={employee._id}
              employee={employee}
              onEdit={handleEditEmployee}
              onDelete={deleteEmployee}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default EmployeesPage;
