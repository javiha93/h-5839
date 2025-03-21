import { Patient, Physician, Pathologist, MessageHeader } from './MessageType';

export interface Message {
  header: MessageHeader;
  patient: Patient;
  physician: Physician;
  pathologist?: Pathologist;
  // Add other properties as needed
}

export { Patient, Physician, Pathologist };
