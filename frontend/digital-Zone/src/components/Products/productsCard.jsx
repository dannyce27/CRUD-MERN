import React, { useState } from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ ...product, ...formData });
    setIsEditing(false);
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} required />
          <input name="description" value={formData.description} onChange={handleChange} required />
          <input name="price" type="number" value={formData.price} onChange={handleChange} required />
          <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
          <button type="submit" className="save-btn">Guardar</button>
          <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <div className="card-actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="delete-btn" onClick={() => onDelete(product._id)}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
