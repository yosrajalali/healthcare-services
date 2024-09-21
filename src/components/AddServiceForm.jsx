import React, { useState } from 'react';

const AddServiceForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description && price >= 0) {
      onAdd({ name, description, price });
      setName('');
      setDescription('');
      setPrice('');
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setPrice(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Service</h2>
      <input
        type="text"
        placeholder="Service Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={handlePriceChange}
        min="0"
        required
      />
      <button type="submit">Add Service</button>
    </form>
  );
};

export default AddServiceForm;
