
import React, { useState } from 'react';
import { MessageType, PatientInfo } from '../types/MessageType';
import PatientEditModal from './PatientEditModal';

const MessageGenerator: React.FC = () => {
  const [sampleId, setSampleId] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [messageCopied, setMessageCopied] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    code: sampleId || '',
    firstName: 'JOHN',
    middleName: '',
    lastName: 'DOE',
    sex: 'M',
    dateOfBirth: '19800101'
  });
  
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
    setPatientInfo(prev => ({
      ...prev,
      code: e.target.value
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handlePatientInfoSave = (updatedInfo: PatientInfo) => {
    setPatientInfo(updatedInfo);
    setSampleId(updatedInfo.code);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const generateMessage = () => {
    if (!sampleId || !selectedType) {
      setGeneratedMessage('Por favor, completa todos los campos.');
      return;
    }

    let message = '';
    const currentDate = new Date().toISOString().replace(/[:-]/g, '').split('.')[0];
    const messageId = Math.floor(Math.random() * 100000).toString();
    const uuid = generateUUID();

    // Extracting patient info for the message
    const { firstName, middleName, lastName, sex, dateOfBirth } = patientInfo;

    switch (selectedType) {
      case 'OML21':
        message = `MSH|^~\\&|LIS|XYZ Laboratory|Ventana|ABC Laboratory|${currentDate}||OML^O21|${uuid}|P|2.4|\n` +
          `PID|||${sampleId}||${lastName}^${firstName}^${middleName}^Sr.||${dateOfBirth}|${sex}|\n` +
          `PV1|||||||IndiID^ILastName^IFirstName^ImiddleName^Isufix^Iprefix^Iaddress^^city^Icountry^state^hometel^mobiletel^worktel^zipcode|\n` +
          `SAC|||||||${currentDate}\n` +
          `ORC|NW|${sampleId}|||||||||||||||||||FC^FName|\n` +
          `OBR|1|${sampleId} A1-1||H. Pylori1^^STAIN|||20141014||||||||Breast^Left Breast Upper Node^Breast Biopsy||||${sampleId};A;1;1^1|${sampleId};A;1^1|${sampleId};A^A||||||||||||||||||||||||||SPECIALINSTRUCTION^SpecialInstructionValue^PART^^\n` +
          `OBX|1|CE|${sampleId};A;1;1|`;
        break;
      case 'DELETE_CASE':
        message = `MSH|^~\\&|LIS|XYZ Laboratory|Ventana|ABC Laboratory|${currentDate}||ORM^O01|${uuid}|P|2.4|\n` +
          `PID|||${sampleId}||${lastName}^${firstName}^${middleName}^Sr.||${dateOfBirth}|${sex}|\n` +
          `PV1|||||||IndiID^ILastName^IFirstName^ImiddleName^Isufix^Iprefix^Iaddress^^city^Icountry^state^hometel^mobiletel^worktel^zipcode|\n` +
          `ORC|CA|${sampleId}|||||||||||||||||||FC^FName|\n` +
          `OBR|1|${sampleId}||DELETE CASE^^DELETE|||${currentDate}||||||||Breast^Left Breast Upper Node^Breast Biopsy||||${sampleId}|${sampleId}|${sampleId}`;
        break;
      case 'DELETE_SLIDE':
        message = `MSH|^~\\&|LIS|XYZ Laboratory|Ventana|ABC Laboratory|${currentDate}||ORM^O01|${uuid}|P|2.4|\n` +
          `PID|||${sampleId}||${lastName}^${firstName}^${middleName}^Sr.||${dateOfBirth}|${sex}|\n` +
          `PV1|||||||IndiID^ILastName^IFirstName^ImiddleName^Isufix^Iprefix^Iaddress^^city^Icountry^state^hometel^mobiletel^worktel^zipcode|\n` +
          `ORC|CA|${sampleId}|||||||||||||||||||FC^FName|\n` +
          `OBR|1|${sampleId} A1-1||DELETE SLIDE^^DELETE|||${currentDate}||||||||Breast^Left Breast Upper Node^Breast Biopsy||||${sampleId};A;1;1|${sampleId};A;1|${sampleId};A`;
        break;
      case 'ADTA08':
        message = `MSH|^~\\&|LIS|XYZ Laboratory|Ventana|ABC Laboratory|${currentDate}||ADT^A08|${uuid}|P|2.4|\n` +
          `PID|||${sampleId}||${lastName}^${firstName}^${middleName}^Sr.||${dateOfBirth}|${sex}|\n` +
          `PV1|||||||IndiID^ILastName^IFirstName^ImiddleName^Isufix^Iprefix^Iaddress^^city^Icountry^state^hometel^mobiletel^worktel^zipcode|\n` +
          `OBX|1|CE|DIAGNOSIS|${sampleId}|CANCER DIAGNOSIS||||||F`;
        break;
      case 'ACK':
        message = `MSH|^~\\&|LIS|XYZ Laboratory|Ventana|ABC Laboratory|${currentDate}||ACK^O21^ACK|${uuid}|P|2.4|\n` +
          `MSA|AA|${sampleId}|Message accepted successfully`;
        break;
      case 'DELETE_SPECIMEN':
        message = `MSH|^~\\&|LIS|XYZ Laboratory|Ventana|ABC Laboratory|${currentDate}||ORM^O01|${uuid}|P|2.4|\n` +
          `PID|||${sampleId}||${lastName}^${firstName}^${middleName}^Sr.||${dateOfBirth}|${sex}|\n` +
          `PV1|||||||IndiID^ILastName^IFirstName^ImiddleName^Isufix^Iprefix^Iaddress^^city^Icountry^state^hometel^mobiletel^worktel^zipcode|\n` +
          `ORC|CA|${sampleId}|||||||||||||||||||FC^FName|\n` +
          `OBR|1|${sampleId} A1||DELETE SPECIMEN^^DELETE|||${currentDate}||||||||Breast^Left Breast Upper Node^Breast Biopsy||||${sampleId};A|${sampleId};A|${sampleId}`;
        break;
      case 'SCAN_SLIDE':
        message = `MSH|^~\\&|LIS|XYZ Laboratory|Ventana|ABC Laboratory|${currentDate}||OML^O21|${uuid}|P|2.4|\n` +
          `PID|||${sampleId}||${lastName}^${firstName}^${middleName}^Sr.||${dateOfBirth}|${sex}|\n` +
          `PV1|||||||IndiID^ILastName^IFirstName^ImiddleName^Isufix^Iprefix^Iaddress^^city^Icountry^state^hometel^mobiletel^worktel^zipcode|\n` +
          `ORC|NW|${sampleId}|||||||||||||||||||FC^FName|\n` +
          `OBR|1|${sampleId} A1-1||SCAN^^SCAN|||${currentDate}||||||||Breast^Left Breast Upper Node^Breast Biopsy||||${sampleId};A;1;1|${sampleId};A;1|${sampleId};A`;
        break;
      case 'RESCAN_SLIDE':
        message = `MSH|^~\\&|LIS|XYZ Laboratory|Ventana|ABC Laboratory|${currentDate}||OML^O21|${uuid}|P|2.4|\n` +
          `PID|||${sampleId}||${lastName}^${firstName}^${middleName}^Sr.||${dateOfBirth}|${sex}|\n` +
          `PV1|||||||IndiID^ILastName^IFirstName^ImiddleName^Isufix^Iprefix^Iaddress^^city^Icountry^state^hometel^mobiletel^worktel^zipcode|\n` +
          `ORC|NW|${sampleId}|||||||||||||||||||FC^FName|\n` +
          `OBR|1|${sampleId} A1-1||RESCAN^^RESCAN|||${currentDate}||||||||Breast^Left Breast Upper Node^Breast Biopsy||||${sampleId};A;1;1|${sampleId};A;1|${sampleId};A`;
        break;
      case 'STATUS_UPDATE':
        message = `MSH|^~\\&|LIS|XYZ Laboratory|Ventana|ABC Laboratory|${currentDate}||ORU^R01|${uuid}|P|2.4|\n` +
          `PID|||${sampleId}||${lastName}^${firstName}^${middleName}^Sr.||${dateOfBirth}|${sex}|\n` +
          `PV1|||||||IndiID^ILastName^IFirstName^ImiddleName^Isufix^Iprefix^Iaddress^^city^Icountry^state^hometel^mobiletel^worktel^zipcode|\n` +
          `ORC|SC|${sampleId}|||||||||||||||||||FC^FName|\n` +
          `OBR|1|${sampleId}||STATUS^^STATUS|||${currentDate}||||||||Breast^Left Breast Upper Node^Breast Biopsy||||${sampleId}|${sampleId}|${sampleId}`;
        break;
      default:
        message = 'Tipo de mensaje no soportado.';
    }

    setGeneratedMessage(message);
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

  const handleSampleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampleId(e.target.value);
    setPatientInfo(prev => ({
      ...prev,
      code: e.target.value
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handlePatientInfoSave = (updatedInfo: PatientInfo) => {
    setPatientInfo(updatedInfo);
    setSampleId(updatedInfo.code);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
      
      <div className="mb-8">
        <label htmlFor="messageType" className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Mensaje
        </label>
        <select
          id="messageType"
          value={selectedType}
          onChange={handleTypeChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
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
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-lg font-medium"
      >
        Generar Mensaje
      </button>
      
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
