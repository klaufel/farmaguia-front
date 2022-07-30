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

export const getStaticProps = async ({ query }: any) => {
  const seoPage = {
    title: `Farmacias de guardia en `,
    description: `Podrás comprobar qué farmacia de guardia está abierta en  También verás los horarios, teléfono y encontrar de todas las farmacias de.`,
  };

  return { props: { seoPage } };
};
