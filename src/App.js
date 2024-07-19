import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

const App = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:5000/api/items');
    setItems(response.data.items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{padding:'10px', margin:'10px'}}>
        Blog Items
      </Typography>
      <ItemForm fetchItems={fetchItems} />
      <ItemList items={items} fetchItems={fetchItems} />
    </Container>
  );
};

export default App;
