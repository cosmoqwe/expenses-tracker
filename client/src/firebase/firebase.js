import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBx6Tf6HXOHVsikMGVtq9mmgfNIi3-Rv1A",
    authDomain: "expensetracker-49c66.firebaseapp.com",
    projectId: "expensetracker-49c66",
    storageBucket: "expensetracker-49c66.firebasestorage.app",
    messagingSenderId: "651888996636",
    appId: "1:651888996636:web:45a83ace64de0639434ad9",
    measurementId: "G-JC9RMVR4TK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);