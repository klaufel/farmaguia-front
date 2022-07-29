import Head from 'next/head';
import config from '@pod/config';

import ContainerDetail from '../../../containers/detail';

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

export const getServerSideProps = async ({ query }: any) => {
  const { apiUrl } = config;

  const [pharmacies, guardDates] = await Promise.all([
    await fetch(`${apiUrl}/api/pharmacies/?slug=${query.pharmacyId}`),
    await fetch(`${apiUrl}/api/dates`),
  ]).then((responses) => Promise.all(responses.map((r) => r.json())));

  const [{ province, municipality, name, zipCode, address, pharmacist }] =
    pharmacies;
  const ubication = { municipality, province };

  const seoPage = {
    title: `${name} ubicada en ${municipality}, ${province}`,
    description: `Podrás comprobar toda la información de la ${name}, como el horario, el turno de guardia y mucha más información. Farmacia regentada por ${pharmacist} en ${address}, ${zipCode} ${municipality}, ${province}.`,
  };

  return { props: { guardDates, pharmacies, ubication, seoPage } };
};
