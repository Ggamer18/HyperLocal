import React, { useState } from 'react';
import { ShoppingBag, Store, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import AuthModal from './AuthModal';

const WelcomeScreen: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedUserType, setSelectedUserType] = useState<'customer' | 'shopkeeper'>('customer');
  const { t } = useLanguage();

  const handleGetStarted = (userType: 'customer' | 'shopkeeper') => {
    setSelectedUserType(userType);
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-orange-600">HyperLocal</div>
        <LanguageSelector />
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('welcome')}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Connect with local shops, find products nearby, and support your community
          </p>
        </div>

        {/* User Type Selection */}
        <div className="space-y-4 mb-8">
          {/* Customer Option */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100 hover:border-orange-200 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingBag size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    I'm a {t('customer')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Find products near you instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleGetStarted('customer')}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Shopkeeper Option */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100 hover:border-orange-200 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Store size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    I'm a {t('shopkeeper')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Grow your business online
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleGetStarted('shopkeeper')}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Why HyperLocal?</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700 text-sm">Real-time stock updates from local shops</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700 text-sm">Voice search in multiple languages</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700 text-sm">24/7 AI support for any queries</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700 text-sm">Works even with SMS (no internet needed)</p>
            </div>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">Already have an account?</p>
          <button
            onClick={handleLogin}
            className="text-orange-600 hover:text-orange-700 font-medium text-sm"
          >
            {t('login')}
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default WelcomeScreen;