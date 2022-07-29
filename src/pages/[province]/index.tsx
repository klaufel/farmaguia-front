import config from '@pod/config';
export { default } from './[municipality]';

export const getServerSideProps = async ({ query }: any) => {
  const { apiUrl } = config;

  const [pharmacies, guardDates] = await Promise.all([
    await fetch(
      `${apiUrl}/api/pharmacies/?province=${query.province || 'murcia'}`
    ),
    await fetch(`${apiUrl}/api/dates`),
  ]).then((responses) => Promise.all(responses.map((r) => r.json())));

  const [{ province }] = pharmacies;
  const ubication = { municipality: province, province };

  const seoPage = {
    title: `Farmacias de guardia en ${province}`,
    description: `Podrás comprobar qué farmacia de guardia está abierta en ${province}. También verás los horarios, teléfono y encontrar de todas las farmacias de ${province}.`,
  };

  return { props: { guardDates, pharmacies, ubication, seoPage } };
};
