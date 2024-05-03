import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Select, MenuItem, TextField, Button } from '@mui/material';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.group(data);
      setProducts(data['products']);
      setFilteredProducts(data['products']);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      filteredProducts.map(product => `${product.title},${product.description[1]},${product.price},${product.images[1]}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.title && product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1); // Reset current page when search query changes
  }, [searchQuery]);

  return (
    <div>
      <TextField
        className="search-input"
        label="Search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
             
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell> Rating</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.id}</TableCell>
                <TableCell><img width={250} src={product.images[1]} /></TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>${product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        className="pagination"
        count={Math.ceil(filteredProducts.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
      />

      <Select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(e.target.value)}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>

      <Button onClick={handleDownloadCSV}>Download CSV</Button>

      {loading && <p>Loading...</p>}

      {error && <p className="error">Error: {error}</p>}
    </div>
  );
};

export default ProductsTable;
