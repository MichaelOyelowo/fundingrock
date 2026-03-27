// =============== FIREBASE CONFIG ===============
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } 
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrITBySoELew7yVPWDGhMOAi4Jcv_MeR8",
    authDomain: "funding-rock-test.firebaseapp.com",
    projectId: "funding-rock-test",
    storageBucket: "funding-rock-test.firebasestorage.app",
    messagingSenderId: "951369109356",
    appId: "1:951369109356:web:9b7a0cfbd5deee057ded49",
    measurementId: "G-H3J33GJGD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// =============== SIGN UP ===============
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        const status = document.getElementById('signup-status');
        const btn = document.getElementById('signup-btn');

        // Validate
        if (password !== confirm) {
            status.textContent = 'Passwords do not match.';
            status.style.color = '#ff4444';
            return;
        }
        if (password.length < 8) {
            status.textContent = 'Password must be at least 8 characters.';
            status.style.color = '#ff4444';
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Creating account...';

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            status.textContent = '✓ Account created! Redirecting...';
            status.style.color = '#D9FF00';
            setTimeout(() => window.location.href = 'dashboard.html', 2000);
        } catch (error) {
            status.style.color = '#ff4444';
            switch(error.code) {
                case 'auth/email-already-in-use':
                    status.textContent = 'This email is already registered.';
                    break;
                case 'auth/invalid-email':
                    status.textContent = 'Please enter a valid email.';
                    break;
                default:
                    status.textContent = 'Something went wrong. Please try again.';
            }
        } finally {
            btn.disabled = false;
            btn.textContent = 'Create Account';
        }
    });
}

// =============== LOGIN ===============
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const status = document.getElementById('login-status');
        const btn = document.getElementById('login-btn');

        btn.disabled = true;
        btn.textContent = 'Logging in...';

        try {
            await signInWithEmailAndPassword(auth, email, password);
            status.textContent = '✓ Login successful! Redirecting...';
            status.style.color = '#D9FF00';
            setTimeout(() => window.location.href = 'dashboard.html', 2000);
        } catch (error) {
            status.style.color = '#ff4444';
            switch(error.code) {
                case 'auth/invalid-credential':
                    status.textContent = 'Invalid email or password.';
                    break;
                case 'auth/too-many-requests':
                    status.textContent = 'Too many attempts. Please try again later.';
                    break;
                default:
                    status.textContent = 'Something went wrong. Please try again.';
            }
        } finally {
            btn.disabled = false;
            btn.textContent = 'Log In';
        }
    });
}

// =============== GOOGLE LOGIN ===============
const googleBtns = document.querySelectorAll('.google-btn');
googleBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('Google login success:', user.email);
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Google error code:', error.code);
            console.error('Google error message:', error.message);
            
            // Show error to user
            const status = document.getElementById('login-status') || 
                          document.getElementById('signup-status');
            if (status) {
                status.style.color = '#ff4444';
                switch(error.code) {
                    case 'auth/popup-blocked':
                        status.textContent = 'Popup was blocked. Please allow popups for this site.';
                        break;
                    case 'auth/popup-closed-by-user':
                        status.textContent = 'Sign in was cancelled.';
                        break;
                    case 'auth/unauthorized-domain':
                        status.textContent = 'This domain is not authorized. Please contact support.';
                        break;
                    default:
                        status.textContent = 'Google sign in failed. Please try again.';
                }
            }
        }
    });
});

// =============== PASSWORD TOGGLE ===============
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
        btn.textContent = input.type === 'password' ? '👁' : '🙈';
    });
});