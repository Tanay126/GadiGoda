// App.js
import React from 'react';
import ProductsTable from './ProductsTable';
import './ProductsTable.css'; // Import the CSS file for the ProductsTable component

function App() {
  return (
    <div className="container">
      <h1>Product Catalog</h1>
      <ProductsTable />
    </div>
  );
}

export default App;
