import { useState, Suspense } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from '@heroicons/react/outline';

import PharmacySchedule from '../pharmacySchedule';

const PharmacyLabel = dynamic(() => import('../pharmacyLabel'), {
  ssr: false,
  suspense: true,
});

interface PharmacyCardProps extends PharmaciesType {
  currentDate: Date;
}

const i18n = {
  phone: (str: string) => str.match(/.{1,3}/g)?.join(' '),
};

export default function PharmacyCard({
  address,
  currentDate,
  id,
  isOnGuard,
  isOpen,
  name,
  pharmacist,
  detailUrl,
  phone,
  schedule,
}: PharmacyCardProps) {
  const [showShedule, setShowShedule] = useState(false);
  const currentDay = currentDate.getDay() - 1;

  return (
    <Link href={detailUrl}>
      <div
        className={cx(
          'bg-white p-4 sm:p-6 shadow-card rounded-xl text-gray-500 cursor-pointer',
          isOnGuard && 'bg-green-50'
        )}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          <Link href={detailUrl} passHref>
            <a>{name}</a>
          </Link>
        </h3>
        <h4 className="text-sm font-semibold mb-3">
          <a>{pharmacist}</a>
        </h4>
        <span className="text-sm flex items-center">
          <PhoneIcon className="w-4 mr-2" />
          {i18n.phone(phone)}
        </span>
        <span className="text-sm mt-1 flex items-center">
          <LocationMarkerIcon className="w-4 mr-2" />
          {address}
        </span>
        <div className="text-sm mt-1 mb-3">
          <div
            className="inline-flex items-center cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              setShowShedule(!showShedule);
            }}
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
            <div className="pl-6 pt-2">
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
    </Link>
  );
}
