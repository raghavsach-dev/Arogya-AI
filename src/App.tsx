import React, { useState } from 'react';
import { Heart, Bot, Calendar, Users, Shield, Award } from 'lucide-react';
import { UserInfoForm } from './components/UserInfoForm';
import { ChatInterface } from './components/ChatInterface';
import { BookingFlow } from './components/BookingFlow';
import { UserInfo, MedicalService } from './types';

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showUserForm, setShowUserForm] = useState(true);
  const [selectedService, setSelectedService] = useState<MedicalService | null>(null);
  const [showBookingFlow, setShowBookingFlow] = useState(false);

  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    setShowUserForm(false);
  };

  const handleServiceBook = (service: MedicalService) => {
    setSelectedService(service);
    setShowBookingFlow(true);
  };

  const handleBookingComplete = () => {
    setShowBookingFlow(false);
    setSelectedService(null);
  };

  const handleBookingCancel = () => {
    setShowBookingFlow(false);
    setSelectedService(null);
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Welcome to <span className="text-blue-600">Arogya AI</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Your intelligent health companion for finding medical services, booking appointments, 
                and getting personalized health assistance powered by advanced AI technology.
              </p>
              
              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Health Assistant</h3>
                  <p className="text-gray-600 text-sm">Get instant medical advice and health information from our intelligent AI assistant</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Booking</h3>
                  <p className="text-gray-600 text-sm">Book appointments with healthcare providers near you with just a few clicks</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
                  <p className="text-gray-600 text-sm">Your health information is protected with enterprise-grade security</p>
                </div>
              </div>

              <button
                onClick={() => setShowUserForm(true)}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Your Health Journey
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600">Healthcare Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600 font-medium">Built By DataSmiths</span>
            </div>
            <p className="text-gray-500 text-sm">
              Empowering healthcare through artificial intelligence and innovative technology solutions.
            </p>
          </div>
        </div>

        <UserInfoForm onSubmit={handleUserInfoSubmit} isVisible={showUserForm} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Arogya AI</h1>
                <p className="text-sm text-gray-600">Your Health Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, {userInfo.name}</p>
                <p className="text-xs text-gray-500">{userInfo.email}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="h-[700px]">
              <ChatInterface 
                userInfo={userInfo} 
                onServiceBook={handleServiceBook}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{userInfo.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium capitalize">{userInfo.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{userInfo.phone}</span>
                </div>
                {userInfo.currentSymptoms && (
                  <div className="pt-3 border-t">
                    <span className="text-gray-600 text-sm">Current Symptoms:</span>
                    <p className="text-sm text-gray-900 mt-1">{userInfo.currentSymptoms}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Book Appointment</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Health Checkup</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Emergency Services</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Built By DataSmiths */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-semibold">Built By DataSmiths</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Empowering healthcare through cutting-edge AI technology and innovative solutions for better patient care.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Flow Modal */}
      {showBookingFlow && selectedService && (
        <BookingFlow
          service={selectedService}
          userInfo={userInfo}
          onComplete={handleBookingComplete}
          onCancel={handleBookingCancel}
        />
      )}
    </div>
  );
}

export default App;