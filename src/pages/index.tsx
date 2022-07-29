import dynamic from 'next/dynamic';
import Head from 'next/head';
import config from '@pod/config';
import { Suspense } from 'react';

const Map = dynamic(() => import('../components/map'), {
  ssr: false,
  suspense: true,
});

import PharmacyCard from '../components/pharmacyCard';
import Title from '../components/title';

import useDate from '../hooks/useDate';
import { formatDate } from '../date-utils';

interface PageHomeProps {
  guardDates: GuardDatesType[];
  pharmacies: PharmaciesType[];
}

export default function PageHome({ guardDates, pharmacies }: PageHomeProps) {
  const currentDate = useDate();

  const pharmacyOnGuardIds = guardDates.find(
    ({ date }) => date === formatDate(currentDate)
  )?.ids;

  return (
    <>
      <Head>
        <title>Farmacias de guardia en Jumilla - Murcia</title>
        <meta
          name="description"
          content="Podrás comprobar qué farmacia de guardia está abierta en Jumilla, Murcia. También verás los horarios, teléfono y encontrar de todas las farmacias de Jumilla."
        />
      </Head>
      <Title currentDate={currentDate} />
      <div className="flex ">
        <div className="p-4 sm:p-6 w-full max-w-content">
          <ul className="grid gap-6 md:grid-cols-2">
            {pharmacies.map(({ id, ...props }) => (
              <li key={id}>
                <PharmacyCard
                  id={id}
                  isOnGuard={pharmacyOnGuardIds?.includes(id)}
                  currentDate={currentDate}
                  {...props}
                />
              </li>
            ))}
          </ul>
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
            <Map pharmacies={pharmacies} currentDate={currentDate} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const { apiUrl } = config;

  const [pharmacies, guardDates] = await Promise.all([
    await fetch(`${apiUrl}/api/pharmacies`),
    await fetch(`${apiUrl}/api/dates`),
  ]).then((responses) => Promise.all(responses.map((r) => r.json())));

  return { props: { pharmacies, guardDates } };
};
