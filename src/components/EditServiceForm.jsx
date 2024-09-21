import React, { useState } from 'react';

const EditServiceForm = ({ service, onUpdate, onCancel }) => {
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description && price >= 0) {
      onUpdate({ name, description, price });
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setPrice(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h2>Edit Service</h2>
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
      <button type="submit">Update Service</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditServiceForm;
