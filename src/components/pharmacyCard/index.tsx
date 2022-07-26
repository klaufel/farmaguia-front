import {
  ClockIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from '@heroicons/react/outline';

interface PharmacyCardProps extends PharmaciesType {
  currentDate: Date;
}

const getIsOpen = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const current = new Date().getTime();
  const x = new Date(`07/26/2022 ${startDate}:00`).getTime();
  const y = new Date(`07/26/2022 ${endDate}:00`).getTime();

  return (Math.min(x, y) <= current && Math.max(x, y) >= current) || false;
};

export default function PharmacyCard({
  address,
  currentDate,
  hours,
  name,
  phone,
}: PharmacyCardProps) {
  const currentDay = currentDate.getDay() - 1;

  const nextDay = hours[currentDay + 1];
  const [openHourNextDay] = hours[currentDay][1] || nextDay[0];

  const startDate = hours[currentDay][0][0];
  const endDate = hours[currentDay][0][1];
  const isOpen = getIsOpen({ startDate, endDate });

  return (
    <div className="bg-white p-6 shadow-xl rounded-xl text-gray-600">
      <h3 className="text-2xl text-gray-900  mb-2 ">{name}</h3>
      <span className="flex items-center">
        <PhoneIcon className="w-4 mr-1" /> {phone}
      </span>
      <span className="flex items-center">
        <LocationMarkerIcon className="w-4 mr-1" /> {address}
      </span>
      <div className="flex mt-2 mb-2">
        <ClockIcon className="w-4 mr-1" />
        {hours[currentDay]
          .map(([init, end]) => `${init}h a ${end}h`)
          .join(' - ')}
      </div>
      {isOpen ? (
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 last:mr-0 mr-1">
          Abierta
        </span>
      ) : (
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 last:mr-0 mr-1">
          Cerrada {openHourNextDay && `, abre a las ${openHourNextDay}h`}
        </span>
      )}
    </div>
  );
}
