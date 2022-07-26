import { useState } from 'react';
import config from '@pod/config';
import {
  ClockIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from '@heroicons/react/outline';

import useInterval from '../hooks/useInterval';

const DAYS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

const TIMERS = {
  ONE_SECOND: 1000,
};

const useDate = () => {
  const [date, setDate] = useState<Date>(new Date());

  useInterval(() => {
    setDate(new Date());
  }, TIMERS.ONE_SECOND);

  return date;
};

export default function PageHome() {
  const { pharmacies } = config;

  const currentDate = useDate();
  const currentDay = currentDate.getDay() - 1;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">
        Hoy{' '}
        {currentDate.toLocaleString('es-ES', {
          day: 'numeric',
          second: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          month: 'long',
          weekday: 'long',
          year: 'numeric',
        })}{' '}
        h.
      </h1>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pharmacies.map(({ id, name, phone, address, hours, map }) => {
          const nextDay = hours[currentDay + 1];
          const [openHourNextDay] = nextDay[0] || nextDay[1];

          return (
            <li key={id} className="bg-white p-6 shadow-xl rounded-xl ">
              <div className="text-2xl mb-2 ">{name}</div>
              <span className="flex items-center">
                <PhoneIcon className="w-4 mr-1" /> {phone}
              </span>
              <span className="flex items-center">
                <LocationMarkerIcon className="w-4 mr-1" /> {address}
              </span>
              <div className="flex mt-2 mb-2">
                <ClockIcon className="w-4 mr-1" />
                Hoy {DAYS[currentDay].toLowerCase()}:{' '}
                {hours[currentDay]
                  .map(([init, end]) => `${init}h a ${end}h`)
                  .join(' - ')}
              </div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 last:mr-0 mr-1">
                Abierta
              </span>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 last:mr-0 mr-1">
                Cerrada {openHourNextDay && `, abre a las ${openHourNextDay}h`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
