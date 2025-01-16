import { useState } from 'react';
import styles from './AddProductForm.module.css'; // Import module.css

const AddProductForm = ({ addProduct }) => {
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct(formData); // Call the addProduct function passed as a prop
      setFormData({ name: '', price: '', description: '' });
      setErrors({}); // Clear errors on successful submission
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Update errors state with backend validation messages
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.price && <p className={styles.errorMessage}>{errors.price}</p>}
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <button type="submit" className={styles.addButton}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
