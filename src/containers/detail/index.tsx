import { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { kebabCase } from '../../utils';

const Map = dynamic(() => import('../../components/map'), {
  ssr: false,
  suspense: true,
});

import usePharmacies from '../../hooks/usePharmacies';

interface ContainerListProps {
  guardDates: GuardDatesType[];
  pharmacies: PharmaciesType[];
  ubication: UbicationType;
}

export default function ContainerList({
  guardDates,
  pharmacies,
  ubication,
}: ContainerListProps) {
  const { municipality, province } = ubication;

  const { currentDate, pharmaciesList } = usePharmacies({
    guardDates,
    pharmacies,
  });

  const [{ name, pharmacist }] = pharmacies;

  const backUrl = `/${kebabCase(province)}/${kebabCase(municipality)}`;

  return (
    <div className="flex">
      <div className="px-4 sm:px-6 pb-8 sm:pb-12 w-full max-w-content">
        <div className="py-4 sm:py-6 mb-4 sm:mb-6 border-b border-gray-100">
          <h1 className="text-lg md:text-2xl font-semibold mb-1">{name}</h1>
          <h2 className="text-md md:text-lg">{pharmacist}</h2>
        </div>
        <Link href={backUrl} passHref>
          <a>Volver al listado</a>
        </Link>
      </div>
      <div
        className="flex-1 sticky hidden sm:block"
        style={{
          top: '5rem',
          height: 'calc(100vh - 5rem)',
          background: '#f7f8f9',
        }}
      >
        <Suspense fallback={null}>
          <Map municipality={municipality} pharmacies={pharmaciesList} />
        </Suspense>
      </div>
    </div>
  );
}
