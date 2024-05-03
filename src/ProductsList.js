import React from 'react';

const ProductsList = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
