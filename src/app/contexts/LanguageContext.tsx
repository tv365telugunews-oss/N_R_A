import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation data for all supported languages
const translations = {
  English: {
    // Common
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    loading: 'Loading...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'Your Hyperlocal News',
    
    // Onboarding
    setupPreferences: 'Setup Your Preferences',
    selectLocation: 'Select Your Location',
    selectState: 'Select State',
    selectCity: 'Select City',
    chooseLanguage: 'Choose Your Language',
    getNewsFromArea: 'Get news from your area',
    readInLanguage: 'Read news in your preferred language',
    changeSettingsLater: 'You can change these settings anytime in the menu',
    getStarted: 'Get Started',
    
    // Terms
    legalPolicy: 'Legal Policy',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    disclaimer: 'Disclaimer',
    acceptContinue: 'Accept & Continue',
    decline: 'Decline',
    
    // Navigation
    home: 'Home',
    buzz: 'Buzz',
    ebooks: 'E-Books',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    
    // News
    topStories: 'Top Stories',
    trending: 'Trending',
    local: 'Local',
    national: 'National',
    international: 'International',
    sports: 'Sports',
    entertainment: 'Entertainment',
    technology: 'Technology',
    business: 'Business',
    
    // Profile
    myProfile: 'My Profile',
    editProfile: 'Edit Profile',
    accountSettings: 'Account Settings',
    
    // Common phrases
    readMore: 'Read More',
    shareNow: 'Share Now',
    download: 'Download',
    views: 'Views',
    likes: 'Likes',
    comments: 'Comments',
    share: 'Share',
  },
  
  Hindi: {
    // Common
    back: 'वापस',
    next: 'आगे',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    search: 'खोजें',
    loading: 'लोड हो रहा है...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'आपकी स्थानीय खबरें',
    
    // Onboarding
    setupPreferences: 'अपनी प्राथमिकताएं सेट करें',
    selectLocation: 'अपना स्थान चुनें',
    selectState: 'राज्य चुनें',
    selectCity: 'शहर चुनें',
    chooseLanguage: 'अपनी भाषा चुनें',
    getNewsFromArea: 'अपने क्षेत्र से समाचार प्राप्त करें',
    readInLanguage: 'अपनी पसंदीदा भाषा में समाचार पढ़ें',
    changeSettingsLater: 'आप इन सेटिंग्स को मेनू में कभी भी बदल सकते हैं',
    getStarted: 'शुरू करें',
    
    // Terms
    legalPolicy: 'कानूनी नीति',
    termsConditions: 'नियम और शर्तें',
    privacyPolicy: 'गोपनीयता नीति',
    disclaimer: 'अस्वीकरण',
    acceptContinue: 'स्वीकार करें और जारी रखें',
    decline: 'अस्वीकार',
    
    // Navigation
    home: 'होम',
    buzz: 'बज़',
    ebooks: 'ई-बुक्स',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    
    // News
    topStories: 'मुख्य समाचार',
    trending: 'ट्रेंडिंग',
    local: 'स्थानीय',
    national: 'राष्ट्रीय',
    international: 'अंतर्राष्ट्रीय',
    sports: 'खेल',
    entertainment: 'मनोरंजन',
    technology: 'तकनीक',
    business: 'व्यापार',
    
    // Profile
    myProfile: 'मेरी प्रोफ़ाइल',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    accountSettings: 'खाता सेटिंग्स',
    
    // Common phrases
    readMore: 'और पढ़ें',
    shareNow: 'अभी साझा करें',
    download: 'डाउनलोड',
    views: 'दृश्य',
    likes: 'पसंद',
    comments: 'टिप्पणियाँ',
    share: 'साझा करें',
  },
  
  Telugu: {
    // Common
    back: 'వెనక్కి',
    next: 'తదుపరి',
    submit: 'సమర్పించు',
    cancel: 'రద్దు చేయి',
    save: 'సేవ్ చేయి',
    delete: 'తొలగించు',
    edit: 'సవరించు',
    search: 'వెతకండి',
    loading: 'లోడ్ అవుతోంది...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'మీ స్థానిక వార్తలు',
    
    // Onboarding
    setupPreferences: 'మీ ప్రాధాన్యతలను సెటప్ చేయండి',
    selectLocation: 'మీ స్థానాన్ని ఎంచుకోండి',
    selectState: 'రాష్ట్రాన్ని ఎంచుకోండి',
    selectCity: 'నగరాన్ని ఎంచుకోండి',
    chooseLanguage: 'మీ భాషను ఎంచుకోండి',
    getNewsFromArea: 'మీ ప్రాంతం నుండి వార్తలను పొందండి',
    readInLanguage: 'మీ ఇష్టమైన భాషలో వార్తలు చదవండి',
    changeSettingsLater: 'మీరు ఈ సెట్టింగ్‌లను ఎప్పుడైనా మెనూలో మార్చవచ్చు',
    getStarted: 'ప్రారంభించండి',
    
    // Terms
    legalPolicy: 'చట్టపరమైన విధానం',
    termsConditions: 'నిబంధనలు & షరతులు',
    privacyPolicy: 'గోప్యతా విధానం',
    disclaimer: 'నిరాకరణ',
    acceptContinue: 'అంగీకరించి కొనసాగించు',
    decline: 'తిరస్కరించు',
    
    // Navigation
    home: 'హోమ్',
    buzz: 'బజ్',
    ebooks: 'ఇ-బుక్స్',
    profile: 'ప్రొఫైల్',
    settings: 'సెట్టింగ్స్',
    logout: 'లాగౌట్',
    
    // News
    topStories: 'ముఖ్య వార్తలు',
    trending: 'ట్రెండింగ్',
    local: 'స్థానిక',
    national: 'జాతీయ',
    international: 'అంతర్జాతీయ',
    sports: 'క్రీడలు',
    entertainment: 'వినోదం',
    technology: 'సాంకేతికత',
    business: 'వ్యాపారం',
    
    // Profile
    myProfile: 'నా ప్రొఫైల్',
    editProfile: 'ప్రొఫైల్ సవరించు',
    accountSettings: 'ఖాతా సెట్టింగ్‌లు',
    
    // Common phrases
    readMore: 'ఇంకా చదవండి',
    shareNow: 'ఇప్పుడే షేర్ చేయండి',
    download: 'డౌన్‌లోడ్',
    views: 'వీక్షణలు',
    likes: 'ఇష్టాలు',
    comments: 'వ్యాఖ్యలు',
    share: 'షేర్',
  },
  
  Tamil: {
    // Common
    back: 'பின்செல்',
    next: 'அடுத்து',
    submit: 'சமர்ப்பிக்கவும்',
    cancel: 'ரத்துசெய்',
    save: 'சேமி',
    delete: 'நீக்கு',
    edit: 'திருத்து',
    search: 'தேடு',
    loading: 'ஏற்றுகிறது...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'உங்கள் உள்ளூர் செய்திகள்',
    
    // Onboarding
    setupPreferences: 'உங்கள் விருப்பங்களை அமைக்கவும்',
    selectLocation: 'உங்கள் இடத்தைத் தேர்ந்தெடுக்கவும்',
    selectState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
    selectCity: 'நகரத்தைத் தேர்ந்தெடுக்கவும்',
    chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    getNewsFromArea: 'உங்கள் பகுதியிலிருந்து செய்திகளைப் பெறுங்கள்',
    readInLanguage: 'உங்கள் விருப்ப மொழியில் செய்திகளைப் படியுங்கள்',
    changeSettingsLater: 'நீங்கள் இந்த அமைப்புகளை எப்போதும் மெனுவில் மாற்றலாம்',
    getStarted: 'தொடங்குங்கள்',
    
    // Terms
    legalPolicy: 'சட்ட கொள்கை',
    termsConditions: 'விதிமுறைகள் & நிபந்தனைகள்',
    privacyPolicy: 'தனியுரிமை கொள்கை',
    disclaimer: 'மறுப்பு',
    acceptContinue: 'ஏற்று தொடரவும்',
    decline: 'மறு',
    
    // Navigation
    home: 'முகப்பு',
    buzz: 'பஸ்',
    ebooks: 'மின் புத்தகங்கள்',
    profile: 'சுயவிவரம்',
    settings: 'அமைப்புகள்',
    logout: 'வெளியேறு',
    
    // News
    topStories: 'முக்கிய செய்திகள்',
    trending: 'டிரெண்டிங்',
    local: 'உள்ளூர்',
    national: 'தேசிய',
    international: 'சர்வதேச',
    sports: 'விளையாட்டு',
    entertainment: 'பொழுதுபோக்கு',
    technology: 'தொழில்நுட்பம்',
    business: 'வணிகம்',
    
    // Profile
    myProfile: 'எனது சுயவிவரம்',
    editProfile: 'சுயவிவரத்தைத் திருத்து',
    accountSettings: 'கணக்கு அமைப்புகள்',
    
    // Common phrases
    readMore: 'மேலும் வாசிக்க',
    shareNow: 'இப்போது பகிரவும்',
    download: 'பதிவிறக்கு',
    views: 'பார்வைகள்',
    likes: 'விருப்பங்கள்',
    comments: 'கருத்துகள்',
    share: 'பகிர்',
  },
  
  Kannada: {
    // Common
    back: 'ಹಿಂದೆ',
    next: 'ಮುಂದೆ',
    submit: 'ಸಲ್ಲಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    save: 'ಉಳಿಸಿ',
    delete: 'ಅಳಿಸಿ',
    edit: 'ಸಂಪಾದಿಸಿ',
    search: 'ಹುಡುಕಿ',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'ನಿಮ್ಮ ಸ್ಥಳೀಯ ಸುದ್ದಿ',
    
    // Onboarding
    setupPreferences: 'ನಿಮ್ಮ ಆದ್ಯತೆಗಳನ್ನು ಹೊಂದಿಸಿ',
    selectLocation: 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectState: 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectCity: 'ನಗರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    chooseLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    getNewsFromArea: 'ನಿಮ್ಮ ಪ್ರದೇಶದಿಂದ ಸುದ್ದಿಗಳನ್ನು ಪಡೆಯಿರಿ',
    readInLanguage: 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ಸುದ್ದಿಗಳನ್ನು ಓದಿ',
    changeSettingsLater: 'ನೀವು ಈ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಮೆನುವಿನಲ್ಲಿ ಯಾವಾಗ ಬೇಕಾದರೂ ಬದಲಾಯಿಸಬಹುದು',
    getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
    
    // Terms
    legalPolicy: 'ಕಾನೂನು ನೀತಿ',
    termsConditions: 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು',
    privacyPolicy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
    disclaimer: 'ನಿರಾಕರಣೆ',
    acceptContinue: 'ಒಪ್ಪಿಕೊಳ್ಳಿ ಮತ್ತು ಮುಂದುವರಿಸಿ',
    decline: 'ನಿರಾಕರಿಸಿ',
    
    // Navigation
    home: 'ಮುಖಪುಟ',
    buzz: 'ಬಜ್',
    ebooks: 'ಇ-ಪುಸ್ತಕಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    logout: 'ಲಾಗ್ಔಟ್',
    
    // News
    topStories: 'ಪ್ರಮುಖ ಸುದ್ದಿಗಳು',
    trending: 'ಟ್ರೆಂಡಿಂಗ್',
    local: 'ಸ್ಥಳೀಯ',
    national: 'ರಾಷ್ಟ್ರೀಯ',
    international: 'ಅಂತರರಾಷ್ಟ್ರೀಯ',
    sports: 'ಕ್ರೀಡೆ',
    entertainment: 'ಮನರಂಜನೆ',
    technology: 'ತಂತ್ರಜ್ಞಾನ',
    business: 'ವ್ಯಾಪಾರ',
    
    // Profile
    myProfile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    editProfile: 'ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ',
    accountSettings: 'ಖಾತೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    
    // Common phrases
    readMore: 'ಇನ್ನಷ್ಟು ಓದಿ',
    shareNow: 'ಈಗ ಹಂಚಿಕೊಳ್ಳಿ',
    download: 'ಡೌನ್‌ಲೋಡ್',
    views: 'ವೀಕ್ಷಣೆಗಳು',
    likes: 'ಇಷ್ಟಗಳು',
    comments: 'ಕಾಮೆಂಟ್‌ಗಳು',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
  },
  
  Malayalam: {
    // Common
    back: 'തിരികെ',
    next: 'അടുത്തത്',
    submit: 'സമർപ്പിക്കുക',
    cancel: 'റദ്ദാക്കുക',
    save: 'സംരക്ഷിക്കുക',
    delete: 'ഇല്ലാതാക്കുക',
    edit: 'എഡിറ്റ് ചെയ്യുക',
    search: 'തിരയുക',
    loading: 'ലോഡ് ചെയ്യുന്നു...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'നിങ്ങളുടെ പ്രാദേശിക വാർത്തകൾ',
    
    // Onboarding
    setupPreferences: 'നിങ്ങളുടെ മുൻഗണനകൾ സജ്ജമാക്കുക',
    selectLocation: 'നിങ്ങളുടെ സ്ഥലം തിരഞ്ഞെടുക്കുക',
    selectState: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
    selectCity: 'നഗരം തിരഞ്ഞെടുക്കുക',
    chooseLanguage: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
    getNewsFromArea: 'നിങ്ങളുടെ പ്രദേശത്തുനിന്ന് വാർത്തകൾ നേടുക',
    readInLanguage: 'നിങ്ങൾക്ക് ഇഷ്ടപ്പെട്ട ഭാഷയിൽ വാർത്തകൾ വായിക്കുക',
    changeSettingsLater: 'നിങ്ങൾക്ക് ഈ ക്രമീകരണങ്ങൾ എപ്പോൾ വേണമെങ്കിലും മെനുവിൽ മാറ്റാം',
    getStarted: 'ആരംഭിക്കുക',
    
    // Terms
    legalPolicy: 'നിയമ നയം',
    termsConditions: 'നിബന്ധനകളും വ്യവസ്ഥകളും',
    privacyPolicy: 'സ്വകാര്യതാ നയം',
    disclaimer: 'നിരാകരണം',
    acceptContinue: 'അംഗീകരിച്ച് തുടരുക',
    decline: 'നിരസിക്കുക',
    
    // Navigation
    home: 'ഹോം',
    buzz: 'ബസ്',
    ebooks: 'ഇ-പുസ്തകങ്ങൾ',
    profile: 'പ്രൊഫൈൽ',
    settings: 'ക്രമീകരണങ്ങൾ',
    logout: 'ലോഗൗട്ട്',
    
    // News
    topStories: 'പ്രധാന വാർത്തകൾ',
    trending: 'ട്രെൻഡിംഗ്',
    local: 'പ്രാദേശിക',
    national: 'ദേശീയ',
    international: 'അന്തർദേശീയ',
    sports: 'കായികം',
    entertainment: 'വിനോദം',
    technology: 'സാങ്കേതികവിദ്യ',
    business: 'ബിസിനസ്',
    
    // Profile
    myProfile: 'എന്റെ പ്രൊഫൈൽ',
    editProfile: 'പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക',
    accountSettings: 'അക്കൗണ്ട് ക്രമീകരണങ്ങൾ',
    
    // Common phrases
    readMore: 'കൂടുതൽ വായിക്കുക',
    shareNow: 'ഇപ്പോൾ പങ്കിടുക',
    download: 'ഡൗൺലോഡ്',
    views: 'കാഴ്ചകൾ',
    likes: 'ഇഷ്ടങ്ങൾ',
    comments: 'അഭിപ്രായങ്ങൾ',
    share: 'പങ്കിടുക',
  },
  
  Bengali: {
    // Common
    back: 'ফিরে যান',
    next: 'পরবর্তী',
    submit: 'জমা দিন',
    cancel: 'বাতিল করুন',
    save: 'সংরক্ষণ করুন',
    delete: 'মুছুন',
    edit: 'সম্পাদনা করুন',
    search: 'অনুসন্ধান করুন',
    loading: 'লোড হচ্ছে...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'আপনার স্থানীয় সংবাদ',
    
    // Onboarding
    setupPreferences: 'আপনার পছন্দগুলি সেট করুন',
    selectLocation: 'আপনার অবস্থান নির্বাচন করুন',
    selectState: 'রাজ্য নির্বাচন করুন',
    selectCity: 'শহর নির্বাচন করুন',
    chooseLanguage: 'আপনার ভাষা বেছে নিন',
    getNewsFromArea: 'আপনার এলাকা থেকে সংবাদ পান',
    readInLanguage: 'আপনার পছন্দের ভাষায় সংবাদ পড়ুন',
    changeSettingsLater: 'আপনি যেকোনো সময় মেনুতে এই সেটিংস পরিবর্তন করতে পারেন',
    getStarted: 'শুরু করুন',
    
    // Terms
    legalPolicy: 'আইনি নীতি',
    termsConditions: 'শর্তাবলী',
    privacyPolicy: 'গোপনীয়তা নীতি',
    disclaimer: 'দাবিত্যাগ',
    acceptContinue: 'গ্রহণ করুন এবং চালিয়ে যান',
    decline: 'প্রত্যাখ্যান করুন',
    
    // Navigation
    home: 'হোম',
    buzz: 'বাজ',
    ebooks: 'ই-বুক',
    profile: 'প্রোফাইল',
    settings: 'সেটিংস',
    logout: 'লগআউট',
    
    // News
    topStories: 'প্রধান সংবাদ',
    trending: 'ট্রেন্ডিং',
    local: 'স্থানীয়',
    national: 'জাতীয়',
    international: 'আন্তর্জাতিক',
    sports: 'ক্রীড়া',
    entertainment: 'বিনোদন',
    technology: 'প্রযুক্তি',
    business: 'ব্যবসা',
    
    // Profile
    myProfile: 'আমার প্রোফাইল',
    editProfile: 'প্রোফাইল সম্পাদনা করুন',
    accountSettings: 'অ্যাকাউন্ট সেটিংস',
    
    // Common phrases
    readMore: 'আরও পড়ুন',
    shareNow: 'এখনই শেয়ার করুন',
    download: 'ডাউনলোড',
    views: 'দর্শন',
    likes: 'পছন্দ',
    comments: 'মন্তব্য',
    share: 'শেয়ার',
  },
  
  Gujarati: {
    // Common
    back: 'પાછળ',
    next: 'આગળ',
    submit: 'સબમિટ કરો',
    cancel: 'રદ કરો',
    save: 'સાચવો',
    delete: 'કાઢી નાખો',
    edit: 'સંપાદિત કરો',
    search: 'શોધો',
    loading: 'લોડ થઈ રહ્યું છે...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'તમારા સ્થાનિક સમાચાર',
    
    // Onboarding
    setupPreferences: 'તમારી પસંદગીઓ સેટ કરો',
    selectLocation: 'તમારું સ્થાન પસંદ કરો',
    selectState: 'રાજ્ય પસંદ કરો',
    selectCity: 'શહેર પસંદ કરો',
    chooseLanguage: 'તમારી ભાષા પસંદ કરો',
    getNewsFromArea: 'તમારા વિસ્તારમાંથી સમાચાર મેળવો',
    readInLanguage: 'તમારી પસંદગીની ભાષામાં સમાચાર વાંચો',
    changeSettingsLater: 'તમે આ સેટિંગ્સ કોઈપણ સમયે મેનુમાં બદલી શકો છો',
    getStarted: 'શરૂ કરો',
    
    // Terms
    legalPolicy: 'કાનૂની નીતિ',
    termsConditions: 'નિયમો અને શરતો',
    privacyPolicy: 'ગોપનીયતા નીતિ',
    disclaimer: 'અસ્વીકરણ',
    acceptContinue: 'સ્વીકારો અને ચાલુ રાખો',
    decline: 'નકારો',
    
    // Navigation
    home: 'હોમ',
    buzz: 'બઝ',
    ebooks: 'ઈ-પુસ્તકો',
    profile: 'પ્રોફાઇલ',
    settings: 'સેટિંગ્સ',
    logout: 'લોગઆઉટ',
    
    // News
    topStories: 'મુખ્ય સમાચાર',
    trending: 'ટ્રેન્ડિંગ',
    local: 'સ્થાનિક',
    national: 'રાષ્ટ્રીય',
    international: 'આંતરરાષ્ટ્રીય',
    sports: 'રમતગમત',
    entertainment: 'મનોરંજન',
    technology: 'ટેકનોલોજી',
    business: 'વ્યવસાય',
    
    // Profile
    myProfile: 'મારી પ્રોફાઇલ',
    editProfile: 'પ્રોફાઇલ સંપાદિત કરો',
    accountSettings: 'એકાઉન્ટ સેટિંગ્સ',
    
    // Common phrases
    readMore: 'વધુ વાંચો',
    shareNow: 'હમણાં શેર કરો',
    download: 'ડાઉનલોડ',
    views: 'દૃશ્યો',
    likes: 'પસંદ',
    comments: 'ટિપ્પણીઓ',
    share: 'શેર કરો',
  },
  
  Punjabi: {
    // Common
    back: 'ਵਾਪਸ',
    next: 'ਅੱਗੇ',
    submit: 'ਸਬਮਿਟ ਕਰੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    save: 'ਸੁਰੱਖਿਅਤ ਕਰੋ',
    delete: 'ਮਿਟਾਓ',
    edit: 'ਸੰਪਾਦਿਤ ਕਰੋ',
    search: 'ਖੋਜੋ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'ਤੁਹਾਡੀ ਸਥਾਨਕ ਖ਼ਬਰ',
    
    // Onboarding
    setupPreferences: 'ਆਪਣੀਆਂ ਤਰਜੀਹਾਂ ਸੈੱਟ ਕਰੋ',
    selectLocation: 'ਆਪਣਾ ਸਥਾਨ ਚੁਣੋ',
    selectState: 'ਰਾਜ ਚੁਣੋ',
    selectCity: 'ਸ਼ਹਿਰ ਚੁਣੋ',
    chooseLanguage: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ',
    getNewsFromArea: 'ਆਪਣੇ ਖੇਤਰ ਤੋਂ ਖ਼ਬਰਾਂ ਪ੍ਰਾਪਤ ਕਰੋ',
    readInLanguage: 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਖ਼ਬਰਾਂ ਪੜ੍ਹੋ',
    changeSettingsLater: 'ਤੁਸੀਂ ਇਹਨਾਂ ਸੈਟਿੰਗਾਂ ਨੂੰ ਕਿਸੇ ਵੀ ਸਮੇਂ ਮੀਨੂ ਵਿੱਚ ਬਦਲ ਸਕਦੇ ਹੋ',
    getStarted: 'ਸ਼ੁਰੂ ਕਰੋ',
    
    // Terms
    legalPolicy: 'ਕਾਨੂੰਨੀ ਨੀਤੀ',
    termsConditions: 'ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ',
    privacyPolicy: 'ਗੋਪਨੀਯਤਾ ਨੀਤੀ',
    disclaimer: 'ਬੇਦਾਅਵਾ',
    acceptContinue: 'ਸਵੀਕਾਰ ਕਰੋ ਅਤੇ ਜਾਰੀ ਰੱਖੋ',
    decline: 'ਅਸਵੀਕਾਰ ਕਰੋ',
    
    // Navigation
    home: 'ਘਰ',
    buzz: 'ਬੱਜ਼',
    ebooks: 'ਈ-ਬੁੱਕਸ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
    settings: 'ਸੈਟਿੰਗਾਂ',
    logout: 'ਲੌਗਆਉਟ',
    
    // News
    topStories: 'ਮੁੱਖ ਖ਼ਬਰਾਂ',
    trending: 'ਟ੍ਰੈਂਡਿੰਗ',
    local: 'ਸਥਾਨਕ',
    national: 'ਰਾਸ਼ਟਰੀ',
    international: 'ਅੰਤਰਰਾਸ਼ਟਰੀ',
    sports: 'ਖੇਡਾਂ',
    entertainment: 'ਮਨੋਰੰਜਨ',
    technology: 'ਤਕਨਾਲੋਜੀ',
    business: 'ਵਪਾਰ',
    
    // Profile
    myProfile: 'ਮੇਰਾ ਪ੍ਰੋਫਾਈਲ',
    editProfile: 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ',
    accountSettings: 'ਖਾਤਾ ਸੈਟਿੰਗਾਂ',
    
    // Common phrases
    readMore: 'ਹੋਰ ਪੜ੍ਹੋ',
    shareNow: 'ਹੁਣੇ ਸਾਂਝਾ ਕਰੋ',
    download: 'ਡਾਊਨਲੋਡ',
    views: 'ਦ੍ਰਿਸ਼',
    likes: 'ਪਸੰਦ',
    comments: 'ਟਿੱਪਣੀਆਂ',
    share: 'ਸਾਂਝਾ ਕਰੋ',
  },
  
  Marathi: {
    // Common
    back: 'मागे',
    next: 'पुढे',
    submit: 'सबमिट करा',
    cancel: 'रद्द करा',
    save: 'जतन करा',
    delete: 'हटवा',
    edit: 'संपादित करा',
    search: 'शोधा',
    loading: 'लोड होत आहे...',
    
    // Branding
    newsRobo: 'NEWS ROBO',
    tagline: 'तुमच्या स्थानिक बातम्या',
    
    // Onboarding
    setupPreferences: 'तुमची प्राधान्ये सेट करा',
    selectLocation: 'तुमचे स्थान निवडा',
    selectState: 'राज्य निवडा',
    selectCity: 'शहर निवडा',
    chooseLanguage: 'तुमची भाषा निवडा',
    getNewsFromArea: 'तुमच्या क्षेत्रातील बातम्या मिळवा',
    readInLanguage: 'तुमच्या आवडत्या भाषेत बातम्या वाचा',
    changeSettingsLater: 'तुम्ही या सेटिंग्ज कधीही मेनूमध्ये बदलू शकता',
    getStarted: 'सुरू करा',
    
    // Terms
    legalPolicy: 'कायदेशीर धोरण',
    termsConditions: 'अटी आणि शर्ती',
    privacyPolicy: 'गोपनीयता धोरण',
    disclaimer: 'अस्वीकरण',
    acceptContinue: 'स्वीकारा आणि सुरू ठेवा',
    decline: 'नकार द्या',
    
    // Navigation
    home: 'मुख्यपृष्ठ',
    buzz: 'बझ',
    ebooks: 'ई-पुस्तके',
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्ज',
    logout: 'लॉगआउट',
    
    // News
    topStories: 'मुख्य बातम्या',
    trending: 'ट्रेंडिंग',
    local: 'स्थानिक',
    national: 'राष्ट्रीय',
    international: 'आंतरराष्ट्रीय',
    sports: 'क्रीडा',
    entertainment: 'मनोरंजन',
    technology: 'तंत्रज्ञान',
    business: 'व्यवसाय',
    
    // Profile
    myProfile: 'माझे प्रोफाइल',
    editProfile: 'प्रोफाइल संपादित करा',
    accountSettings: 'खाते सेटिंग्ज',
    
    // Common phrases
    readMore: 'अधिक वाचा',
    shareNow: 'आता शेअर करा',
    download: 'डाउनलोड',
    views: 'दृश्ये',
    likes: 'आवडी',
    comments: 'टिप्पण्या',
    share: 'शेअर करा',
  },
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('newsrobo_language') || 'English';
  });

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('newsrobo_language', lang);
  };

  const t = (key: string): string => {
    const langData = translations[language as keyof typeof translations] || translations.English;
    return langData[key as keyof typeof langData] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
