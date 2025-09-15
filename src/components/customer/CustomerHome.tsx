import React, { useState } from 'react';
import { Search, Mic, MapPin, ShoppingCart, Milk, Cookie, Sparkles, Plane, Heart, Coffee, Pill } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import SearchResults from './SearchResults';

const CustomerHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();

  const categories = [
    { id: 'groceries', label: t('groceries'), icon: ShoppingCart, color: 'bg-green-100 text-green-600' },
    { id: 'dairy', label: t('dairy'), icon: Milk, color: 'bg-blue-100 text-blue-600' },
    { id: 'snacks', label: t('snacks'), icon: Cookie, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'personal', label: t('personalCare'), icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
  ];

  const travelEssentials = [
    { id: 'medicine', label: 'Medicine & First Aid', icon: Pill, color: 'bg-red-100 text-red-600', items: ['Paracetamol', 'Band-Aid', 'Antiseptic', 'ORS'] },
    { id: 'food', label: 'Quick Food', icon: Coffee, color: 'bg-orange-100 text-orange-600', items: ['Instant Noodles', 'Biscuits', 'Energy Bars', 'Water Bottles'] },
    { id: 'hygiene', label: 'Travel Hygiene', icon: Heart, color: 'bg-pink-100 text-pink-600', items: ['Hand Sanitizer', 'Tissues', 'Wet Wipes', 'Toothbrush'] },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Mock voice search - in real app, would use Web Speech API
    setTimeout(() => {
      setSearchQuery('Milk');
      setIsListening(false);
    }, 2000);
  };

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    setShowResults(true);
  };

  if (showResults) {
    return <SearchResults query={searchQuery} onBack={() => setShowResults(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('welcome')}
            </h1>
            <div className="flex items-center justify-center text-gray-600 text-sm">
              <MapPin size={16} className="mr-1" />
              <span>{user?.location?.address || 'Koregaon Park, Pune'}</span>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-6">
            <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 shadow-sm">
              <Search size={20} className="text-gray-400 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`ml-2 p-2 rounded-lg transition-colors ${
                  isListening ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-500'
                }`}
              >
                <Mic size={18} />
              </button>
            </div>
            {isListening && (
              <div className="absolute top-full mt-2 left-0 right-0 text-center">
                <span className="text-sm text-orange-600 animate-pulse">Listening...</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.label)}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3 mx-auto`}>
                  <IconComponent size={24} />
                </div>
                <p className="text-sm font-medium text-gray-800 text-center">
                  {category.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Travel Essentials Section */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plane size={20} className="text-blue-600" />
            </div>
            <h2 className="ml-3 text-lg font-semibold text-gray-900">Travel Essentials</h2>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            Emergency items for travelers - find what you need nearby!
          </p>
          
          <div className="space-y-3">
            {travelEssentials.map((essential) => {
              const IconComponent = essential.icon;
              return (
                <div key={essential.id} className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-3">
                    <div className={`w-8 h-8 rounded-lg ${essential.color} flex items-center justify-center mr-3`}>
                      <IconComponent size={16} />
                    </div>
                    <h3 className="font-medium text-gray-900">{essential.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {essential.items.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(item);
                          setShowResults(true);
                        }}
                        className="bg-gray-100 hover:bg-blue-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700 hover:text-blue-700 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-xs font-medium">
              💡 Tip: For medicines, look for shops with a "Pharmacy" or "Medical" badge
            </p>
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      <div className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Near You</h2>
        <div className="flex flex-wrap gap-2">
          {['Milk', 'Bread', 'Eggs', 'Rice', 'Sugar', 'Tea'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setSearchQuery(item);
                setShowResults(true);
              }}
              className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;