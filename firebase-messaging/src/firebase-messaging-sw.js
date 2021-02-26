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

console.log('get token from we push notify cccc');
messaging.getToken({}).then((currentToken) => {
    console.log(currentToken);
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log('Send the token to your server and update the UI if necessary.');
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});