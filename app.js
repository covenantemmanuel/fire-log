// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
   
     apiKey: "AIzaSyBV8J2hbd2DFiRukPv6yKYLDr0WfkDoyfk",
    authDomain: "my-first-work-d2cee.firebaseapp.com",
    projectId: "my-first-work-d2cee",
    storageBucket: "my-first-work-d2cee.firebasestorage.app",
    messagingSenderId: "547405307840",
    appId: "1:547405307840:web:39604cc40c649e121ef225",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get DOM elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authStatus = document.getElementById('auth-status');
const authSection = document.getElementById('auth-section');
const userSection = document.getElementById('user-section');
const userEmailSpan = document.getElementById('user-email');

// Event Listeners
registerBtn.addEventListener('click', async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        authStatus.textContent = `User registered: ${userCredential.user.email}`;
    } catch (error) {
        authStatus.textContent = `Registration error: ${error.message}`;
    }
});

loginBtn.addEventListener('click', async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        authStatus.textContent = `User logged in: ${userCredential.user.email}`;
    } catch (error) {
        authStatus.textContent = `Login error: ${error.message}`;
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        authStatus.textContent = "Logged out successfully.";
    } catch (error) {
        authStatus.textContent = `Logout error: ${error.message}`;
    }
});

// Auth State Observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        authSection.style.display = 'none';
        userSection.style.display = 'block';
        userEmailSpan.textContent = user.email;
    } else {
        // User is signed out
        authSection.style.display = 'block';
        userSection.style.display = 'none';
        userEmailSpan.textContent = '';
    }
});