import domain from '@farmainfo/domain';
export { default } from './[municipality]';

export const getServerSideProps = async ({ query }: any) => {
  const pharmacies = await domain
    .get('get_pharmacy_list_use_case')
    .execute(query);

  const [{ province }] = pharmacies;
  const ubication = { municipality: province, province };

  const seoPage = {
    title: `Farmacias de guardia en ${province}`,
    description: `Podrás comprobar qué farmacia de guardia está abierta en ${province}. También verás los horarios, teléfono y encontrar de todas las farmacias de ${province}.`,
  };

  return { props: { pharmacies, ubication, seoPage } };
};
