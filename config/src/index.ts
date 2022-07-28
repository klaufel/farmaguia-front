const { NODE_ENV, VERCEL_URL } = process.env;

const apiUrl =
  NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${VERCEL_URL}`;

const config = {
  apiUrl,
  EMAIL: 'info@farmaciasenjumilla.com',
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
