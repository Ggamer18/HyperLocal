import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import ShopDetails from './ShopDetails';

interface SearchResultsProps {
  query: string;
  onBack: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onBack }) => {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const { t } = useLanguage();

  // Mock search results
  const mockResults = [
    {
      id: '1',
      shopName: 'Modern Kirana Store',
      distance: '0.5 km',
      address: 'Shop No. 15, MG Road, Koregaon Park',
      phone: '+91 98765 43210',
      openingHours: '7:00 AM - 11:00 PM',
      verified: true,
      rating: 4.5,
      inStock: true,
      price: '₹45',
      productImage: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      shopName: 'Sai General Store',
      distance: '0.8 km',
      address: 'B-12, North Main Road, Camp Area',
      phone: '+91 87654 32109',
      openingHours: '6:30 AM - 10:30 PM',
      verified: true,
      rating: 4.2,
      inStock: true,
      price: '₹42',
      productImage: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      shopName: 'Quick Mart',
      distance: '1.2 km',
      address: '45, FC Road, Shivajinagar',
      phone: '+91 76543 21098',
      openingHours: '8:00 AM - 10:00 PM',
      verified: false,
      rating: 3.8,
      inStock: false,
      price: '₹48',
      productImage: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  if (selectedShop) {
    const shop = mockResults.find(s => s.id === selectedShop);
    if (shop) {
      return <ShopDetails shop={shop} onBack={() => setSelectedShop(null)} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 -ml-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Results for "{query}"
              </h1>
              <p className="text-sm text-gray-600">
                {mockResults.filter(r => r.inStock).length} shops have this item
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {mockResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex space-x-4">
              <img
                src={result.productImage}
                alt={query}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      {result.shopName}
                      {result.verified && (
                        <div className="ml-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Star size={12} className="text-yellow-500 mr-1" />
                      <span>{result.rating}</span>
                      <span className="mx-2">•</span>
                      <MapPin size={12} className="mr-1" />
                      <span>{result.distance}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{result.price}</div>
                    <div className={`text-xs font-medium flex items-center ${
                      result.inStock ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-1 ${
                        result.inStock ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      {result.inStock ? t('inStock') : t('outOfStock')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Clock size={10} className="mr-1" />
                  <span>{result.openingHours}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedShop(result.id)}
                    className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    View Shop
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center">
                    <Navigation size={14} className="mr-1" />
                    Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Request Product Button */}
        <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-xl p-6 text-center">
          <p className="text-gray-700 mb-3">
            Can't find what you're looking for?
          </p>
          <button className="bg-orange-500 text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
            Request Product from Nearby Shops
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;