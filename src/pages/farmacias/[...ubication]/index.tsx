import domain from '@farmainfo/domain';

import ContainerList from '../../../containers/list';

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
  return (
    <ContainerList
      pharmacies={pharmacies}
      ubication={ubication}
      seoPage={seoPage}
    />
  );
}

export const getServerSideProps = async ({
  query,
}: {
  query: { ubication: [string, string] };
}) => {
  const pharmacies = await domain.get('get_pharmacy_list_use_case').execute({
    municipality: query?.ubication[1],
    province: query?.ubication[0],
  });

  if (!pharmacies.length) {
    return {
      notFound: true,
    };
  }

  const [{ municipality, province }] = pharmacies;
  const ubication = { municipality, province };

  const seoPage = {
    title: `Farmacias de guardia en ${municipality} - ${province}`,
    description: `Podrás comprobar qué farmacia de guardia está abierta en ${municipality}, ${province}. También verás los horarios, teléfono y encontrar de todas las farmacias de ${municipality}.`,
  };

  return { props: { pharmacies, ubication, seoPage } };
};
