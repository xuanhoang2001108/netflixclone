import  { initializeApp } from "firebase/app";
import "firebase/messaging";

import { getMessaging, getToken, onMessage} from 'firebase/messaging';
var firebaseConfig = {
  apiKey: "AIzaSyDAgwg8T1PN0Od-Z8Ay0tdQR4jAtqBO8k8",
  authDomain: "netflix-pushnotification.firebaseapp.com",
  projectId: "netflix-pushnotification",
  storageBucket: "netflix-pushnotification.appspot.com",
  messagingSenderId: "467076199226",
  appId: "1:467076199226:web:b417d7d08979e4b8fe9603",
  measurementId: "G-MW0CL2WYBW",
};

initializeApp(firebaseConfig);
const messaging = getMessaging();
export default messaging;

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BLVxG-UJigyfCiEgtdSlv9iCNikaw9C1ry7sy4fH9OxNo6-4leHPWC1ksqgzZ2U8In5QMl_520m2AeBnAug1m9A' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });