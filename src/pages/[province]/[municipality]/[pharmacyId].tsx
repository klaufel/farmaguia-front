import Head from 'next/head';
import domain from '@farmainfo/domain';

import ContainerDetail from '../../../containers/detail';

interface PageListProps {
  pharmacies: PharmaciesType[];
  seoPage: SeoPageType;
  ubication: UbicationType;
}

export default function PageList({
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
      <ContainerDetail pharmacies={pharmacies} ubication={ubication} />
    </>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  const { pharmacyId } = query;
  const pharmacies = await domain
    .get('get_pharmacy_detail_use_case')
    .execute({ pharmacyId });

  const [{ province, municipality, name, zipCode, address, pharmacist }] =
    pharmacies;
  const ubication = { municipality, province };

  const seoPage = {
    title: `${name} ubicada en ${municipality}, ${province}`,
    description: `Podrás comprobar toda la información de la ${name}, como el horario, el turno de guardia y mucha más información. Farmacia regentada por ${pharmacist} en ${address}, ${zipCode} ${municipality}, ${province}.`,
  };

  return { props: { pharmacies, ubication, seoPage } };
};
