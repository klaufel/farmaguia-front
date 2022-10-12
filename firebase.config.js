import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCdyePcS5EQ_XaUCv4nj5cMlT47e6zoImA',
  authDomain: 'farmainfo-app.firebaseapp.com',
  projectId: 'farmainfo-app',
  storageBucket: 'farmainfo-app.appspot.com',
  messagingSenderId: '703756459168',
  appId: '1:703756459168:web:deedfbcbc2edb7deb67dc5',
  measurementId: 'G-0HQ56NPXT7',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
