importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDAgwg8T1PN0Od-Z8Ay0tdQR4jAtqBO8k8",
  authDomain: "netflix-pushnotification.firebaseapp.com",
  projectId: "netflix-pushnotification",
  storageBucket: "netflix-pushnotification.appspot.com",
  messagingSenderId: "467076199226",
  appId: "1:467076199226:web:b417d7d08979e4b8fe9603",
  measurementId: "G-MW0CL2WYBW",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});