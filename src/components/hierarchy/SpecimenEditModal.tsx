
import React, { useState } from 'react';
import { Specimen } from '../../types/Message';
import { X } from 'lucide-react';

interface SpecimenEditModalProps {
  specimen: Specimen;
  onClose: () => void;
  onSave: (updatedSpecimen: Specimen) => void;
}

const SpecimenEditModal: React.FC<SpecimenEditModalProps> = ({ specimen, onClose, onSave }) => {
  const [editedSpecimen, setEditedSpecimen] = useState<Specimen>({...specimen});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'id') {
      // Update both id and externalId together
      setEditedSpecimen({
        ...editedSpecimen,
        id: value,
        externalId: value
      });
    } else if (name.startsWith('procedure.')) {
      // Handle nested procedure fields
      const field = name.split('.')[1];
      const subfield = name.split('.')[2];
      
      if (!editedSpecimen.procedure) {
        editedSpecimen.procedure = {};
      }
      
      if (subfield) {
        // For nested properties like tissue.type
        if (!editedSpecimen.procedure[field]) {
          editedSpecimen.procedure[field] = {};
        }
        editedSpecimen.procedure[field][subfield] = value;
      } else {
        // For direct properties
        editedSpecimen.procedure[field] = value;
      }
      
      setEditedSpecimen({...editedSpecimen});
    } else {
      // Handle regular fields
      setEditedSpecimen({
        ...editedSpecimen,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedSpecimen);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Specimen</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <input
                  type="text"
                  name="id"
                  value={editedSpecimen.id || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sequence</label>
                <input
                  type="text"
                  name="sequence"
                  value={editedSpecimen.sequence || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-2">Tissue Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                  type="text"
                  name="procedure.tissue.type"
                  value={editedSpecimen.procedure?.tissue?.type || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="procedure.tissue.description"
                  value={editedSpecimen.procedure?.tissue?.description || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtype</label>
                <input
                  type="text"
                  name="procedure.tissue.subtype"
                  value={editedSpecimen.procedure?.tissue?.subtype || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtype Description</label>
                <input
                  type="text"
                  name="procedure.tissue.subtypeDescription"
                  value={editedSpecimen.procedure?.tissue?.subtypeDescription || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-2">Surgical Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="procedure.surgical.name"
                  value={editedSpecimen.procedure?.surgical?.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="procedure.surgical.description"
                  value={editedSpecimen.procedure?.surgical?.description || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-2">Anatomic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Site</label>
                <input
                  type="text"
                  name="procedure.anatomic.site"
                  value={editedSpecimen.procedure?.anatomic?.site || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="procedure.anatomic.description"
                  value={editedSpecimen.procedure?.anatomic?.description || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecimenEditModal;
