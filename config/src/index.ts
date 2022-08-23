const apiUrl = 'https://api.farmainfo.app';

const apiInternalUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://locahost:3000'
    : process.env.NEXT_PUBLIC_VERCEL_URL;

const config = {
  apiUrl,
  apiInternalUrl,
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
