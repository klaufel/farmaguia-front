import Head from 'next/head';
import config from '@pod/config';

import ContainerList from '../../containers/list';

interface PageListProps {
  guardDates: GuardDatesType[];
  pharmacies: PharmaciesType[];
  seoPage: SeoPageType;
  ubication: UbicationType;
}

export default function PageList({
  guardDates,
  pharmacies,
  seoPage,
  ubication,
}: PageListProps) {
  const { title, description } = seoPage;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <ContainerList
        guardDates={guardDates}
        pharmacies={pharmacies}
        ubication={ubication}
      />
    </>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  const { apiUrl } = config;

  const [pharmacies, guardDates] = await Promise.all([
    await fetch(
      `${apiUrl}/api/pharmacies/?municipality=${
        query.municipality || 'jumilla'
      }`
    ),
    await fetch(`${apiUrl}/api/dates`),
  ]).then((responses) => Promise.all(responses.map((r) => r.json())));

  const [{ province, municipality }] = pharmacies;
  const ubication = { municipality, province };

  const seoPage = {
    title: `Farmacias de guardia en ${municipality} - ${province}`,
    description: `Podrás comprobar qué farmacia de guardia está abierta en ${municipality}, ${province}. También verás los horarios, teléfono y encontrar de todas las farmacias de ${municipality}.`,
  };

  return { props: { guardDates, pharmacies, ubication, seoPage } };
};
