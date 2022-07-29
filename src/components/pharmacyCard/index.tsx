import { useState, Suspense } from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from '@heroicons/react/outline';

import { formatDate } from '../../date-utils';

import PharmacySchedule from '../pharmacySchedule';

const PharmacyLabel = dynamic(() => import('../pharmacyLabel'), {
  ssr: false,
  suspense: true,
});

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

const i18n = {
  phone: (str: string) => str.match(/.{1,3}/g)?.join(' '),
};

export default function PharmacyCard({
  isOnGuard,
  address,
  currentDate,
  schedule,
  name,
  phone,
}: PharmacyCardProps) {
  const [showShedule, setShowShedule] = useState(false);
  const currentDay = currentDate.getDay() - 1;

  const isOpen = schedule[currentDay].reduce(
    (acc, [x, y]) => getIsOpen(x, y) || acc,
    false
  );

  return (
    <div
      className={cx(
        'bg-white p-4 sm:p-6 shadow-card rounded-xl text-gray-500',
        isOnGuard && 'bg-green-50'
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>
      <span className="text-sm flex items-center">
        <PhoneIcon className="w-4 mr-2" />
        {i18n.phone(phone)}
        <a
          className="text-xs md:hidden font-semibold inline-block py-1 px-2 uppercase rounded bg-gray-100 ml-2"
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
          {schedule[currentDay].map(([x, y]) => `${x} - ${y}`).join(', ')}
          {showShedule ? (
            <ChevronUpIcon className="w-4 ml-1" />
          ) : (
            <ChevronDownIcon className="w-4 ml-1" />
          )}
        </div>
        {showShedule && (
          <div className="pl-6 pt-2 pb-2">
            <PharmacySchedule schedule={schedule} />
          </div>
        )}
      </div>
      <Suspense fallback={<div style={{ height: '24px' }} />}>
        <PharmacyLabel
          currentDate={currentDate}
          isOnGuard={isOnGuard}
          isOpen={isOpen}
          schedule={schedule}
        />
      </Suspense>
    </div>
  );
}
