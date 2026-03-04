// Firebase Service for NEWS ROBO Android App
// This will work with Capacitor Firebase plugins

import { Capacitor } from '@capacitor/core';

// Check if running on native platform
export const isNative = Capacitor.isNativePlatform();

// Firebase Authentication Service
export class FirebaseAuthService {
  static async signInWithEmail(email: string, password: string) {
    if (!isNative) {
      // Web fallback - use localStorage
      return this.webSignIn(email, password);
    }

    try {
      // Native Firebase Authentication
      const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication');
      
      const result = await FirebaseAuthentication.signInWithEmailAndPassword({
        email,
        password
      });
      
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      console.error('Firebase auth error:', error);
      return {
        success: false,
        error: error
      };
    }
  }

  static async signUpWithEmail(email: string, password: string) {
    if (!isNative) {
      return this.webSignUp(email, password);
    }

    try {
      const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication');
      
      const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
        email,
        password
      });
      
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      console.error('Firebase signup error:', error);
      return {
        success: false,
        error: error
      };
    }
  }

  static async signOut() {
    if (!isNative) {
      localStorage.removeItem('newsrobo_user');
      return { success: true };
    }

    try {
      const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication');
      await FirebaseAuthentication.signOut();
      return { success: true };
    } catch (error) {
      console.error('Firebase signout error:', error);
      return { success: false, error };
    }
  }

  static async getCurrentUser() {
    if (!isNative) {
      const user = localStorage.getItem('newsrobo_user');
      return user ? JSON.parse(user) : null;
    }

    try {
      const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication');
      const result = await FirebaseAuthentication.getCurrentUser();
      return result.user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Web fallback methods
  private static webSignIn(email: string, password: string) {
    // Simulate authentication
    const user = { email, uid: Date.now().toString() };
    localStorage.setItem('newsrobo_user', JSON.stringify(user));
    return { success: true, user };
  }

  private static webSignUp(email: string, password: string) {
    const user = { email, uid: Date.now().toString() };
    localStorage.setItem('newsrobo_user', JSON.stringify(user));
    return { success: true, user };
  }
}

// Firebase Firestore Service
export class FirestoreService {
  static async addDocument(collection: string, data: any) {
    if (!isNative) {
      return this.webAddDocument(collection, data);
    }

    try {
      const { FirebaseFirestore } = await import('@capacitor-firebase/firestore');
      
      const result = await FirebaseFirestore.addDocument({
        reference: collection,
        data: data
      });
      
      return {
        success: true,
        id: result.reference.id
      };
    } catch (error) {
      console.error('Firestore add error:', error);
      return { success: false, error };
    }
  }

  static async getDocuments(collection: string) {
    if (!isNative) {
      return this.webGetDocuments(collection);
    }

    try {
      const { FirebaseFirestore } = await import('@capacitor-firebase/firestore');
      
      const result = await FirebaseFirestore.getCollection({
        reference: collection
      });
      
      return {
        success: true,
        documents: result.snapshots
      };
    } catch (error) {
      console.error('Firestore get error:', error);
      return { success: false, error };
    }
  }

  static async updateDocument(collection: string, id: string, data: any) {
    if (!isNative) {
      return this.webUpdateDocument(collection, id, data);
    }

    try {
      const { FirebaseFirestore } = await import('@capacitor-firebase/firestore');
      
      await FirebaseFirestore.updateDocument({
        reference: `${collection}/${id}`,
        data: data
      });
      
      return { success: true };
    } catch (error) {
      console.error('Firestore update error:', error);
      return { success: false, error };
    }
  }

  static async deleteDocument(collection: string, id: string) {
    if (!isNative) {
      return this.webDeleteDocument(collection, id);
    }

    try {
      const { FirebaseFirestore } = await import('@capacitor-firebase/firestore');
      
      await FirebaseFirestore.deleteDocument({
        reference: `${collection}/${id}`
      });
      
      return { success: true };
    } catch (error) {
      console.error('Firestore delete error:', error);
      return { success: false, error };
    }
  }

  // Web fallback methods
  private static webAddDocument(collection: string, data: any) {
    const id = Date.now().toString();
    const documents = JSON.parse(localStorage.getItem(`firestore_${collection}`) || '[]');
    documents.push({ id, ...data });
    localStorage.setItem(`firestore_${collection}`, JSON.stringify(documents));
    return { success: true, id };
  }

  private static webGetDocuments(collection: string) {
    const documents = JSON.parse(localStorage.getItem(`firestore_${collection}`) || '[]');
    return { success: true, documents };
  }

  private static webUpdateDocument(collection: string, id: string, data: any) {
    const documents = JSON.parse(localStorage.getItem(`firestore_${collection}`) || '[]');
    const index = documents.findIndex((doc: any) => doc.id === id);
    if (index !== -1) {
      documents[index] = { ...documents[index], ...data };
      localStorage.setItem(`firestore_${collection}`, JSON.stringify(documents));
    }
    return { success: true };
  }

  private static webDeleteDocument(collection: string, id: string) {
    const documents = JSON.parse(localStorage.getItem(`firestore_${collection}`) || '[]');
    const filtered = documents.filter((doc: any) => doc.id !== id);
    localStorage.setItem(`firestore_${collection}`, JSON.stringify(filtered));
    return { success: true };
  }
}

// Firebase Storage Service
export class StorageService {
  static async uploadFile(path: string, file: Blob) {
    if (!isNative) {
      return this.webUploadFile(path, file);
    }

    try {
      // Convert blob to base64
      const base64 = await this.blobToBase64(file);
      
      // Upload to Firebase Storage
      // Note: You'll need to implement this with your preferred method
      // as Capacitor doesn't have a direct Storage plugin
      
      return {
        success: true,
        url: `https://storage.googleapis.com/news-robo/${path}`
      };
    } catch (error) {
      console.error('Storage upload error:', error);
      return { success: false, error };
    }
  }

  private static blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private static webUploadFile(path: string, file: Blob) {
    // Web fallback - convert to data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        localStorage.setItem(`storage_${path}`, url);
        resolve({ success: true, url });
      };
      reader.readAsDataURL(file);
    });
  }
}

// Firebase Cloud Messaging Service
export class MessagingService {
  static async requestPermission() {
    if (!isNative) {
      return { success: true, granted: true };
    }

    try {
      const { FirebaseMessaging } = await import('@capacitor-firebase/messaging');
      
      const result = await FirebaseMessaging.requestPermissions();
      return {
        success: true,
        granted: result.receive === 'granted'
      };
    } catch (error) {
      console.error('Messaging permission error:', error);
      return { success: false, error };
    }
  }

  static async getToken() {
    if (!isNative) {
      return { success: true, token: 'web-token-' + Date.now() };
    }

    try {
      const { FirebaseMessaging } = await import('@capacitor-firebase/messaging');
      
      const result = await FirebaseMessaging.getToken();
      return {
        success: true,
        token: result.token
      };
    } catch (error) {
      console.error('Get FCM token error:', error);
      return { success: false, error };
    }
  }

  static async subscribeToTopic(topic: string) {
    if (!isNative) {
      return { success: true };
    }

    try {
      const { FirebaseMessaging } = await import('@capacitor-firebase/messaging');
      
      await FirebaseMessaging.subscribeToTopic({ topic });
      return { success: true };
    } catch (error) {
      console.error('Subscribe to topic error:', error);
      return { success: false, error };
    }
  }
}

// Firebase Analytics Service
export class AnalyticsService {
  static async logEvent(name: string, params?: any) {
    if (!isNative) {
      console.log('Analytics event:', name, params);
      return { success: true };
    }

    try {
      const { FirebaseAnalytics } = await import('@capacitor-firebase/analytics');
      
      await FirebaseAnalytics.logEvent({
        name,
        params
      });
      
      return { success: true };
    } catch (error) {
      console.error('Analytics error:', error);
      return { success: false, error };
    }
  }

  static async setUserId(userId: string) {
    if (!isNative) {
      console.log('Analytics user ID:', userId);
      return { success: true };
    }

    try {
      const { FirebaseAnalytics } = await import('@capacitor-firebase/analytics');
      
      await FirebaseAnalytics.setUserId({ userId });
      return { success: true };
    } catch (error) {
      console.error('Set user ID error:', error);
      return { success: false, error };
    }
  }

  static async setUserProperty(name: string, value: string) {
    if (!isNative) {
      console.log('Analytics user property:', name, value);
      return { success: true };
    }

    try {
      const { FirebaseAnalytics } = await import('@capacitor-firebase/analytics');
      
      await FirebaseAnalytics.setUserProperty({ name, value });
      return { success: true };
    } catch (error) {
      console.error('Set user property error:', error);
      return { success: false, error };
    }
  }
}

export default {
  auth: FirebaseAuthService,
  firestore: FirestoreService,
  storage: StorageService,
  messaging: MessagingService,
  analytics: AnalyticsService
};
