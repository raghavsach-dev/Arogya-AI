import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MapPin, Calendar, Clock } from 'lucide-react';
import { ChatMessage, UserInfo, MedicalService } from '../types';
import { GeminiService } from '../services/geminiApi';

interface ChatInterfaceProps {
  userInfo: UserInfo;
  onServiceBook: (service: MedicalService) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userInfo, onServiceBook }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello ${userInfo.name}! I'm Arogya AI, your personal health assistant. I can help you find medical services, book appointments, or answer health-related questions. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [location, setLocation] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiService = new GeminiService();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    addMessage({
      type: 'user',
      content: userMessage
    });

    // Check if user is asking for medical services
    if (userMessage.toLowerCase().includes('find') || 
        userMessage.toLowerCase().includes('book') || 
        userMessage.toLowerCase().includes('appointment') ||
        userMessage.toLowerCase().includes('doctor') ||
        userMessage.toLowerCase().includes('hospital')) {
      
      setShowLocationInput(true);
      addMessage({
        type: 'ai',
        content: 'I can help you find medical services! Please share your location so I can search for nearby healthcare providers.'
      });
      return;
    }

    // Regular chat response
    setIsTyping(true);
    try {
      const response = await geminiService.chatResponse(userMessage, userInfo);
      setTimeout(() => {
        addMessage({
          type: 'ai',
          content: response
        });
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      setIsTyping(false);
      addMessage({
        type: 'ai',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again.'
      });
    }
  };

  const handleLocationSearch = async () => {
    if (!location.trim()) return;

    setIsSearching(true);
    setShowLocationInput(false);

    // Add searching messages with delay
    const searchSteps = [
      'Searching for medical services near you...',
      'Checking availability and ratings...',
      'Preparing your options...'
    ];

    for (let i = 0; i < searchSteps.length; i++) {
      setTimeout(() => {
        addMessage({
          type: 'system',
          content: searchSteps[i]
        });
      }, i * 1500);
    }

    try {
      setTimeout(async () => {
        const response = await geminiService.searchMedicalServices(location, userInfo);
        
        if (response.type === 'services' && response.data?.services) {
          addMessage({
            type: 'ai',
            content: `Great! I found ${response.data.services.length} medical services near ${location}. Here are your options:`
          });

          // Display services
          response.data.services.forEach((service: MedicalService, index: number) => {
            setTimeout(() => {
              addMessage({
                type: 'ai',
                content: `**${service.name}**
📍 ${service.address}
⭐ ${service.rating}/5 rating
🏥 ${service.specialty}
📞 ${service.phone}
💰 Starting from ${service.price}
🕒 Available: ${service.availability.join(', ')}

Would you like to book an appointment here?`
              });
            }, index * 800);
          });
        } else {
          addMessage({
            type: 'ai',
            content: response.message || 'Sorry, I couldn\'t find medical services in your area right now. Please try a different location or try again later.'
          });
        }
        setIsSearching(false);
      }, 4500);
    } catch (error) {
      setIsSearching(false);
      addMessage({
        type: 'ai',
        content: 'I encountered an issue while searching. Please try again with a different location.'
      });
    }
  };

  const formatMessage = (content: string) => {
    const formatLine = (text: string) => {
      // Handle bold text **text**
      let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-600">$1</strong>');
      
      // Handle italic text *text*
      formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
      
      // Handle code `code`
      formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
      
      return formatted;
    };

    return content.split('\n').map((line, index) => {
      const formattedLine = formatLine(line);
      return (
        <div 
          key={index} 
          className="mb-1" 
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Arogya AI</h3>
            <p className="text-blue-100 text-sm">Your Health Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-blue-600' 
                  : message.type === 'system' 
                    ? 'bg-yellow-500' 
                    : 'bg-gray-200'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : message.type === 'system' ? (
                  <Clock className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className={`rounded-2xl px-4 py-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : message.type === 'system'
                    ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="text-sm">
                  {formatMessage(message.content)}
                </div>
                <div className={`text-xs mt-2 opacity-70 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Location Input */}
      {showLocationInput && (
        <div className="px-6 py-4 bg-blue-50 border-t">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your city or area (e.g., New York, NY)"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
              />
            </div>
            <button
              onClick={handleLocationSearch}
              disabled={!location.trim() || isSearching}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="px-6 py-4 border-t bg-gray-50">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask me anything about your health or medical services..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};