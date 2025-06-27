import React, { useEffect, useState } from "react";
import useUserDataClients from "../components/Clients/Hooks/useDataClients.jsx";
import ClientsCard from "../components/Clients/clientsCard.jsx";
import "../styles/clientsPage.css";

const ClientsPage = () => {
  const {
    clients,
    fetchClients,
    deleteClient,
    handleUpdate,
    handleSubmit,
    name, setName,
    lastName, setLastName,
    birthday, setBirthday,
    email, setEmail,
    password, setPassword,
    phoneNumber, setPhoneNumber,
    dui, setDui,
    isVerified, setIsVerified,
    loading,
    errorClient,
    success,
  } = useUserDataClients();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const handleEditClient = async (updatedClient) => {
    await handleUpdate(updatedClient);
    fetchClients();
  };

  return (
    <div className="clients-page">
      <header className="clients-header">
        <h1>Bienvenido a la página de Clientes</h1>
        <p>Aquí puedes ver todos los clientes registrados en el sistema.</p>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cerrar formulario" : "Agregar Cliente"}
        </button>
      </header>

      {showForm && (
        <form className="add-client-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            type="date"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="DUI"
            value={dui}
            onChange={e => setDui(e.target.value)}
            required
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isVerified}
              onChange={e => setIsVerified(e.target.checked)}
            />
            Verificado
          </label>
          <button type="submit" className="save-btn">Guardar Cliente</button>
        </form>
      )}

      {loading && <p>Cargando clientes...</p>}
      {errorClient && <p className="error-message">{errorClient}</p>}
      {success && <p className="success-message">{success}</p>}

      <section className="clients-grid">
        {!loading && clients.length === 0 && (
          <p className="no-clients">No hay clientes registrados todavía.</p>
        )}
        {clients.map(client => (
          <ClientsCard
            key={client._id}
            client={client}
            onEdit={handleEditClient}
            onDelete={deleteClient}
          />
        ))}
      </section>
    </div>
  );
};

export default ClientsPage;
