
import React from 'react';
import PropertyFormComplete from './property-form/PropertyFormComplete';

export default function AdicionarImoveisSection({ onCancel }) {
  // If we had a property ID selected for editing, it would be passed here.
  // For 'Adicionar', we pass null to create a new one.
  return (
    <PropertyFormComplete 
      propertyId={null} 
      onCancel={onCancel} 
      onSuccess={onCancel} // Return to list on success
    />
  );
}
