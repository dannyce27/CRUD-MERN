import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataProducts = () => {
  const API = "http://localhost:4000/api/products";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorProduct, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form fields
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const cleanData = () => {
    setId("");
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setError(null);
    setSuccess(null);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error("Error al cargar productos");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !stock) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      const newProduct = { name, description, price, stock };

      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Error al crear producto");

      toast.success("Producto creado");
      setSuccess("Producto creado correctamente");
      cleanData();
      fetchProducts();
    } catch (err) {
      toast.error("Error al crear producto");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar producto");
      toast.success("Producto eliminado");
      fetchProducts();
    } catch (err) {
      toast.error("Error al eliminar producto");
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/${updatedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) throw new Error("Error al actualizar producto");

      toast.success("Producto actualizado");
      setSuccess("Producto actualizado correctamente");
      cleanData();
      fetchProducts();
    } catch (err) {
      toast.error("Error al actualizar producto");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    errorProduct,
    success,
    fetchProducts,
    handleSubmit,
    deleteProduct,
    handleUpdate,
    name, setName,
    description, setDescription,
    price, setPrice,
    stock, setStock,
    cleanData,
  };
};

export default useDataProducts;
