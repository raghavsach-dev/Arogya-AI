export interface UserInfo {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  medicalHistory?: string;
  currentSymptoms?: string;
}

export interface MedicalService {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance: string;
  address: string;
  phone: string;
  availability: string[];
  price: string;
  image?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface BookingStep {
  step: 'search' | 'details' | 'upload' | 'confirm' | 'completed';
  message: string;
  progress: number;
}

export interface MedicalDetails {
  symptoms: string;
  urgency: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes: string;
  emergencyContact: string;
}

export interface InsurancePolicy {
  id: string;
  name: string;
  provider: string;
  type: string;
  coverage: string;
  premium: string;
  deductible: string;
  benefits: string[];
  ageLimit: string;
  waitingPeriod: string;
  rating: number;
}

export interface InsuranceDetails {
  fullName: string;
  dateOfBirth: string;
  occupation: string;
  annualIncome: string;
  existingConditions: string;
  familyMembers: number;
  preferredCoverage: string;
  contactPreference: string;
}

export interface GeminiResponse {
  type: 'services' | 'booking' | 'chat' | 'error';
  data?: any;
  message: string;
  step?: BookingStep;
}