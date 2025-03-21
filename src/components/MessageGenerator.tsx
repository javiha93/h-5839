
import React, { useState, useEffect } from 'react';
import { MessageType, PatientInfo } from '../types/MessageType';
import { Message, Patient } from '../types/MessageType';
import PatientEditModal from './PatientEditModal';

const MessageGenerator: React.FC = () => {
  const [message, setMessage] = useState<Message>(null);
  const [sampleId, setSampleId] = useState<string>('');
  const [selectedHost, setSelectedHost] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [messageCopied, setMessageCopied] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  
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
      { id: 'STATUS_UPDATE', name: 'STATUS_UPDATE' },
      { id: 'DELETE_SLIDE', name: 'DELETE_SLIDE' },
      { id: 'ADTA08', name: 'ADTA08' },
      { id: 'ACK', name: 'ACK' },
      { id: 'DELETE_CASE', name: 'DELETE_CASE' },
      { id: 'DELETE_SPECIMEN', name: 'DELETE_SPECIMEN' },
      { id: 'SCAN_SLIDE', name: 'SCAN_SLIDE' },
      { id: 'RESCAN_SLIDE', name: 'RESCAN_SLIDE' }
    ],
    VTG: [
      { id: 'OEWF', name: 'OEWF' }
    ],
    VANTAGE_WS: [
      { id: 'CREATE_CASE', name: 'CREATE_CASE' },
      { id: 'UPDATE_CASE', name: 'UPDATE_CASE' }
    ]
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8085/api/messages/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sampleId }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setMessage(data);
        setPatientInfo(data.patient)
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Error al obtener los datos iniciales. Por favor intente nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Update message types when host is selected
  useEffect(() => {
    if (selectedHost) {
      setMessageTypes(hostMessageTypes[selectedHost as keyof typeof hostMessageTypes] || []);
      setSelectedType(''); // Reset selected type when changing host
    } else {
      setMessageTypes([]);
    }
  }, [selectedHost]);

  const handleSampleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampleId(e.target.value);
    setPatientInfo(prev => ({
      ...prev,
      code: e.target.value
    }));
  };

  const handleHostChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHost(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handlePatientInfoSave = (updatedInfo: Patient) => {
    console.log(patientInfo)
    console.log(updatedInfo)
    setPatientInfo(updatedInfo);

    if (message) {
    console.log(patientInfo)
      setMessage(prevMessage => ({
        ...prevMessage,
        patient: updatedInfo
      }));
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const generateMessage = async () => {
  console.log(message.patient)
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
      // Format the message based on the selected type and the received data
      let formattedMessage = '';

      switch (selectedType) {
        case 'OML21':
          formattedMessage = await convertToOML21Format(message);
          break;
        // Add other cases for different message types
        default:
          formattedMessage = 'Tipo de mensaje no soportado2.';
      }
      
      setGeneratedMessage(formattedMessage);
    } catch (err) {
      console.error('Error generating message:', err);
      setError('Error al generar mensaje. Por favor intente nuevamente.');
      setGeneratedMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert to OML21 format
  const convertToOML21Format = async (message: string) => {
    try {
      const response = await fetch('http://localhost:8085/api/messages/oml21', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.text();
      return data;
    } catch (err) {
      console.error('Error converting to OML21:', err);
      throw err;
    }
  };

  // Función para generar un UUID v4
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
          <button 
            onClick={toggleModal}
            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editar Paciente
          </button>
        </div>
        <input
          type="text"
          id="sampleId"
          value={sampleId}
          onChange={handleSampleIdChange}
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
        isOpen={isModalOpen}
        onClose={toggleModal}
        patientInfo={patientInfo}
        onSave={handlePatientInfoSave}
      />
    </div>
  );
};

export default MessageGenerator;
