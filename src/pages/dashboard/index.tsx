import domain from '@farmainfo/domain';

interface PageDashboard {
  pharmacies: PharmaciesType[];
}

const Th = ({ children }) => (
  <th className="border-bfont-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
    {children}
  </td>
);

export default function PageDashboard({ pharmacies }: PageDashboard) {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-20">
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <Th>id</Th>
            <Th>name</Th>
            <Th>pharmacist</Th>
            <Th>province</Th>
            <Th>municipality</Th>
            <Th>zipCode</Th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {pharmacies.map(
            ({ id, province, municipality, zipCode, name, pharmacist }) => (
              <tr key={id}>
                <Td>{id}</Td>
                <Td>{name}</Td>
                <Td>{pharmacist}</Td>
                <Td>{province}</Td>
                <Td>{municipality}</Td>
                <Td>{zipCode}</Td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </section>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  const pharmacies = await domain
    .get('get_pharmacy_list_use_case')
    .execute(query);

  return {
    props: {
      hasHeader: true,
      hasFooter: false,
      pharmacies,
    },
  };
};
