import React, { useState } from "react";

const EmployeesCard = ({ employee, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(employee.name);
  const [lastName, setLastName] = useState(employee.lastName);
  const [email, setEmail] = useState(employee.email);
  const [adress, setAdress] = useState(employee.adress);
  const [hireDate, setHireDate] = useState(employee.hireDate ? employee.hireDate.split("T")[0] : "");
  const [phoneNumber, setPhoneNumber] = useState(employee.phoneNumber);
  const [dui, setDui] = useState(employee.dui);
  const [isssNumber, setIsssNumber] = useState(employee.isssNumber);
  const [birthday, setBirthday] = useState(employee.birthday ? employee.birthday.split("T")[0] : "");
  const [isVerified, setIsVerified] = useState(employee.isVerified);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      ...employee,
      name,
      lastName,
      email,
      adress,
      hireDate,
      phoneNumber,
      dui,
      isssNumber,
      birthday,
      isVerified,
    };

    onEdit(updatedEmployee);
    setIsEditing(false);
  };

  return (
    <div className="employee-card">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Apellido"
            required
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={adress}
            onChange={e => setAdress(e.target.value)}
            placeholder="Dirección"
            required
          />
          <input
            type="date"
            value={hireDate}
            onChange={e => setHireDate(e.target.value)}
            required
          />
          <input
            type="date"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            required
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="Teléfono"
            required
          />
          <input
            type="text"
            value={dui}
            onChange={e => setDui(e.target.value)}
            placeholder="DUI"
            required
          />
          <input
            type="text"
            value={isssNumber}
            onChange={e => setIsssNumber(e.target.value)}
            placeholder="Número ISSS"
            required
          />
          <label>
            Verificado:
            <input
              type="checkbox"
              checked={isVerified}
              onChange={e => setIsVerified(e.target.checked)}
            />
          </label>
          <div className="card-actions">
            <button type="submit" className="save-btn">Guardar</button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </form>
      ) : (
        <>
          <h3>{employee.name} {employee.lastName}</h3>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Dirección:</strong> {employee.adress}</p>
          <p><strong>Fecha Contratación:</strong> {new Date(employee.hireDate).toLocaleDateString()}</p>
          <p><strong>Fecha Nacimiento:</strong> {new Date(employee.birthday).toLocaleDateString()}</p>
          <p><strong>Teléfono:</strong> {employee.phoneNumber}</p>
          <p><strong>DUI:</strong> {employee.dui}</p>
          <p><strong>ISS S:</strong> {employee.isssNumber}</p>
          <p><strong>Verificado:</strong> {employee.isVerified ? "Sí" : "No"}</p>
          <div className="card-actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="delete-btn" onClick={() => onDelete(employee._id)}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeesCard;
