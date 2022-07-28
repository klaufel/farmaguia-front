import { useState } from 'react';
import cx from 'classnames';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from '@heroicons/react/outline';

import PharmacySchedule from '../pharmacySchedule';

import { formatDate } from '../../date-utils';

interface PharmacyCardProps extends PharmaciesType {
  isOnGuard?: boolean;
  currentDate: Date;
}

const getIsOpen = (startDate: string, endDate: string) => {
  const date = new Date();
  const current = date.getTime();

  const dateFormat = formatDate(date, 'mm/dd/yyyy');

  const x = new Date(`${dateFormat} ${startDate}:00`).getTime();
  const y = new Date(`${dateFormat} ${endDate}:00`).getTime();

  return (Math.min(x, y) <= current && Math.max(x, y) >= current) || false;
};

export default function PharmacyCard({
  isOnGuard,
  address,
  currentDate,
  hours,
  name,
  map,
  phone,
}: PharmacyCardProps) {
  const [showShedule, setShowShedule] = useState(false);
  const currentDay = currentDate.getDay() - 1;

  const nextDay = hours[currentDay + 1];
  const [openHourNextDay] = hours[currentDay + 1][0] || nextDay[0];

  const isOpen = hours[currentDay].reduce(
    (acc, [x, y]) => getIsOpen(x, y) || acc,
    false
  );

  return (
    <div
      className={cx(
        'bg-white p-4 sm:p-6 shadow-lg rounded-xl text-gray-500',
        isOnGuard && 'bg-green-50'
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          {name}
        </h3>
      </div>
      <span className="text-sm flex items-center">
        <PhoneIcon className="w-4 mr-2" />
        {phone}
        <a
          className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-gray-100 ml-2"
          href={`tel:${phone.replace(/ /g, '')}`}
          rel="noreferrer noopener"
        >
          Llamar
        </a>
      </span>
      <span className="text-sm mt-1 flex items-center">
        <LocationMarkerIcon className="w-4 mr-2" />
        {address}
      </span>
      <div className="text-sm mt-1 mb-2">
        <div
          className="inline-flex items-center cursor-pointer"
          onClick={() => setShowShedule(!showShedule)}
        >
          <ClockIcon className="w-4 mr-2" />
          {hours[currentDay].map(([x, y]) => `${x} - ${y}`).join(', ')}
          {showShedule ? (
            <ChevronUpIcon className="w-4 ml-1" />
          ) : (
            <ChevronDownIcon className="w-4 ml-1" />
          )}
        </div>
        {showShedule && (
          <div className="pl-6 pt-2 pb-2">
            <PharmacySchedule hours={hours} />
          </div>
        )}
      </div>
      {isOnGuard || isOpen ? (
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 last:mr-0 mr-1">
          Abierta {isOnGuard && `, de Guardia`}
        </span>
      ) : (
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 last:mr-0 mr-1">
          Cerrada {openHourNextDay && `, abre a las ${openHourNextDay}`}
        </span>
      )}
    </div>
  );
}
