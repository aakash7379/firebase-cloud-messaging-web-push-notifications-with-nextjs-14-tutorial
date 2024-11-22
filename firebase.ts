import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeXRYT7cuFgdFvNrhTeUcWVbFvpDtdX-k",
  authDomain: "my-app-a1834.firebaseapp.com",
  projectId: "my-app-a1834",
  storageBucket: "my-app-a1834.firebasestorage.app",
  messagingSenderId: "899177227737",
  appId: "1:899177227737:web:1c89ce5e8ff70b519265c8",
  measurementId: "G-QPVSB09Z9F"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
