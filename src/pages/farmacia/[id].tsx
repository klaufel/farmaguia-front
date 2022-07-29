import Head from 'next/head';
import config from '@pod/config';

import ContainerDetail from '../../containers/detail';

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
      <ContainerDetail
        guardDates={guardDates}
        pharmacies={pharmacies}
        ubication={ubication}
      />
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { apiUrl } = config;

  const [pharmacies, guardDates] = await Promise.all([
    await fetch(`${apiUrl}/api/pharmacies/?id=${query.id}`),
    await fetch(`${apiUrl}/api/dates`),
  ]).then((responses) => Promise.all(responses.map((r) => r.json())));

  const [{ province, municipality }] = pharmacies;
  const ubication = { municipality, province };

  const seoPage = {
    title: `Farmacias de guardia en ${municipality} - ${ubication.province}`,
    description: `Podrás comprobar qué farmacia de guardia está abierta en ${municipality}, ${province}. También verás los horarios, teléfono y encontrar de todas las farmacias de ${municipality}.`,
  };

  return { props: { guardDates, pharmacies, ubication, seoPage } };
};
