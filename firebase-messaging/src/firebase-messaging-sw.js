// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAP3XaY98n3SuPzWYyH8Dvu7Zx3FcloUds",
    authDomain: "fir-messaging-adb82.firebaseapp.com",
    projectId: "fir-messaging-adb82",
    storageBucket: "fir-messaging-adb82.appspot.com",
    messagingSenderId: "25422322591",
    appId: "1:25422322591:web:bc0e8bf2bf944577d63baa",
    measurementId: "G-EFDYTKP2D7"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js mydemo] Received background message ', payload);

    // Customize notification here
    const notificationTitle = "myministry"
    const notificationOptions = {
        body: "body",
        icon: 'assets/images/logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);

});