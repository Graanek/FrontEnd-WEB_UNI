import React from 'react';
import { useParams } from 'react-router-dom';

function AddEditBook() {
  const { id } = useParams();
  const isEditing = Boolean(id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? 'Edit Book' : 'Add New Book'}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">Form will be implemented here...</p>
      </div>
    </div>
  );
}

export default AddEditBook;