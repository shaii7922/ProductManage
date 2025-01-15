import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

const App = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      if (response.data.success && Array.isArray(response.data.newOne)) {
        setProducts(response.data.newOne); // Update state with the array
      } else {
        console.error('API did not return products as an array:', response.data);
        setProducts([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Handle errors gracefully
    }
  };

  // Delete a product by ID
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id)); // Update state
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Add a new product
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:3000/api/products', newProduct);
      if (response.data.success) {
        setProducts([...products, response.data.newOne]); // Append new product to state
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Load products on component mount
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Product Management App</h1>
      <AddProductForm addProduct={addProduct} />
      <ProductList products={products} deleteProduct={deleteProduct} />
    </div>
  );
};

export default App;
