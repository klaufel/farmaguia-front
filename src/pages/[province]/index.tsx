import domain from '@farmainfo/domain';
export { default } from './[municipality]';

export const getServerSideProps = async ({ query }: any) => {
  const [pharmacies, guardDates] = await Promise.all([
    domain.get('get_pharmacy_list_use_case').execute({ query }),
    domain.get('get_pharmacy_guard_dates_use_case').execute(),
  ]);

  const [{ province }] = pharmacies;
  const ubication = { municipality: province, province };

  const seoPage = {
    title: `Farmacias de guardia en ${province}`,
    description: `Podrás comprobar qué farmacia de guardia está abierta en ${province}. También verás los horarios, teléfono y encontrar de todas las farmacias de ${province}.`,
  };

  return { props: { guardDates, pharmacies, ubication, seoPage } };
};
