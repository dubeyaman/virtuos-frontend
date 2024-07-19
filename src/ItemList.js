import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import axios from 'axios';

const ItemList = ({ items, fetchItems }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  const handleEdit = (item) => {
    setIsEditing(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/items/${id}`, { title: editTitle, description: editDescription });
    setIsEditing(null);
    fetchItems();
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Items</Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} divider>
            {isEditing === item.id ? (
              <>
                <TextField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={() => handleUpdate(item.id)}>
                  Save
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setIsEditing(null)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <ListItemText primary={item.title} secondary={item.description} />
                <Button variant="contained" color="primary" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ItemList;
