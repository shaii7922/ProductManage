import  { useState } from 'react';
import styles from './AddProductForm.module.css'; // Import module.css

const AddProductForm = ({ addProduct }) => {
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    setFormData({ name: '', price: '', description: '' });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className={styles.inputField}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={styles.inputField}
        />
        <button type="submit" className={styles.addButton}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
