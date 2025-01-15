import React from 'react';
import styles from './ProductList.module.css'; // Import module.css

const ProductList = ({ products, deleteProduct }) => {
  return (
    <div className={styles.listContainer}>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} className={styles.productItem}>
            <span className={styles.productDetails}>
              <strong>{product.name}</strong>: ${product.price} - {product.description}
            </span>
            <button
              onClick={() => deleteProduct(product._id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
