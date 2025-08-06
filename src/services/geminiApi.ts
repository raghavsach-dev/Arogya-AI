const GEMINI_API_KEY = 'AIzaSyD5vByupYHiskKjI2GrCsH2paDEry95oBo';
const MODEL = 'gemini-2.5-flash';
const API_METHOD = 'generateContent';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:${API_METHOD}`;

export class GeminiService {
  private async makeRequest(prompt: string): Promise<any> {
    try {
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  async searchMedicalServices(location: string, userInfo: any): Promise<any> {
    const prompt = `You are Arogya AI, a medical assistant. A user in ${location} is looking for medical services.
    User Info: Name: ${userInfo.name}, Age: ${userInfo.age}, Gender: ${userInfo.gender}
    ${userInfo.currentSymptoms ? `Current Symptoms: ${userInfo.currentSymptoms}` : ''}
    
    IMPORTANT: You must respond with ONLY a valid JSON object, no other text. Generate realistic medical services for ${location}.
    
    {
      "type": "services",
      "message": "Found medical services near your location",
      "data": {
        "services": [
          {
            "id": "1",
            "name": "City General Hospital",
            "specialty": "General Medicine",
            "rating": 4.5,
            "distance": "2.3 km",
            "address": "123 Medical St, ${location}",
            "phone": "+1-555-0123",
            "availability": ["9:00 AM", "2:00 PM", "4:30 PM"],
            "price": "$150"
          },
          {
            "id": "2",
            "name": "Heart Care Clinic",
            "specialty": "Cardiology",
            "rating": 4.8,
            "distance": "1.8 km",
            "address": "456 Health Ave, ${location}",
            "phone": "+1-555-0124",
            "availability": ["10:00 AM", "3:00 PM", "5:00 PM"],
            "price": "$200"
          },
          {
            "id": "3",
            "name": "Family Health Center",
            "specialty": "Family Medicine",
            "rating": 4.3,
            "distance": "3.1 km",
            "address": "789 Wellness Blvd, ${location}",
            "phone": "+1-555-0125",
            "availability": ["8:00 AM", "1:00 PM", "6:00 PM"],
            "price": "$120"
          }
        ]
      }
    }`;

    try {
      const response = await this.makeRequest(prompt);
      // Clean the response to ensure it's valid JSON
      const cleanResponse = response.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '');
      const parsedResponse = JSON.parse(cleanResponse);
      return parsedResponse;
    } catch (error) {
      console.error('Search services error:', error);
      return {
        type: 'error',
        message: 'Sorry, I couldn\'t find medical services right now. Please try again.',
        data: {
          services: [
            {
              id: "fallback-1",
              name: "General Hospital",
              specialty: "General Medicine",
              rating: 4.2,
              distance: "2.5 km",
              address: `Main Street, ${location}`,
              phone: "+1-555-0100",
              availability: ["9:00 AM", "2:00 PM", "4:00 PM"],
              price: "$150"
            }
          ]
        }
      };
    }
  }

  async processBooking(service: any, userInfo: any, step: string): Promise<any> {
    const prompt = `You are Arogya AI processing a medical appointment booking.
    Current step: ${step}
    Service: ${JSON.stringify(service)}
    User: ${JSON.stringify(userInfo)}
    
    Based on the step, provide appropriate JSON response:
    - "details": Show service details and ask for confirmation
    - "upload": Confirm user info upload
    - "confirm": Generate booking confirmation
    - "completed": Show success message with booking ID
    
    Format response as JSON with type, message, and relevant data.`;

    try {
      const response = await this.makeRequest(prompt);
      return JSON.parse(response);
    } catch (error) {
      return {
        type: 'error',
        message: 'Booking process encountered an issue. Please try again.',
        data: null
      };
    }
  }

  async chatResponse(message: string, userInfo?: any): Promise<string> {
    const prompt = `You are Arogya AI, a helpful medical assistant chatbot. 
    User message: "${message}"
    ${userInfo ? `User context: ${JSON.stringify(userInfo)}` : ''}
    
    Provide a helpful, professional medical response. Be empathetic and informative but always recommend consulting with healthcare professionals for serious concerns.`;

    try {
      const response = await this.makeRequest(prompt);
      return response || "I'm here to help with your health questions. Could you please rephrase that?";
    } catch (error) {
      return "I'm experiencing some technical difficulties. Please try again in a moment.";
    }
  }

  async searchInsurancePolicies(userInfo: any): Promise<any> {
    const prompt = `You are Arogya AI, a medical assistant. A user is looking for health insurance policies.
    User Info: Name: ${userInfo.name}, Age: ${userInfo.age}, Gender: ${userInfo.gender}
    ${userInfo.currentSymptoms ? `Current Health Concerns: ${userInfo.currentSymptoms}` : ''}
    ${userInfo.medicalHistory ? `Medical History: ${userInfo.medicalHistory}` : ''}
    
    IMPORTANT: You must respond with ONLY a valid JSON object, no other text. Generate realistic health insurance policies suitable for this user.
    
    {
      "type": "insurance",
      "message": "Found health insurance policies suitable for you",
      "data": {
        "policies": [
          {
            "id": "1",
            "name": "Comprehensive Health Plus",
            "provider": "HealthGuard Insurance",
            "type": "Individual",
            "coverage": "₹10,00,000",
            "premium": "₹15,000/year",
            "deductible": "₹5,000",
            "benefits": ["Hospitalization", "Pre & Post Hospitalization", "Day Care Procedures", "Ambulance", "Health Checkups"],
            "ageLimit": "18-65 years",
            "waitingPeriod": "30 days",
            "rating": 4.6
          },
          {
            "id": "2",
            "name": "Family Care Shield",
            "provider": "MediSecure Ltd",
            "type": "Family Floater",
            "coverage": "₹15,00,000",
            "premium": "₹22,000/year",
            "deductible": "₹7,500",
            "benefits": ["Family Coverage", "Maternity Benefits", "Critical Illness", "Mental Health", "Telemedicine"],
            "ageLimit": "18-70 years",
            "waitingPeriod": "45 days",
            "rating": 4.8
          },
          {
            "id": "3",
            "name": "Basic Health Protect",
            "provider": "SafeHealth Corp",
            "type": "Individual",
            "coverage": "₹5,00,000",
            "premium": "₹8,500/year",
            "deductible": "₹3,000",
            "benefits": ["Basic Hospitalization", "Emergency Care", "Diagnostic Tests", "Pharmacy Benefits"],
            "ageLimit": "18-60 years",
            "waitingPeriod": "30 days",
            "rating": 4.2
          },
          {
            "id": "4",
            "name": "Premium Health Elite",
            "provider": "EliteHealth Insurance",
            "type": "Individual",
            "coverage": "₹25,00,000",
            "premium": "₹35,000/year",
            "deductible": "₹10,000",
            "benefits": ["Worldwide Coverage", "Organ Transplant", "Cancer Treatment", "Preventive Care", "Wellness Programs"],
            "ageLimit": "21-75 years",
            "waitingPeriod": "90 days",
            "rating": 4.9
          }
        ]
      }
    }`;
    try {
      const response = await this.makeRequest(prompt);
      const cleanResponse = response.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '');
      const parsedResponse = JSON.parse(cleanResponse);
      return parsedResponse;
    } catch (error) {
      console.error('Search insurance error:', error);
      return {
        type: 'error',
        message: 'Sorry, I couldn\'t find insurance policies right now. Please try again.',
        data: {
          policies: [
            {
              id: "fallback-1",
              name: "Basic Health Insurance",
              provider: "General Insurance Co",
              type: "Individual",
              coverage: "₹5,00,000",
              premium: "₹12,000/year",
              deductible: "₹5,000",
              benefits: ["Hospitalization", "Emergency Care", "Diagnostic Tests"],
              ageLimit: "18-65 years",
              waitingPeriod: "30 days",
              rating: 4.0
            }
          ]
        }
      };
    }
  }
}