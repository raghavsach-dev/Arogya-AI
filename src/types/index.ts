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

export interface GeminiResponse {
  type: 'services' | 'booking' | 'chat' | 'error';
  data?: any;
  message: string;
  step?: BookingStep;
}