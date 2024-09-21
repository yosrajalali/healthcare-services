import React, { useState } from 'react';
import ServiceList from './components/ServiceList';
import AddServiceForm from './components/AddServiceForm';
import EditServiceForm from './components/EditServiceForm';
import '../src/App.css';

const App = () => {
  const [services, setServices] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const addService = (service) => {
    setServices([...services, service]);
  };

  const editService = (index) => {
    setEditingIndex(index);
    setEditingService(services[index]);
  };

  const updateService = (updatedService) => {
    const updatedServices = services.map((service, index) =>
      index === editingIndex ? updatedService : service
    );
    setServices(updatedServices);
    setEditingIndex(null);
    setEditingService(null);
  };

  const deleteService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  return (
    <div className='container'>
      <h1>Healthcare Services Management</h1>
      <AddServiceForm onAdd={addService} />
      {editingService && (
        <EditServiceForm
          service={editingService}
          onUpdate={updateService}
          onCancel={() => setEditingService(null)}
        />
      )}
      <ServiceList services={services} onEdit={editService} onDelete={deleteService} />
    </div>
  );
};

export default App;
