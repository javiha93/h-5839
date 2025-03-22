
import React from 'react';
import { Message } from '../types/Message';
import { ListTree } from 'lucide-react';

interface HierarchyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
}

const HierarchyEditModal: React.FC<HierarchyEditModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen || !message) return null;

  // Get the first order
  const order = message.patient?.orders?.orderList?.[0];
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Hierarchy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <div className="font-semibold text-lg flex items-center">
            <ListTree className="mr-2" size={20} />
            Order: {order.sampleId || 'No ID'}
          </div>
          
          {order.specimens?.specimenList?.map((specimen, specimenIndex) => (
            <div key={`specimen-${specimenIndex}`} className="ml-6 mt-3 border-l-2 pl-4 border-gray-300">
              <div className="font-medium">
                Specimen: {specimen.id || 'No ID'}
              </div>
              
              {specimen.blocks?.blockList?.map((block, blockIndex) => (
                <div key={`block-${blockIndex}`} className="ml-6 mt-2 border-l-2 pl-4 border-gray-200">
                  <div className="font-medium text-gray-700">
                    Block:{block.id || 'No ID'}
                  </div>
                  
                  {block.slides?.slideList?.map((slide, slideIndex) => (
                    <div key={`slide-${slideIndex}`} className="ml-6 mt-1 border-l-2 pl-4 border-gray-100">
                      <div className="text-gray-600">
                        Slide: {slide.id || 'No ID'}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HierarchyEditModal;
