import React from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Star, Navigation, Share } from 'lucide-react';

interface Shop {
  id: string;
  shopName: string;
  distance: string;
  address: string;
  phone: string;
  openingHours: string;
  verified: boolean;
  rating: number;
  inStock: boolean;
  price: string;
  productImage: string;
}

interface ShopDetailsProps {
  shop: Shop;
  onBack: () => void;
}

const ShopDetails: React.FC<ShopDetailsProps> = ({ shop, onBack }) => {
  const popularItems = [
    { name: 'Amul Taza Milk', price: '₹28', image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true },
    { name: 'Britannia Bread', price: '₹25', image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true },
    { name: 'Parle-G Biscuits', price: '₹10', image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: false },
    { name: 'Tata Salt', price: '₹20', image: 'https://images.pexels.com/photos/1022385/pexels-photo-1022385.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Shop Details</h1>
            <button className="p-2 -mr-2 text-gray-600 hover:text-gray-800">
              <Share size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Shop Info */}
      <div className="max-w-md mx-auto">
        <div className="bg-white mx-4 mt-4 rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                {shop.shopName}
                {shop.verified && (
                  <div className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </h2>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Star size={14} className="text-yellow-500 mr-1" />
                <span>{shop.rating} rating</span>
                <span className="mx-2">•</span>
                <MapPin size={14} className="mr-1" />
                <span>{shop.distance} away</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-700">
              <MapPin size={16} className="mr-3 text-gray-400" />
              <span>{shop.address}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Phone size={16} className="mr-3 text-gray-400" />
              <span>{shop.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Clock size={16} className="mr-3 text-gray-400" />
              <span>{shop.openingHours}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center">
              <Navigation size={16} className="mr-2" />
              Get Directions
            </button>
            <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Phone size={16} className="mr-2" />
              Call
            </button>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 mx-4 mt-4 rounded-xl h-40 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Interactive Map</p>
          </div>
        </div>

        {/* Popular Items */}
        <div className="mx-4 mt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Items</h3>
          <div className="grid grid-cols-2 gap-4">
            {popularItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-20 object-cover rounded-lg mb-3"
                />
                <h4 className="font-medium text-gray-900 text-sm mb-1">{item.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm">{item.price}</span>
                  <div className={`text-xs font-medium flex items-center ${
                    item.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-1 ${
                      item.inStock ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;