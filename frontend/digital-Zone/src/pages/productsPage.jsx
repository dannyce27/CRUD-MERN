import React, { useEffect, useState } from "react";
import useDataProducts from "../components/Products/Hooks/useDataProducts.jsx";
import ProductCard from "../components/Products/productsCard.jsx";
import "../styles/productsPage.css";

const ProductsPage = () => {
  const {
    products,
    fetchProducts,
    deleteProduct,
    handleUpdate,
    handleSubmit,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    stock,
    setStock,
    loading,
    errorProduct,
    cleanData,
  } = useDataProducts();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = async (updatedProduct) => {
    await handleUpdate(updatedProduct);
    fetchProducts();
  };

  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Gestión de Productos</h1>
        <p>Aquí puedes ver, editar o eliminar productos.</p>

        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cerrar formulario" : "Agregar producto"}
        </button>

        {showForm && (
          <form
            className="add-product-form"
            onSubmit={async (e) => {
              await handleSubmit(e);
              setShowForm(false);
              cleanData();
              fetchProducts();
            }}
          >
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={price}
              min={0}
              step="0.01"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              min={1}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            <button className="save-btn" type="submit">
              Guardar
            </button>
          </form>
        )}
      </header>

      {loading && <p>Cargando productos...</p>}
      {errorProduct && <p className="error-message">{errorProduct}</p>}

      <section className="products-grid">
        {products.length === 0 ? (
          <p className="no-products">No hay productos disponibles.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={deleteProduct}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default ProductsPage;
