import React, { useState, useEffect } from 'react';
import { MessageType, Patient, Physician, Pathologist, Technician } from '../types/MessageType';
import { Message, Specimen, Slide } from '../types/Message';
import PatientEditModal from './PatientEditModal';
import PhysicianEditModal from './PhysicianEditModal';
import PathologistEditModal from './PathologistEditModal';
import HierarchyEditModal from './HierarchyEditModal';
import TechnicianEditModal from './TechnicianEditModal';
import SpecimenSelectorModal from './messageGenerator/SpecimenSelectorModal';
import SlideSelectorModal from './messageGenerator/SlideSelectorModal';
import { ListTree } from 'lucide-react';

const MessageGenerator: React.FC = () => {
  const [message, setMessage] = useState<Message>(null);
  const [sampleId, setSampleId] = useState<string>('');
  const [selectedHost, setSelectedHost] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [messageCopied, setMessageCopied] = useState<boolean>(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState<boolean>(false);
  const [isPhysicianModalOpen, setIsPhysicianModalOpen] = useState<boolean>(false);
  const [isPathologistModalOpen, setIsPathologistModalOpen] = useState<boolean>(false);
  const [isHierarchyModalOpen, setIsHierarchyModalOpen] = useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [physicianInfo, setPhysicianInfo] = useState<Physician | null>(null);
  const [pathologistInfo, setPathologistInfo] = useState<Pathologist | null>(null);
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState<boolean>(false);
  const [technicianInfo, setTechnicianInfo] = useState<Technician | null>(null);
  const [isSpecimenSelectorModalOpen, setIsSpecimenSelectorModalOpen] = useState<boolean>(false);
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);
  const [isSlideSelectorModalOpen, setIsSlideSelectorModalOpen] = useState<boolean>(false);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);

  const hosts = [
    { id: 'LIS', name: 'LIS' },
    { id: 'VTG', name: 'VTG' },
    { id: 'VANTAGE_WS', name: 'VANTAGE WS' }
  ];

  const [messageTypes, setMessageTypes] = useState<MessageType[]>([]);

  const hostMessageTypes = {
    LIS: [
      { id: 'OML21', name: 'OML21' },
      { id: 'ADTA28', name: 'ADTA28' },
      { id: 'ADTA08', name: 'ADTA08' },
      { id: 'CASE_UPDATE', name: 'CASE_UPDATE' },
      { id: 'DELETE_CASE', name: 'DELETE_CASE' },
      { id: 'DELETE_SPECIMEN', name: 'DELETE_SPECIMEN' },
      { id: 'DELETE_SLIDE', name: 'DELETE_SLIDE' }
    ],
    VTG: [
      { id: 'OEWF', name: 'OEWF' },
      { id: 'ADDITION', name: 'ADDITION' },
      { id: 'SPECIMEN_UPDATE', name: 'SPECIMEN_UPDATE' },
      { id: 'BLOCK_UPDATE', name: 'BLOCK_UPDATE' },
      { id: 'SLIDE_UPDATE', name: 'SLIDE_UPDATE' }
    ],
    VANTAGE_WS: [
      { id: 'CREATE_CASE', name: 'CREATE_CASE' },
      { id: 'UPDATE_CASE', name: 'UPDATE_CASE' }
    ]
  };

  useEffect(() => {
    if (selectedHost) {
      setMessageTypes(hostMessageTypes[selectedHost as keyof typeof hostMessageTypes] || []);
      setSelectedType('');
      setSelectedSpecimen(null);
      setSelectedSlide(null);
    } else {
      setMessageTypes([]);
      setSelectedSpecimen(null);
      setSelectedSlide(null);
    }
  }, [selectedHost]);

  useEffect(() => {
    setSelectedSpecimen(null);
    setSelectedSlide(null);
  }, [selectedType]);

  const fetchMessageData = async (sampleIdValue: string) => {
    if (!sampleIdValue) {
      setIsFetchingData(false);
      return;
    }

    setIsFetchingData(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8085/api/messages/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sampleId: sampleIdValue }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data);
      setPatientInfo(data.patient || null);
      setPhysicianInfo(data.physician || null);

      const pathologist = data.patient?.orders?.orderList?.[0]?.pathologist || null;
      setPathologistInfo(pathologist);

      const technician = data.patient?.orders?.orderList?.[0]?.technician || null;
      setTechnicianInfo(technician);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error al obtener los datos. Por favor intente nuevamente.');
    } finally {
      setIsFetchingData(false);
    }
  };

  const handleSampleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSampleId = e.target.value;
    setSampleId(newSampleId);

    const timeoutId = setTimeout(() => {
      if (newSampleId.trim()) {
        fetchMessageData(newSampleId);
      } else {
        setMessage(null);
        setPatientInfo(null);
        setPhysicianInfo(null);
        setPathologistInfo(null);
        setTechnicianInfo(null);
        setIsFetchingData(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleHostChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHost(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handlePatientInfoSave = (updatedInfo: Patient) => {
    setPatientInfo(updatedInfo);

    if (message) {
      setMessage(prevMessage => ({
        ...prevMessage,
        patient: updatedInfo
      }));
    }
  };

  const handlePhysicianInfoSave = (updatedInfo: Physician) => {
    setPhysicianInfo(updatedInfo);

    if (message) {
      setMessage(prevMessage => ({
        ...prevMessage,
        physician: updatedInfo
      }));
    }
  };

  const handlePathologistInfoSave = (updatedInfo: Pathologist) => {
    setPathologistInfo(updatedInfo);

    if (message && message.patient && message.patient.orders && message.patient.orders.orderList) {
      const updatedMessage = { ...message };
      updatedMessage.patient.orders.orderList = updatedMessage.patient.orders.orderList.map(order => ({
        ...order,
        pathologist: updatedInfo,
      }));
      setMessage(updatedMessage);
    }
  };

  const handleTechnicianInfoSave = (updatedInfo: Technician) => {
    setTechnicianInfo(updatedInfo);

    if (message && message.patient && message.patient.orders && message.patient.orders.orderList) {
      const updatedMessage = { ...message };
      updatedMessage.patient.orders.orderList = updatedMessage.patient.orders.orderList.map(order => ({
        ...order,
        technician: updatedInfo,
      }));
      setMessage(updatedMessage);
    }
  };

  const handleSpecimenSelect = (specimen: Specimen) => {
    setSelectedSpecimen(specimen);
  };

  const handleSlideSelect = (slide: Slide) => {
    setSelectedSlide(slide);
  };

  const togglePatientModal = () => {
    setIsPatientModalOpen(!isPatientModalOpen);
  };

  const togglePhysicianModal = () => {
    setIsPhysicianModalOpen(!isPhysicianModalOpen);
  };

  const togglePathologistModal = () => {
    setIsPathologistModalOpen(!isPathologistModalOpen);
  };

  const toggleHierarchyModal = () => {
    setIsHierarchyModalOpen(!isHierarchyModalOpen);
  };

  const toggleTechnicianModal = () => {
    setIsTechnicianModalOpen(!isTechnicianModalOpen);
  };

  const toggleSpecimenSelectorModal = () => {
    console.log("Toggling specimen selector modal", { current: isSpecimenSelectorModalOpen });
    setIsSpecimenSelectorModalOpen(!isSpecimenSelectorModalOpen);
  };

  const toggleSlideSelectorModal = () => {
    console.log("Toggling slide selector modal", { current: isSlideSelectorModalOpen });
    setIsSlideSelectorModalOpen(!isSlideSelectorModalOpen);
  };

  const generateMessage = async () => {
    if (!sampleId || !selectedType) {
      setGeneratedMessage('Por favor, completa todos los campos.');
      return;
    }

    if (selectedHost === 'LIS' && selectedType === 'DELETE_SPECIMEN' && !selectedSpecimen) {
      setGeneratedMessage('Por favor, selecciona un specimen para eliminar.');
      return;
    }

    if (selectedHost === 'LIS' && selectedType === 'DELETE_SLIDE' && !selectedSlide) {
      setGeneratedMessage('Por favor, selecciona un slide para eliminar.');
      return;
    }

    setIsGeneratingMessage(true);
    setError(null);
    try {
      if (!message) {
        throw new Error('No hay datos iniciales disponibles.');
      }

      let formattedMessage = '';

      if (selectedHost === 'LIS' && selectedType === 'DELETE_SPECIMEN' && selectedSpecimen) {
        formattedMessage = await convertSpecimenMessage(message, selectedType, selectedSpecimen);
      } else if (selectedHost === 'LIS' && selectedType === 'DELETE_SLIDE' && selectedSlide) {
        formattedMessage = await convertSlideMessage(message, selectedType, selectedSlide);
      } else {
        formattedMessage = await convertMessage(message, selectedType);
      }

      setGeneratedMessage(formattedMessage);
    } catch (err) {
      console.error('Error generating message:', err);
      setError('Error al generar mensaje. Por favor intente nuevamente.');
      setGeneratedMessage('');
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  const convertMessage = async (message: Message, messageType: string) => {
    try {
      const response = await fetch('http://localhost:8085/api/messages/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          messageType: messageType
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.text();
      return data;
    } catch (err) {
      console.error('Error converting message:', err);
      throw err;
    }
  };

  const convertSpecimenMessage = async (message: Message, messageType: string, specimen: Specimen) => {
    try {
      const response = await fetch('http://localhost:8085/api/messages/convert-specimen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          messageType: messageType,
          specimen: specimen
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.text();
      return data;
    } catch (err) {
      console.error('Error converting specimen message:', err);
      throw err;
    }
  };

  const convertSlideMessage = async (message: Message, messageType: string, slide: Slide) => {
    try {
      const response = await fetch('http://localhost:8085/api/messages/convert-slide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          messageType: messageType,
          slide: slide
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.text();
      return data;
    } catch (err) {
      console.error('Error converting slide message:', err);
      throw err;
    }
  };

  const copyToClipboard = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage)
        .then(() => {
          setMessageCopied(true);
          setTimeout(() => setMessageCopied(false), 2000);
        })
        .catch(err => {
          console.error('Error al copiar: ', err);
        });
    }
  };

  const showSpecimenSelector = selectedHost === 'LIS' && selectedType === 'DELETE_SPECIMEN';
  const showSlideSelector = selectedHost === 'LIS' && selectedType === 'DELETE_SLIDE';

  return (
    <div className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Generador de Mensajes HL7</h1>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="sampleId" className="block text-sm font-medium text-gray-700">
            Sample ID
          </label>
          <div className="flex space-x-2">
            <button
              onClick={togglePatientModal}
              disabled={!sampleId || isFetchingData}
              className={`inline-flex items-center px-3 py-1 ${!sampleId || isFetchingData ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} rounded-md transition-colors text-sm`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Patient
            </button>

            <button
              onClick={togglePhysicianModal}
              disabled={!sampleId || isFetchingData}
              className={`inline-flex items-center px-3 py-1 ${!sampleId || isFetchingData ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'} rounded-md transition-colors text-sm`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Physician
            </button>

            <button
              onClick={togglePathologistModal}
              disabled={!sampleId || isFetchingData}
              className={`inline-flex items-center px-3 py-1 ${!sampleId || isFetchingData ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'} rounded-md transition-colors text-sm`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Pathologist
            </button>

            <button
                onClick={toggleTechnicianModal}
                disabled={!sampleId || isFetchingData}
                className={`inline-flex items-center px-3 py-1 ${!sampleId || isFetchingData ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'} rounded-md transition-colors text-sm`}
             >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
                Edit Technician
            </button>

            <button
              onClick={toggleHierarchyModal}
              disabled={!sampleId || isFetchingData}
              className={`inline-flex items-center px-3 py-1 ${!sampleId || isFetchingData ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'} rounded-md transition-colors text-sm`}
            >
              <ListTree className="h-4 w-4 mr-1" />
              Edit Hierarchy
            </button>
          </div>
        </div>
        <input
          type="text"
          id="sampleId"
          value={sampleId}
          onChange={handleSampleIdChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          placeholder="Insert Sample ID"
        />
        {isFetchingData && (
          <div className="mt-2 flex items-center text-sm text-blue-600">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading data...
          </div>
        )}
      </div>

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
      </div>

      <button
        onClick={generateMessage}
        disabled={
          isGeneratingMessage || 
          !selectedHost || 
          !selectedType || 
          isFetchingData || 
          (showSpecimenSelector && !selectedSpecimen) ||
          (showSlideSelector && !selectedSlide)
        }
        className={`w-full py-3 px-6 rounded-lg text-lg font-medium transition-colors ${
          isGeneratingMessage || 
          !selectedHost || 
          !selectedType || 
          isFetchingData || 
          (showSpecimenSelector && !selectedSpecimen) ||
          (showSlideSelector && !selectedSlide)
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        {isGeneratingMessage ? 'Generating...' : 'Generate Message'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {generatedMessage && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-gray-700">Mensaje Generado:</h2>
            <button
              onClick={copyToClipboard}
              className="text-indigo-600 hover:text-indigo-800 flex items-center px-3 py-1 rounded border border-indigo-300 hover:border-indigo-500 transition-colors"
            >
              {messageCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="relative">
            <pre className="bg-gray-50 p-6 rounded-lg overflow-auto max-h-[400px] text-sm whitespace-pre-wrap shadow-inner border border-gray-200">
              {generatedMessage}
            </pre>
          </div>
        </div>
      )}

      <PatientEditModal
        isOpen={isPatientModalOpen}
        onClose={togglePatientModal}
        patientInfo={patientInfo}
        onSave={handlePatientInfoSave}
      />

      <PhysicianEditModal
        isOpen={isPhysicianModalOpen}
        onClose={togglePhysicianModal}
        physicianInfo={physicianInfo}
        onSave={handlePhysicianInfoSave}
      />

      <PathologistEditModal
        isOpen={isPathologistModalOpen}
        onClose={togglePathologistModal}
        pathologistInfo={pathologistInfo}
        onSave={handlePathologistInfoSave}
      />

      <HierarchyEditModal
        isOpen={isHierarchyModalOpen}
        onClose={toggleHierarchyModal}
        message={message}
      />

      <TechnicianEditModal
        isOpen={isTechnicianModalOpen}
        onClose={toggleTechnicianModal}
        technicianInfo={technicianInfo}
        onSave={handleTechnicianInfoSave}
      />

      <SpecimenSelectorModal
        isOpen={isSpecimenSelectorModalOpen}
        onClose={toggleSpecimenSelectorModal}
        message={message}
        onSelectSpecimen={handleSpecimenSelect}
      />

      <SlideSelectorModal
        isOpen={isSlideSelectorModalOpen}
        onClose={toggleSlideSelectorModal}
        message={message}
        onSelectSlide={handleSlideSelect}
      />
    </div>
  );
};

export default MessageGenerator;
