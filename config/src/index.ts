const apiUrl = 'https://api.farmainfo.app/api';

const apiInternalUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_VERCEL_URL;

const firebaseConfig = {
  apiKey: 'AIzaSyCdyePcS5EQ_XaUCv4nj5cMlT47e6zoImA',
  authDomain: 'farmainfo-app.firebaseapp.com',
  projectId: 'farmainfo-app',
  storageBucket: 'farmainfo-app.appspot.com',
  messagingSenderId: '703756459168',
  appId: '1:703756459168:web:deedfbcbc2edb7deb67dc5',
  measurementId: 'G-0HQ56NPXT7',
};

const config = {
  apiUrl,
  apiInternalUrl,
  firebaseConfig,
  email: 'info@farmainfo.app',
  GTAG_ID: 'G-GKMMPPEVJK',
  WEEK: {
    DAYS: [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ],
  },
};

export default config;
