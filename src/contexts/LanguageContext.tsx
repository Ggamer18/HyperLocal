import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  welcome: {
    en: 'Welcome to HyperLocal',
    hi: 'हाइपरलोकल में आपका स्वागत है',
    mr: 'हायपरलोकलमध्ये आपले स्वागत आहे'
  },
  searchPlaceholder: {
    en: 'Search for products near you...',
    hi: 'अपने आस-पास उत्पादों की खोज करें...',
    mr: 'तुमच्या जवळची उत्पादने शोधा...'
  },
  login: {
    en: 'Login',
    hi: 'लॉग इन करें',
    mr: 'लॉगिन'
  },
  signup: {
    en: 'Sign Up',
    hi: 'साइन अप करें',
    mr: 'साइन अप'
  },
  customer: {
    en: 'Customer',
    hi: 'ग्राहक',
    mr: 'ग्राहक'
  },
  shopkeeper: {
    en: 'Shopkeeper',
    hi: 'दुकानदार',
    mr: 'दुकानदार'
  },
  groceries: {
    en: 'Groceries',
    hi: 'किराना',
    mr: 'किराणा'
  },
  dairy: {
    en: 'Dairy & Milk',
    hi: 'डेयरी और दूध',
    mr: 'डेअरी आणि दूध'
  },
  snacks: {
    en: 'Snacks',
    hi: 'नाश्ता',
    mr: 'स्नॅक्स'
  },
  personalCare: {
    en: 'Personal Care',
    hi: 'व्यक्तिगत देखभाल',
    mr: 'वैयक्तिक काळजी'
  },
  inStock: {
    en: 'In Stock',
    hi: 'स्टॉक में',
    mr: 'स्टॉकमध्ये'
  },
  outOfStock: {
    en: 'Out of Stock',
    hi: 'स्टॉक में नहीं',
    mr: 'स्टॉकमध्ये नाही'
  },
  getDirections: {
    en: 'Get Directions',
    hi: 'दिशा-निर्देश',
    mr: 'दिशा मिळवा'
  },
  addProduct: {
    en: 'Add New Product',
    hi: 'नया उत्पाद जोड़ें',
    mr: 'नवीन उत्पादन जोडा'
  },
  dashboard: {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    mr: 'डॅशबोर्ड'
  },
  chatSupport: {
    en: 'Chat Support',
    hi: 'चैट सहायता',
    mr: 'चॅट सपोर्ट'
  },
  travelEssentials: {
    en: 'Travel Essentials',
    hi: 'यात्रा आवश्यकताएं',
    mr: 'प्रवास आवश्यक वस्तू'
  },
  medicine: {
    en: 'Medicine & First Aid',
    hi: 'दवा और प्राथमिक चिकित्सा',
    mr: 'औषध आणि प्राथमिक उपचार'
  },
  quickFood: {
    en: 'Quick Food',
    hi: 'तुरंत खाना',
    mr: 'त्वरित अन्न'
  },
  travelHygiene: {
    en: 'Travel Hygiene',
    hi: 'यात्रा स्वच्छता',
    mr: 'प्रवास स्वच्छता'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('hyperlocal_language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('hyperlocal_language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};