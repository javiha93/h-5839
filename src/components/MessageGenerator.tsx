
import React, { useState } from 'react';
import { MessageType, Patient, Physician, Pathologist } from '../types/MessageType';
import { Message } from '../types/Message';
import PatientEditModal from './PatientEditModal';
import PhysicianEditModal from './PhysicianEditModal';
import PathologistEditModal from './PathologistEditModal';
import HierarchyEditModal from './HierarchyEditModal';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [physicianInfo, setPhysicianInfo] = useState<Physician | null>(null);
  const [pathologistInfo, setPathologistInfo] = useState<Pathologist | null>(null);
  
  // Available hosts
  const hosts = [
    { id: 'LIS', name: 'LIS' },
    { id: 'VTG', name: 'VTG' },
    { id: 'VANTAGE_WS', name: 'VANTAGE WS' }
  ];
  
  // Message types organized by host
  const [messageTypes, setMessageTypes] = useState<MessageType[]>([]);
  
  // Define message types for each host
  const hostMessageTypes = {
    LIS: [
      { id: 'OML21', name: 'OML21' },
      { id: 'ADTA28', name: 'ADTA28' },
      { id: 'ADTA08', name: 'ADTA08' },
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
    } else {
      setMessageTypes([]);
    }
  }, [selectedHost]);

  const fetchMessageData = async (sampleIdValue: string) => {
    if (!sampleIdValue) return;
    
    setIsLoading(true);
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
      setPatientInfo(data.patient);
      setPhysicianInfo(data.physician);
      setPathologistInfo(data.patient.orders.orderList[0].pathologist);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error al obtener los datos. Por favor intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSampleId = e.target.value;
    setSampleId(newSampleId);

    if (message) {
      const updatedMessage = { ...message };

      if (updatedMessage.patient.orders.orderList) {
        updatedMessage.patient.orders.orderList = updatedMessage.patient.orders.orderList.map(order => ({
          ...order,
          sampleId: newSampleId,
        }));
      }

      setMessage(updatedMessage);
    }
  };

  const handleSampleIdBlur = () => {
    if (sampleId) {
      fetchMessageData(sampleId);
    }
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

    const updatedMessage = { ...message };
     if (updatedMessage.patient.orders.orderList) {
          updatedMessage.patient.orders.orderList = updatedMessage.patient.orders.orderList.map(order => ({
            ...order,
            pathologist: updatedInfo,
          }));
     }

     setMessage(updatedMessage);
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

  const generateMessage = async () => {
    console.log(message);
    if (!sampleId || !selectedType) {
      setGeneratedMessage('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      if (!message) {
        throw new Error('No hay datos iniciales disponibles.');
      }

      let formattedMessage = '';

      formattedMessage = await convertMessage(message, selectedType);

      
      setGeneratedMessage(formattedMessage);
    } catch (err) {
      console.error('Error generating message:', err);
      setError('Error al generar mensaje. Por favor intente nuevamente.');
      setGeneratedMessage('');
    } finally {
      setIsLoading(false);
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
              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Patient
            </button>
            
            <button 
              onClick={togglePhysicianModal}
              className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Physician
            </button>
            
            <button 
              onClick={togglePathologistModal}
              className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Pathologist
            </button>
            
            <button 
              onClick={toggleHierarchyModal}
              className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors text-sm"
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
          onBlur={handleSampleIdBlur}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          placeholder="Ingresa el Sample ID"
        />
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
          <option value="">Selecciona un host</option>
          {hosts.map((host) => (
            <option key={host.id} value={host.id}>
              {host.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-8">
        <label htmlFor="messageType" className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Mensaje
        </label>
        <select
          id="messageType"
          value={selectedType}
          onChange={handleTypeChange}
          disabled={!selectedHost}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all ${!selectedHost ? 'cursor-not-allowed bg-gray-100' : ''}`}
        >
          <option value="">Selecciona un tipo</option>
          {messageTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        {!selectedHost && (
          <p className="mt-2 text-sm text-amber-600">
            Primero selecciona un host
          </p>
        )}
      </div>
      
      <button
        onClick={generateMessage}
        disabled={isLoading || !selectedHost || !selectedType}
        className={`w-full py-3 px-6 rounded-lg text-lg font-medium transition-colors ${
          isLoading || !selectedHost || !selectedType
            ? 'bg-gray-400 text-white cursor-not-allowed' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        {isLoading ? 'Generando...' : 'Generar Mensaje'}
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
              {messageCopied ? 'Copiado!' : 'Copiar'}
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
    </div>
  );
};

export default MessageGenerator;
