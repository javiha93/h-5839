
import React from 'react';
import { MessageType } from '../../types/MessageType';
import { Specimen, Slide } from '../../types/Message';

interface MessageOptionsProps {
  selectedHost: string;
  selectedType: string;
  selectedStatus: string;
  messageTypes: MessageType[];
  hosts: { id: string; name: string }[];
  statusOptions: { id: string; name: string }[];
  handleHostChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  toggleSpecimenSelectorModal: () => void;
  toggleSlideSelectorModal: () => void;
  showSpecimenSelector: boolean;
  showSlideSelector: boolean;
  showStatusSelector: boolean;
  message: any;
  selectedSpecimen: Specimen | null;
  selectedSlide: Slide | null;
}

const MessageOptions: React.FC<MessageOptionsProps> = ({
  selectedHost,
  selectedType,
  selectedStatus,
  messageTypes,
  hosts,
  statusOptions,
  handleHostChange,
  handleTypeChange,
  handleStatusChange,
  toggleSpecimenSelectorModal,
  toggleSlideSelectorModal,
  showSpecimenSelector,
  showSlideSelector,
  showStatusSelector,
  message,
  selectedSpecimen,
  selectedSlide
}) => {
  return (
    <>
      <div className="mb-6">
        <label htmlFor="hostType" className="block text-sm font-medium text-gray-700 mb-2">
          Host
        </label>
        <select
          id="hostType"
          value={selectedHost}
          onChange={handleHostChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
        >
          <option value="">Select a host</option>
          {hosts.map((host) => (
            <option key={host.id} value={host.id}>
              {host.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <label htmlFor="messageType" className="block text-sm font-medium text-gray-700 mb-2">
          Message Type
        </label>
        <div className="flex space-x-2">
          <select
            id="messageType"
            value={selectedType}
            onChange={handleTypeChange}
            disabled={!selectedHost}
            className={`flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all ${!selectedHost ? 'cursor-not-allowed bg-gray-100' : ''}`}
          >
            <option value="">Select type</option>
            {messageTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          {showStatusSelector && (
            <select
              id="statusSelector"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="w-1/3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
            >
              {statusOptions.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          )}

          {showSpecimenSelector && (
            <button
              onClick={toggleSpecimenSelectorModal}
              disabled={!message}
              className={`px-4 py-2 rounded-lg flex items-center space-x-1 ${
                !message ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600'
              }`}
            >
              <span>Select Specimen</span>
              {selectedSpecimen && <span className="ml-1 font-bold">✓</span>}
            </button>
          )}

          {showSlideSelector && (
            <button
              onClick={toggleSlideSelectorModal}
              disabled={!message}
              className={`px-4 py-2 rounded-lg flex items-center space-x-1 ${
                !message ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <span>Select Slide</span>
              {selectedSlide && <span className="ml-1 font-bold">✓</span>}
            </button>
          )}
        </div>
        {!selectedHost && (
          <p className="mt-2 text-sm text-amber-600">
            First select a host
          </p>
        )}
        {showSpecimenSelector && selectedSpecimen && (
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              Specimen selected: <span className="font-semibold">{selectedSpecimen.id}</span>
            </p>
          </div>
        )}
        {showSlideSelector && selectedSlide && (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Slide selected: <span className="font-semibold">{selectedSlide.id}</span>
            </p>
          </div>
        )}
        {showStatusSelector && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              Status selected: <span className="font-semibold">{selectedStatus}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MessageOptions;
