import { useState } from 'react';
import {
  ClockIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from '@heroicons/react/outline';

import useInterval from '../hooks/useInterval';
import PharmacyCard from '../components/pharmacyCard';

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

interface PageHomeProps {
  pharmacies: PharmaciesType[];
}

export default function PageHome({ pharmacies }: PageHomeProps) {
  const currentDate = useDate();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 ">
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
        {pharmacies.map(({ id, ...props }) => (
          <li key={id}>
            <PharmacyCard id={id} currentDate={currentDate} {...props} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://pharmacies-on-duty.vercel.app';

  const [pharmacies, dates] = await Promise.all([
    await fetch(`${apiUrl}/api/pharmacies`),
    await fetch(`${apiUrl}/api/dates`),
  ]).then(async (response) => {
    const responseMap = response.map(async (data) => await data.json());
    const result = await Promise.all(responseMap);
    return result;
  });

  return { props: { pharmacies, dates } };
};
