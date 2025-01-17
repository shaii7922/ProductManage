import  { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

const App = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array

  // Fetch products from the backend API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      if (response.data.success && Array.isArray(response.data.newOne)) {
        setProducts(response.data.newOne); // Update state with the array
      } else {
        console.error('API did not return products as an array:', response.data);
        setProducts([]); 
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Handle errors 
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
        setProducts([...products, response.data.newOne]); 
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw error; 
      } else {
        console.error('Error adding product:', error);
      }
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
