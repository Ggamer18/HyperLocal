import React, { useState } from 'react';
import { Plus, Package, TrendingUp, Eye, Users, Bell } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import AddProduct from './AddProduct';

const ShopkeeperDashboard: React.FC = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = [
    { label: 'Total Products', value: '52', icon: Package, color: 'text-blue-600' },
    { label: 'Views This Week', value: '1,248', icon: Eye, color: 'text-green-600' },
    { label: 'Customer Requests', value: '8', icon: Users, color: 'text-orange-600' },
  ];

  const weeklyInsights = [
    { product: 'Parle-G Biscuits', views: 150, trend: 'up' },
    { product: 'Amul Taza Milk', views: 132, trend: 'up' },
    { product: 'Britannia Bread', views: 98, trend: 'down' },
    { product: 'Tata Salt', views: 87, trend: 'up' },
  ];

  const customerRequests = [
    { product: 'Organic Honey', requests: 5, time: '2 hours ago' },
    { product: 'Coconut Oil', requests: 3, time: '4 hours ago' },
    { product: 'Brown Bread', requests: 4, time: '6 hours ago' },
  ];

  const products = [
    { id: '1', name: 'Amul Taza Milk (1L)', category: 'Dairy', price: '₹45', inStock: true, image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: '2', name: 'Britannia Bread', category: 'Bakery', price: '₹25', inStock: true, image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: '3', name: 'Parle-G Biscuits', category: 'Snacks', price: '₹10', inStock: false, image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: '4', name: 'Tata Salt (1kg)', category: 'Groceries', price: '₹20', inStock: true, image: 'https://images.pexels.com/photos/1022385/pexels-photo-1022385.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: '5', name: 'Fresh Bananas', category: 'Fruits', price: '₹40', inStock: true, image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: '6', name: 'Basmati Rice (5kg)', category: 'Groceries', price: '₹350', inStock: true, image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=150' },
  ];

  if (showAddProduct) {
    return <AddProduct onBack={() => setShowAddProduct(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user?.name}!
              </h1>
              <p className="text-gray-600">Manage your shop and grow your business</p>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-800 relative">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Products Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Your Products</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center"
              >
                <Plus size={16} className="mr-2" />
                {t('addProduct')}
              </button>
            </div>

            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category} • {product.price}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.inStock}
                        className="sr-only peer"
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Insights */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Weekly Insights</h2>
            <div className="space-y-4">
              {weeklyInsights.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.product}</p>
                    <p className="text-sm text-gray-600">{item.views} views</p>
                  </div>
                  <div className={`flex items-center ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp size={16} className={item.trend === 'down' ? 'rotate-180' : ''} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Requests */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Requests</h2>
            <div className="space-y-4">
              {customerRequests.map((request, index) => (
                <div key={index} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{request.product}</h3>
                    <span className="text-sm text-orange-600 font-medium">{request.requests} requests</span>
                  </div>
                  <p className="text-sm text-gray-600">{request.time}</p>
                  <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                    Add to Inventory
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SMS Feature Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-lg">📱</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">No Internet? No Problem!</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Update your stock status by sending an SMS even when you don't have internet connection.
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-gray-900 mb-2">Send SMS to: 555-0101</p>
              <p className="text-sm text-gray-600">Example: "Parle-G out of stock"</p>
              <p className="text-sm text-gray-600">Example: "Milk in stock"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;