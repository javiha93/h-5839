

export interface PatientInfo {
  code: string;
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
}

export interface ContactInfo {
  address: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  homePhone: string;
  workPhone: string;
  mobile: string;
  email: string;
}

export interface PersonInfo extends ContactInfo {
  code: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface Patient extends PersonInfo {
  suffix: string;
  secondSurname: string;
  dateOfBirth: string;
  sex: string;
  orders: OrderList;
}

export interface Physician extends PersonInfo {
  suffix: string;
  prefix: string;
}

export interface Pathologist extends PersonInfo {
  suffix: string;
  prefix: string;
}

export interface OrderList {
  orderList: Order[];
}

export interface Order {
  sampleId: string;
  // Add other properties as needed
}

export interface MessageType {
  id: string;
  name: string;
}

export interface MessageHeader {
  // Add properties as needed
}

export interface Message {
  header: MessageHeader;
  patient: Patient;
  physician: Physician;
  pathologist?: Pathologist;
  // Add other properties as needed
}

