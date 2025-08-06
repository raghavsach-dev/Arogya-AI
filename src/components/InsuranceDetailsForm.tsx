import React, { useState } from 'react';
import { Shield, FileText, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';
import { InsurancePolicy, InsuranceDetails } from '../types';

interface InsuranceDetailsFormProps {
  policy: InsurancePolicy;
  onComplete: (details: InsuranceDetails) => void;
  onCancel: () => void;
}

export const InsuranceDetailsForm: React.FC<InsuranceDetailsFormProps> = ({ 
  policy, 
  onComplete, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<InsuranceDetails>({
    fullName: '',
    dateOfBirth: '',
    occupation: '',
    annualIncome: '',
    existingConditions: '',
    familyMembers: 1,
    preferredCoverage: policy.coverage,
    contactPreference: 'email'
  });

  const [currentStep, setCurrentStep] = useState<'form' | 'processing' | 'completed'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('processing');
    
    // Simulate processing
    setTimeout(() => {
      setCurrentStep('completed');
      setTimeout(() => {
        onComplete(formData);
      }, 3000);
    }, 2000);
  };

  if (currentStep === 'processing') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Your Application</h2>
          <p className="text-gray-600 mb-6">Please wait while we verify your details and prepare your insurance plan...</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Verifying personal details</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Calculating premium</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Preparing policy documents</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'completed') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Insurance Plan Ready!</h2>
          <p className="text-gray-600 mb-6">Your health insurance plan is starting soon.</p>
          
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">Policy Details</h3>
            <div className="text-sm text-green-700 space-y-1">
              <p><strong>Policy:</strong> {policy.name}</p>
              <p><strong>Provider:</strong> {policy.provider}</p>
              <p><strong>Coverage:</strong> {policy.coverage}</p>
              <p><strong>Premium:</strong> {policy.premium}</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Complete Payment</h3>
            </div>
            <p className="text-sm text-blue-700">
              Please complete the payment from the link provided in your email to activate your policy.
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Payment link has been sent to your email address.
            </p>
            <p className="text-xs text-gray-500">
              Policy will be activated within 24 hours of payment confirmation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Insurance Application</h2>
          <p className="text-gray-600">Complete your details to proceed</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Selected Policy</h3>
          <div className="text-sm text-blue-700">
            <p><strong>{policy.name}</strong></p>
            <p>{policy.provider} • {policy.coverage} Coverage</p>
            <p>Premium: {policy.premium}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full legal name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Occupation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              placeholder="Your current occupation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Income <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
            >
              <option value="">Select income range</option>
              <option value="below-3lakh">Below ₹3,00,000</option>
              <option value="3-5lakh">₹3,00,000 - ₹5,00,000</option>
              <option value="5-10lakh">₹5,00,000 - ₹10,00,000</option>
              <option value="10-20lakh">₹10,00,000 - ₹20,00,000</option>
              <option value="above-20lakh">Above ₹20,00,000</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Family Members
              </label>
              <input
                type="number"
                min="1"
                max="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.familyMembers}
                onChange={(e) => setFormData({ ...formData, familyMembers: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Preference
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.contactPreference}
                onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Existing Medical Conditions
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              value={formData.existingConditions}
              onChange={(e) => setFormData({ ...formData, existingConditions: e.target.value })}
              placeholder="List any existing medical conditions, medications, or allergies"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Important:</p>
                <p>Providing accurate information is crucial for policy approval and claims processing.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Apply Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};