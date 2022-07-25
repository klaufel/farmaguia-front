import config from '@pod/config';

const DAYS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

export default function PageHome() {
  const { pharmacies } = config;

  const currentDate = new Date();
  const currentDay = currentDate.getDay() - 1;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Hoy{' '}
        {currentDate.toLocaleString('es-ES', {
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          month: 'long',
          weekday: 'long',
          year: 'numeric',
        })}{' '}
        h.
      </h1>
      <ul className="grid grid-cols-4 gap-6">
        {pharmacies.map(({ id, name, phone, address, hours, map }) => {
          return (
            <li
              key={id}
              className="bg-white p-6 shadow-xl rounded-xl cursor-pointer"
            >
              <div className="text-3xl leading-none">{name}</div>
              <span>
                {phone} - {address}
              </span>
              <div className="w-full">
                {DAYS[currentDay]}:{' '}
                {hours[currentDay]
                  .map(([init, end]) => `${init}h a ${end}h`)
                  .join(' - ')}
              </div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-greem-600 bg-green-200 last:mr-0 mr-1">
                Abierta
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
