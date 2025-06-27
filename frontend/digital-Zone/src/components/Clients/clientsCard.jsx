import React, { useState } from "react";

const ClientsCard = ({ client, onEdit, onDelete }) => {
  
  const [isEditing, setIsEditing] = useState(false);

 
  const [name, setName] = useState(client.name);
  const [lastName, setLastName] = useState(client.lastName);
  const [email, setEmail] = useState(client.email);
  const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber);
  const [dui, setDui] = useState(client.dui);
  const [birthday, setBirthday] = useState(client.birthday ? client.birthday.split("T")[0] : "");
  const [isVerified, setIsVerified] = useState(client.isVerified);


  const handleSubmit = (e) => {
    e.preventDefault();

   
    const updatedClient = {
      ...client,
      name,
      lastName,
      email,
      phoneNumber,
      dui,
      birthday,
      isVerified,
    };

    onEdit(updatedClient);  
    setIsEditing(false);    
  };

  return (
    <div className="client-card">
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
          <h3>{client.name} {client.lastName}</h3>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Teléfono:</strong> {client.phoneNumber}</p>
          <p><strong>DUI:</strong> {client.dui}</p>
          <p><strong>Fecha Nacimiento:</strong> {new Date(client.birthday).toLocaleDateString()}</p>
          <p><strong>Verificado:</strong> {client.isVerified ? "Sí" : "No"}</p>
          <div className="card-actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="delete-btn" onClick={() => onDelete(client._id)}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientsCard;
