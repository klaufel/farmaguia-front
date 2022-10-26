const apiUrl = 'https://api.farmainfo.app/api';

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
  firebaseConfig,
  email: 'info@farmainfo.app',
  map: {
    apiKey: 'AIzaSyATVUSxdgu-upp8c_dfrUbw3CurKETvbd8',
  },
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

export type Config = typeof config;

export default config;
