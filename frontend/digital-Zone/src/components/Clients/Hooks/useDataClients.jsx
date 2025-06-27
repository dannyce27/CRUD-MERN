import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useUserDataClients = () => {
  const ApiClients = "http://localhost:4000/api/clients";


 
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dui, setDui] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorClient, setError] = useState(null);
  const [success, setSuccess] = useState(null);

 
  const cleanData = () => {
    setId("");
    setName("");
    setLastName("");
    setBirthday("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setDui("");
    setIsVerified(false);
    setError(null);
    setSuccess(null);
  };

 
  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(ApiClients);
      if (!res.ok) throw new Error("Error al obtener clientes");
      const data = await res.json();
      setClients(data);
    } catch (err) {
      toast.error("Error al cargar clientes");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !lastName || !birthday || !email || !password || !phoneNumber || !dui) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      const newClient = { name, lastName, birthday, email, password, phoneNumber, dui, isVerified };

      const res = await fetch(ApiClients, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      if (!res.ok) throw new Error("Error al crear cliente");

      toast.success("Cliente creado");
      setSuccess("Cliente creado correctamente");
      cleanData();
      fetchClients();
    } catch (err) {
      toast.error("Error al crear cliente");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar cliente
  const deleteClient = async (id) => {
    try {
      const res = await fetch(`${ApiClients}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar cliente");
      toast.success("Cliente eliminado");
      fetchClients();
    } catch (err) {
      toast.error("Error al eliminar cliente");
    }
  };

  
  const updateClient = (client) => {
    setId(client._id);
    setName(client.name);
    setLastName(client.lastName);
    setBirthday(client.birthday?.split("T")[0] || ""); 
    setEmail(client.email);
    setPassword(client.password);
    setPhoneNumber(client.phoneNumber);
    setDui(client.dui);
    setIsVerified(client.isVerified);
    setError(null);
    setSuccess(null);
  };

  // Guardar edición
 // handleUpdate recibe el cliente actualizado, no un evento
// handleUpdate recibe el cliente actualizado, no un evento
const handleUpdate = async (updatedClient) => {
  try {
    setLoading(true);
    const res = await fetch(`${ApiClients}/${updatedClient._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedClient),
    });

    if (!res.ok) throw new Error("Error al actualizar cliente");

    toast.success("Cliente actualizado");
    setSuccess("Cliente actualizado correctamente");
    cleanData();
  } catch (err) {
    toast.error("Error al actualizar cliente");
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
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    dui,
    setDui,
    isVerified,
    setIsVerified,
    clients,
    loading,
    errorClient,
    success,
    cleanData,
    fetchClients,
    handleSubmit,
    deleteClient,
    updateClient,
    handleUpdate,
  };
};

export default useUserDataClients;
