import Head from 'next/head';
import domain from '@farmainfo/domain';

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
  const [pharmacies, guardDates] = await Promise.all([
    domain.get('get_pharmacy_list_use_case').execute({ query }),
    domain.get('get_pharmacy_guard_dates_use_case').execute(),
  ]);

  const [{ province, municipality }] = pharmacies;
  const ubication = { municipality, province };

  const seoPage = {
    title: `Farmacias de guardia en ${municipality} - ${province}`,
    description: `Podrás comprobar qué farmacia de guardia está abierta en ${municipality}, ${province}. También verás los horarios, teléfono y encontrar de todas las farmacias de ${municipality}.`,
  };

  return { props: { guardDates, pharmacies, ubication, seoPage } };
};
