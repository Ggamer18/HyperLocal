import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const assistantName = user?.type === 'shopkeeper' ? 'Vyapar Sahayak' : 'HyperLocal Helper';
      const welcomeMessage = user?.type === 'shopkeeper' 
        ? `Hello! I'm ${assistantName}, your business advisor. I can help you grow your shop, manage inventory, and understand your customers better. How can I assist you today?`
        : `Hello! I'm ${assistantName}. I'm here to help you use HyperLocal app easily. I can guide you through searching products, finding shops, and using all features. How can I help you?`;

      setMessages([{
        id: '1',
        content: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, user?.type]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // In a real app, this would call your /api/chat endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botResponse = getBotResponse(inputValue, user?.type || 'customer');
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getBotResponse = (message: string, userType: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (userType === 'shopkeeper') {
      if (lowerMessage.includes('sales') || lowerMessage.includes('grow') || lowerMessage.includes('business')) {
        return "To grow your sales, I recommend: 1) Keep your inventory updated regularly 2) Add popular items that customers are requesting 3) Use the 'Demand Insights' to see what people are searching for in your area. Would you like me to explain any of these features?";
      }
      if (lowerMessage.includes('inventory') || lowerMessage.includes('stock')) {
        return "For better inventory management: Make sure to toggle 'In Stock/Out of Stock' regularly. Customers see this in real-time! Also check your 'Weekly Insights' to see which products are most viewed. This helps you decide what to restock first.";
      }
      if (lowerMessage.includes('customer') || lowerMessage.includes('demand')) {
        return "Understanding customer demand is key! Check your dashboard for 'Customer Requests' - these show what items people want but couldn't find. Adding these products can boost your sales significantly.";
      }
      return "I can help you with: growing sales, managing inventory, understanding customer demand, and using app features effectively. What would you like to know more about?";
    } else {
      if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
        return "To search for products: 1) Tap the search bar on home screen 2) Type the product name or tap the microphone for voice search 3) You'll see nearby shops that have it in stock. You can also browse categories like Groceries, Dairy, etc.";
      }
      if (lowerMessage.includes('location') || lowerMessage.includes('nearby')) {
        return "Make sure your phone's location/GPS is turned on for best results. The app shows shops within your area with real-time distance. You can tap 'Get Directions' on any shop to navigate there.";
      }
      if (lowerMessage.includes('stock') || lowerMessage.includes('available')) {
        return "Green dot = In Stock, Red dot = Out of Stock. This updates in real-time! If you don't find what you're looking for, tap 'Request Product' to let nearby shops know you need it.";
      }
      return "I can help you with: searching for products, finding nearby shops, understanding stock status, and using all app features. What do you need help with?";
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 z-40"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <span className="font-medium">
                {user?.type === 'shopkeeper' ? 'Vyapar Sahayak' : 'HyperLocal Helper'}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-orange-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-2 max-w-[80%]">
                  {message.sender === 'bot' && (
                    <div className="bg-orange-100 p-1 rounded-full">
                      <Bot size={16} className="text-orange-600" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-orange-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="bg-orange-500 p-1 rounded-full">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;