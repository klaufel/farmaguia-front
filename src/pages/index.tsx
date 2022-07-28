import dynamic from 'next/dynamic';
import Head from 'next/head';
import config from '@pod/config';

const DynamicMap = dynamic(() => import('../components/map'), {
  ssr: false,
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
    <div className="flex min-h-screen">
      <Head>
        <title>Farmacias de guardia en Jumilla - Murcia</title>
        <meta
          name="description"
          content="Podrás comprobar qué farmacia de guardia está abierta en Jumilla, Murcia. También verás los horarios, teléfono y encontrar de todas las farmacias de Jumilla."
        />
      </Head>
      <div className="p-6 w-full max-w-content">
        <Title currentDate={currentDate} />
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
      {/* <div className="flex-1 sticky h-screen top-0">
        <DynamicMap pharmacies={pharmacies} />
      </div> */}
    </div>
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
