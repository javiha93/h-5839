import React, { useState } from 'react';
import { Message } from '../types/Message';
import { ListTree, ChevronDown, ChevronRight, Plus } from 'lucide-react';

interface HierarchyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
}

const HierarchyEditModal: React.FC<HierarchyEditModalProps> = ({ isOpen, onClose, message }) => {
  const [expandedSpecimens, setExpandedSpecimens] = useState<Record<string, boolean>>({});
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({});
  const [expandedSlides, setExpandedSlides] = useState<Record<string, boolean>>({});

  if (!isOpen || !message) return null;

  // Get the first order
  const order = message.patient?.orders?.orderList?.[0];
  if (!order) return null;

  const toggleSpecimen = (specimenIndex: number) => {
    setExpandedSpecimens({
      ...expandedSpecimens,
      [specimenIndex]: !expandedSpecimens[specimenIndex]
    });
  };

  const toggleBlock = (specimenIndex: number, blockIndex: number) => {
    const key = `${specimenIndex}-${blockIndex}`;
    setExpandedBlocks({
      ...expandedBlocks,
      [key]: !expandedBlocks[key]
    });
  };

  const toggleSlide = (specimenIndex: number, blockIndex: number, slideIndex: number) => {
    const key = `${specimenIndex}-${blockIndex}-${slideIndex}`;
    setExpandedSlides({
      ...expandedSlides,
      [key]: !expandedSlides[key]
    });
  };

  const getNextSequence = (currentSequence: string) => {
    // If the sequence is a number, increment it
    if (/^\d+$/.test(currentSequence)) {
      return String(parseInt(currentSequence) + 1);
    }
    // If the sequence is a letter, get the next letter
    else if (/^[A-Za-z]$/.test(currentSequence)) {
      const code = currentSequence.charCodeAt(0);
      return String.fromCharCode(code + 1);
    }
    // Otherwise return the same value with a suffix
    return `${currentSequence}-new`;
  };

  const addNewSpecimen = () => {
    if (!order.specimens?.specimenList) return;
    
    const lastSpecimen = order.specimens.specimenList[order.specimens.specimenList.length - 1];
    const newSequence = getNextSequence(lastSpecimen.sequence);
    const newId = lastSpecimen.id.replace(lastSpecimen.sequence, newSequence);
    
    const newSpecimen = {
      ...JSON.parse(JSON.stringify(lastSpecimen)),
      id: newId,
      sequence: newSequence,
      externalId: newId,
      blocks: {
        blockList: []
      }
    };
    
    order.specimens.specimenList.push(newSpecimen);
    // Force a re-render
    setExpandedSpecimens({ ...expandedSpecimens });
  };

  const addNewBlock = (specimenIndex: number) => {
    const specimen = order.specimens?.specimenList?.[specimenIndex];
    if (!specimen || !specimen.blocks?.blockList) return;
    
    const lastBlock = specimen.blocks.blockList[specimen.blocks.blockList.length - 1];
    const newSequence = getNextSequence(lastBlock.sequence);
    const newId = lastBlock.id.replace(lastBlock.sequence, newSequence);
    
    const newBlock = {
      ...JSON.parse(JSON.stringify(lastBlock)),
      id: newId,
      sequence: newSequence,
      externalId: newId,
      slides: {
        slideList: []
      }
    };
    
    specimen.blocks.blockList.push(newBlock);
    // Force a re-render
    setExpandedBlocks({ ...expandedBlocks });
  };

  const addNewSlide = (specimenIndex: number, blockIndex: number) => {
    const specimen = order.specimens?.specimenList?.[specimenIndex];
    const block = specimen?.blocks?.blockList?.[blockIndex];
    if (!block || !block.slides?.slideList) return;
    
    const lastSlide = block.slides.slideList[block.slides.slideList.length - 1];
    const newSequence = getNextSequence(lastSlide.sequence);
    const newId = lastSlide.id.replace(lastSlide.sequence, newSequence);
    
    const newSlide = {
      ...JSON.parse(JSON.stringify(lastSlide)),
      id: newId,
      sequence: newSequence,
      externalId: newId
    };
    
    block.slides.slideList.push(newSlide);
    // Force a re-render
    setExpandedSlides({ ...expandedSlides });
  };

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
              <div 
                className="font-medium flex items-center cursor-pointer"
                onClick={() => toggleSpecimen(specimenIndex)}
              >
                {expandedSpecimens[specimenIndex] ? 
                  <ChevronDown className="mr-1 text-gray-600" size={16} /> : 
                  <ChevronRight className="mr-1 text-gray-600" size={16} />
                }
                Specimen: {specimen.id || 'No ID'}
              </div>
              
              {expandedSpecimens[specimenIndex] && (
                <>
                  {specimen.blocks?.blockList?.map((block, blockIndex) => (
                    <div key={`block-${blockIndex}`} className="ml-6 mt-2 border-l-2 pl-4 border-gray-200">
                      <div 
                        className="font-medium text-gray-700 flex items-center cursor-pointer"
                        onClick={() => toggleBlock(specimenIndex, blockIndex)}
                      >
                        {expandedBlocks[`${specimenIndex}-${blockIndex}`] ? 
                          <ChevronDown className="mr-1 text-gray-500" size={16} /> : 
                          <ChevronRight className="mr-1 text-gray-500" size={16} />
                        }
                        Block: {block.id || 'No ID'}
                      </div>
                      
                      {expandedBlocks[`${specimenIndex}-${blockIndex}`] && (
                        <>
                          {block.slides?.slideList?.map((slide, slideIndex) => (
                            <div key={`slide-${slideIndex}`} className="ml-6 mt-1 border-l-2 pl-4 border-gray-100">
                              <div className="text-gray-600">
                                Slide: {slide.id || 'No ID'}
                              </div>
                            </div>
                          ))}
                          
                          {/* Add new slide button */}
                          {block.slides?.slideList?.length > 0 && (
                            <div className="ml-6 mt-2">
                              <button
                                onClick={() => addNewSlide(specimenIndex, blockIndex)}
                                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                              >
                                <Plus size={14} className="mr-1" />
                                Add Slide
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  
                  {/* Add new block button */}
                  {specimen.blocks?.blockList?.length > 0 && (
                    <div className="ml-6 mt-3">
                      <button
                        onClick={() => addNewBlock(specimenIndex)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Plus size={14} className="mr-1" />
                        Add Block
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          
          {/* Add new specimen button */}
          {order.specimens?.specimenList?.length > 0 && (
            <div className="ml-6 mt-4">
              <button
                onClick={addNewSpecimen}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <Plus size={14} className="mr-1" />
                Add Specimen
              </button>
            </div>
          )}
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
