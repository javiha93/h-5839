
import React, { useState } from 'react';
import { Slide } from '../../types/Message';
import { X } from 'lucide-react';

interface SlideEditModalProps {
  slide: Slide;
  onClose: () => void;
  onSave: (updatedSlide: Slide) => void;
}

const SlideEditModal: React.FC<SlideEditModalProps> = ({ slide, onClose, onSave }) => {
  const [editedSlide, setEditedSlide] = useState<Slide>({...slide});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'id') {
      // Update both id and externalId together
      setEditedSlide({
        ...editedSlide,
        id: value,
        externalId: value
      });
    } else if (name.startsWith('stainProtocol.')) {
      // Handle stain protocol fields
      const field = name.split('.')[1];
      
      if (!editedSlide.stainProtocol) {
        editedSlide.stainProtocol = {};
      }
      
      editedSlide.stainProtocol[field] = value;
      setEditedSlide({...editedSlide});
    } else if (name.startsWith('control.')) {
      // Handle control fields
      const field = name.split('.')[1];
      
      if (!editedSlide.control) {
        editedSlide.control = {};
      }
      
      editedSlide.control[field] = value;
      setEditedSlide({...editedSlide});
    } else if (name === 'isRescanned') {
      // Handle boolean value
      setEditedSlide({
        ...editedSlide,
        isRescanned: value === 'true'
      });
    } else {
      // Handle regular fields
      setEditedSlide({
        ...editedSlide,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedSlide);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Slide</h2>
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
                  value={editedSlide.id || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sequence</label>
                <input
                  type="text"
                  name="sequence"
                  value={editedSlide.sequence || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-2">Stain Protocol</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="stainProtocol.name"
                  value={editedSlide.stainProtocol?.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Number</label>
                <input
                  type="text"
                  name="stainProtocol.number"
                  value={editedSlide.stainProtocol?.number || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Identifier</label>
                <input
                  type="text"
                  name="stainProtocol.identifier"
                  value={editedSlide.stainProtocol?.identifier || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="stainProtocol.description"
                  value={editedSlide.stainProtocol?.description || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-2">Control</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="control.name"
                  value={editedSlide.control?.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="control.description"
                  value={editedSlide.control?.description || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Scoring</label>
                <input
                  type="text"
                  name="control.scoring"
                  value={editedSlide.control?.scoring || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Clone</label>
                <input
                  type="text"
                  name="control.clone"
                  value={editedSlide.control?.clone || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vendor</label>
                <input
                  type="text"
                  name="control.vendor"
                  value={editedSlide.control?.vendor || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-2">Additional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Is Rescanned</label>
                <select
                  name="isRescanned"
                  value={editedSlide.isRescanned ? 'true' : 'false'}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Label Printed</label>
                <input
                  type="text"
                  name="labelPrinted"
                  value={editedSlide.labelPrinted || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Rescan Comment</label>
                <input
                  type="text"
                  name="rescanComment"
                  value={editedSlide.rescanComment || ''}
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

export default SlideEditModal;
