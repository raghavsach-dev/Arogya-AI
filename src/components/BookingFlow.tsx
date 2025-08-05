import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Upload, Calendar, MapPin, Phone, Star } from 'lucide-react';
import { MedicalService, UserInfo, BookingStep } from '../types';

interface BookingFlowProps {
  service: MedicalService;
  userInfo: UserInfo;
  onComplete: () => void;
  onCancel: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ service, userInfo, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>({
    step: 'search',
    message: 'Initiating booking process...',
    progress: 0
  });
  const [bookingId, setBookingId] = useState('');

  const steps = [
    { key: 'search', label: 'Searching Nearest Service', progress: 25 },
    { key: 'details', label: 'Checking Details', progress: 50 },
    { key: 'upload', label: 'Uploading Your Info', progress: 75 },
    { key: 'confirm', label: 'Confirming Booking', progress: 90 },
    { key: 'completed', label: 'Booking Confirmed', progress: 100 }
  ];

  useEffect(() => {
    const processBooking = async () => {
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        let message = '';
        switch (step.key) {
          case 'search':
            message = `Found ${service.name} - ${service.distance} away`;
            break;
          case 'details':
            message = `Verified availability and specialist credentials`;
            break;
          case 'upload':
            message = `Securely uploaded your medical information`;
            break;
          case 'confirm':
            message = `Processing appointment confirmation...`;
            break;
          case 'completed':
            const id = `ARG-${Date.now().toString().slice(-6)}`;
            setBookingId(id);
            message = `Appointment confirmed! Booking ID: ${id}`;
            break;
        }

        setCurrentStep({
          step: step.key as any,
          message,
          progress: step.progress
        });
      }
    };

    processBooking();
  }, [service]);

  const getStepIcon = (stepKey: string) => {
    switch (stepKey) {
      case 'search':
        return <MapPin className="w-5 h-5" />;
      case 'details':
        return <Star className="w-5 h-5" />;
      case 'upload':
        return <Upload className="w-5 h-5" />;
      case 'confirm':
        return <Calendar className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {getStepIcon(currentStep.step)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Appointment</h2>
          <p className="text-gray-600">{service.name}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentStep.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${currentStep.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
              {getStepIcon(currentStep.step)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {steps.find(s => s.key === currentStep.step)?.label}
              </h3>
              <p className="text-sm text-gray-600">{currentStep.message}</p>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Appointment Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Specialty:</span>
              <span className="font-medium">{service.specialty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Distance:</span>
              <span className="font-medium">{service.distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fee:</span>
              <span className="font-medium">{service.price}</span>
            </div>
            {bookingId && (
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-bold text-blue-600">{bookingId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {currentStep.step === 'completed' ? (
          <div className="space-y-3">
            <button
              onClick={onComplete}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Appointment Confirmed
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                You'll receive a confirmation email shortly at {userInfo.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <div className="flex-1 bg-blue-100 text-blue-600 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};