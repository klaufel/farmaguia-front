import { useState, useEffect } from 'react';
import { formatDate } from '../../date-utils';
import useDate from '../useDate';

import { kebabCase } from '../../utils';

interface UsePharmaciesProps {
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

const getIsPharmacyOpen = ({
  schedule,
  currentDate,
}: {
  schedule: PharmacyShedule;
  currentDate: Date;
}) => {
  const currentDay = currentDate.getDay() - 1;
  return schedule[currentDay]?.reduce(
    (acc, [x, y]) => getIsOpen(x, y) || acc,
    false
  );
};

const pharmaciesSorterName = (x: PharmaciesType, y: PharmaciesType) => {
  if (x.name < y.name) return -1;
  if (x.name > y.name) return 1;
  return 0;
};

const pharmaciesSorterGuards = (x: PharmaciesType, y: PharmaciesType) => {
  if (x?.isOnGuard) return -1;
  if (x?.isOpen === y?.isOpen) return 0;
  if (x?.isOpen) return -1;
  return 1;
};

const pharmaciesEntitymapper = ({
  pharmacies,
  currentDate,
}: PharmaciesEntityMapper): PharmaciesType[] => {
  return pharmacies
    .map(({ id, schedule, ...pharmacy }) => ({
      ...pharmacy,
      id,
      schedule,
      detailUrl: `/${kebabCase(pharmacy.province)}/${kebabCase(
        pharmacy.municipality
      )}/${kebabCase(pharmacy.name)}`,
      isOnGuard: pharmacy.guards?.includes(formatDate(currentDate)),
      isOpen: getIsPharmacyOpen({ schedule, currentDate }),
    }))
    .sort(pharmaciesSorterName)
    .sort(pharmaciesSorterGuards);
};

export default function usePharmacies({ pharmacies }: UsePharmaciesProps) {
  const currentDate = useDate();

  const defaultPharmacies = pharmaciesEntitymapper({ pharmacies, currentDate });

  const [pharmaciesList, setPharmaciesList] =
    useState<PharmaciesType[]>(defaultPharmacies);

  useEffect(() => {
    const pharmaciesMapper = pharmaciesEntitymapper({
      pharmacies,
      currentDate,
    });

    setPharmaciesList(pharmaciesMapper);
  }, [currentDate, pharmacies]);

  return {
    currentDate,
    pharmaciesList,
  };
}
