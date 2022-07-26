const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://pharmacies-on-duty.vercel.app';

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
