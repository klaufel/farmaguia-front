import type { AppProps } from 'next/app';
import Head from 'next/head';
import LayoutMain from '../layouts/main';

import '@pod/theme';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutMain>
      <Head>
        <title>Listado de farmacias y farmacias de guardia en tu ciudad</title>
        <meta
          name="description"
          content="Podrás comprobar qué farmacia de guardia está abierta en tu ciudad. También verás los horarios, teléfono y la localización de todas las farmacias de tu ciudad."
        />
      </Head>
      <Component {...pageProps} />
    </LayoutMain>
  );
}
