import Head from 'next/head';

import ContainerHome from '../containers/home';

interface PageHomeProps {
  seoPage: SeoPageType;
}

export default function PageHome({ seoPage }: PageHomeProps) {
  const { title, description } = seoPage;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <ContainerHome />
    </>
  );
}

export const getStaticProps = () => {
  const seoPage = {
    title: 'Listado farmacias y farmacias de guardia en tu ciudad',
    description:
      'Encuentra farmacias cercanas, farmacias de guardia, 24 horas, servicios de las farmacias, ubicación, turnos de guardias y mucha más información.',
  };

  return { props: { seoPage } };
};
