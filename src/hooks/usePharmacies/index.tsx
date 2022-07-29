import { useState, useEffect } from 'react';
import { formatDate } from '../../date-utils';
import useDate from '../useDate';

interface UsePharmaciesProps {
  guardDates: GuardDatesType[];
  pharmacies: PharmaciesType[];
}

interface PharmaciesEntityMapper extends UsePharmaciesProps {
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

const getPharmacyOnGuardIds = ({
  guardDates,
  currentDate,
}: {
  guardDates: GuardDatesType[];
  currentDate: Date;
}) => {
  return (
    guardDates.find(({ date }) => date === formatDate(currentDate))?.ids || []
  );
};

const getIsPharmacyOpen = ({
  schedule,
  currentDate,
}: {
  schedule: PharmacyShedule;
  currentDate: Date;
}) => {
  const currentDay = currentDate.getDay() - 1;
  return schedule[currentDay].reduce(
    (acc, [x, y]) => getIsOpen(x, y) || acc,
    false
  );
};

const pharmaciesEntitymapper = ({
  pharmacies,
  guardDates,
  currentDate,
}: PharmaciesEntityMapper): PharmaciesType[] => {
  const pharmacyOnGuardIds = getPharmacyOnGuardIds({ guardDates, currentDate });

  return pharmacies.map(({ id, schedule, ...pharmacy }) => {
    return {
      ...pharmacy,
      id,
      schedule,
      isOnGuard: pharmacyOnGuardIds?.includes(id),
      isOpen: getIsPharmacyOpen({ schedule, currentDate }),
    };
  });
};

export default function usePharmacies({
  guardDates,
  pharmacies,
}: UsePharmaciesProps) {
  const currentDate = useDate();

  const defaultPharmacies = pharmaciesEntitymapper({
    pharmacies,
    guardDates,
    currentDate,
  });

  const [pharmaciesList, setPharmaciesList] =
    useState<PharmaciesType[]>(defaultPharmacies);
  const [pharmacyOnGuardIds, setPharmacyOnGuardIds] = useState<string[]>([]);

  useEffect(() => {
    const pharmaciesMapper = pharmaciesEntitymapper({
      pharmacies,
      guardDates,
      currentDate,
    });
    const pharmacyOnGuardIds = getPharmacyOnGuardIds({
      guardDates,
      currentDate,
    });
    setPharmacyOnGuardIds(pharmacyOnGuardIds);
    setPharmaciesList(pharmaciesMapper);
  }, [currentDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentDate,
    pharmaciesList,
    pharmacyOnGuardIds,
  };
}
