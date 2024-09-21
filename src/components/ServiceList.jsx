import React, { useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Are you sure?</h3>
        <p>Do you really want to delete this service? This process cannot be undone.</p>
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn btn-confirm" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

const ServiceList = ({ services, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5; 

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  // Pagination controls
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const openModal = (index) => {
    setServiceToDelete(index);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (serviceToDelete !== null) {
      onDelete(serviceToDelete);
      setIsModalOpen(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2>Service List</h2>
      <ul className="service-list">
        {currentServices.map((service, index) => (
          <li key={indexOfFirstService + index} className="service-item">
            <div className="service-info">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>Price: ${service.price}</p>
            </div>
            <div className="service-actions">
              <button className="btn btn-edit" onClick={() => onEdit(indexOfFirstService + index)}>
                <MdEdit /> Edit
              </button>
              <button className="btn btn-delete" onClick={() => openModal(indexOfFirstService + index)}>
                <MdDelete /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

   
      {services.length > servicesPerPage && (
        <div className="pagination-controls">
          <button 
            className="btn btn-pagination" 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            className="btn btn-pagination" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal 
        show={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ServiceList;
