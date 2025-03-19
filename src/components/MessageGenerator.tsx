
import React, { useState } from 'react';
import { MessageType } from '../types/MessageType';

const MessageGenerator: React.FC = () => {
  const [sampleId, setSampleId] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [messageTypes, setMessageTypes] = useState<MessageType[]>([
    { id: 'OML21', name: 'OML21' },
    { id: 'STATUS_UPDATE', name: 'STATUS_UPDATE' },
    { id: 'DELETE_SLIDE', name: 'DELETE_SLIDE' },
    { id: 'ADTA08', name: 'ADTA08' },
    { id: 'ACK', name: 'ACK' },
    { id: 'DELETE_CASE', name: 'DELETE_CASE' },
    { id: 'DELETE_SPECIMEN', name: 'DELETE_SPECIMEN' },
    { id: 'SCAN_SLIDE', name: 'SCAN_SLIDE' },
    { id: 'RESCAN_SLIDE', name: 'RESCAN_SLIDE' }
  ]);

  const handleSampleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampleId(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const generateMessage = () => {
    if (!sampleId || !selectedType) {
      setGeneratedMessage('Por favor, completa todos los campos.');
      return;
    }

    let message = '';
    const currentDate = new Date().toISOString().replace(/[:-]/g, '').split('.')[0];
    const messageId = Math.floor(Math.random() * 100000).toString();

    switch (selectedType) {
      case 'OML21':
        message = `MSH|^~\\&|CERNER|HOSPITAL|LIS|PATHOLOGY|${currentDate}||OML^O21^OML_O21|${messageId}|P|2.5.1|\n` +
          `PID|||${sampleId}^^^MRN^MRN||DOE^JOHN^^^||19800101|M|\n` +
          `ORC|NW|${sampleId}_ORD|${sampleId}_PLACR||SC\n` +
          `OBR|1|${sampleId}_ORD|${sampleId}_PLACR|PATH^PATHOLOGY^L|||${currentDate}|||||||${currentDate}|TISSUE|DOCTOR^ORDERING^^^^\n` +
          `SAC|||${sampleId}|A|CONTAINER^^TISSUE`;
        break;
      case 'DELETE_CASE':
        message = `MSH|^~\\&|CERNER|HOSPITAL|LIS|PATHOLOGY|${currentDate}||ORM^O01|${messageId}|P|2.5.1|\n` +
          `PID|||${sampleId}^^^MRN^MRN||DOE^JOHN^^^||19800101|M|\n` +
          `ORC|CA|${sampleId}_ORD|${sampleId}_PLACR||SC\n` +
          `OBR|1|${sampleId}_ORD|${sampleId}_PLACR|PATH^PATHOLOGY^L|||${currentDate}|||||||||DOCTOR^ORDERING^^^^`;
        break;
      case 'DELETE_SLIDE':
        message = `MSH|^~\\&|CERNER|HOSPITAL|LIS|PATHOLOGY|${currentDate}||ORM^O01|${messageId}|P|2.5.1|\n` +
          `PID|||${sampleId}^^^MRN^MRN||DOE^JOHN^^^||19800101|M|\n` +
          `ORC|CA|${sampleId}_ORD|${sampleId}_PLACR||SC\n` +
          `OBR|1|${sampleId}_ORD|${sampleId}_PLACR|SLIDE^SLIDE^L|||${currentDate}|||||||||DOCTOR^ORDERING^^^^`;
        break;
      case 'ADTA08':
        message = `MSH|^~\\&|CERNER|HOSPITAL|LIS|PATHOLOGY|${currentDate}||ADT^A08|${messageId}|P|2.5.1|\n` +
          `PID|||${sampleId}^^^MRN^MRN||DOE^JOHN^^^||19800101|M|\n` +
          `PV1||I|ICU^ROOM123^BED1|1|||DOCTOR^REFERRING^^^^\n` +
          `OBX|1|ST|DIAGNOSIS||CANCER DIAGNOSIS||||||F`;
        break;
      case 'ACK':
        message = `MSH|^~\\&|LIS|PATHOLOGY|CERNER|HOSPITAL|${currentDate}||ACK^O21^ACK|${messageId}|P|2.5.1|\n` +
          `MSA|AA|${sampleId}_MSG|Message accepted successfully`;
        break;
      case 'DELETE_SPECIMEN':
        message = `MSH|^~\\&|CERNER|HOSPITAL|LIS|PATHOLOGY|${currentDate}||ORM^O01|${messageId}|P|2.5.1|\n` +
          `PID|||${sampleId}^^^MRN^MRN||DOE^JOHN^^^||19800101|M|\n` +
          `ORC|CA|${sampleId}_ORD|${sampleId}_PLACR||SC\n` +
          `OBR|1|${sampleId}_ORD|${sampleId}_PLACR|SPEC^SPECIMEN^L|||${currentDate}|||||||||DOCTOR^ORDERING^^^^`;
        break;
      case 'SCAN_SLIDE':
        message = `MSH|^~\\&|CERNER|HOSPITAL|LIS|PATHOLOGY|${currentDate}||OML^O21|${messageId}|P|2.5.1|\n` +
          `PID|||${sampleId}^^^MRN^MRN||DOE^JOHN^^^||19800101|M|\n` +
          `ORC|NW|${sampleId}_ORD|${sampleId}_PLACR||SC\n` +
          `OBR|1|${sampleId}_ORD|${sampleId}_PLACR|SCAN^SCAN_SLIDE^L|||${currentDate}|||||||${currentDate}|SLIDE|DOCTOR^ORDERING^^^^\n` +
          `SAC|||${sampleId}_SLIDE|A|SLIDE^^SCAN`;
        break;
      case 'RESCAN_SLIDE':
        message = `MSH|^~\\&|CERNER|HOSPITAL|LIS|PATHOLOGY|${currentDate}||OML^O21|${messageId}|P|2.5.1|\n` +
          `PID|||${sampleId}^^^MRN^MRN||DOE^JOHN^^^||19800101|M|\n` +
          `ORC|NW|${sampleId}_ORD|${sampleId}_PLACR||SC\n` +
          `OBR|1|${sampleId}_ORD|${sampleId}_PLACR|RESCAN^RESCAN_SLIDE^L|||${currentDate}|||||||${currentDate}|SLIDE|DOCTOR^ORDERING^^^^\n` +
          `SAC|||${sampleId}_SLIDE|A|SLIDE^^RESCAN`;
        break;
      case 'STATUS_UPDATE':
        message = `MSH|^~\\&|CERNER|HOSPITAL|LIS|PATHOLOGY|${currentDate}||ORU^R01|${messageId}|P|2.5.1|\n` +
          `PID|||${sampleId}^^^MRN^MRN||DOE^JOHN^^^||19800101|M|\n` +
          `ORC|SC|${sampleId}_ORD|${sampleId}_PLACR||CM\n` +
          `OBR|1|${sampleId}_ORD|${sampleId}_PLACR|STAT^STATUS_UPDATE^L|||${currentDate}|||||||||DOCTOR^ORDERING^^^^`;
        break;
      default:
        message = 'Tipo de mensaje no soportado.';
    }

    setGeneratedMessage(message);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Generador de Mensajes HL7</h1>
      
      <div className="mb-4">
        <label htmlFor="sampleId" className="block text-sm font-medium text-gray-700 mb-2">
          Sample ID
        </label>
        <input
          type="text"
          id="sampleId"
          value={sampleId}
          onChange={handleSampleIdChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Ingresa el Sample ID"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="messageType" className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Mensaje
        </label>
        <select
          id="messageType"
          value={selectedType}
          onChange={handleTypeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        >
          <option value="">Selecciona un tipo</option>
          {messageTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={generateMessage}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        Generar Mensaje
      </button>
      
      {generatedMessage && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Mensaje Generado:</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-sm whitespace-pre-wrap">
            {generatedMessage}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MessageGenerator;
