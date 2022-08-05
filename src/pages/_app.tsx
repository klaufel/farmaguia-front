import type { AppProps } from 'next/app';
import LayoutMain from '../layouts/main';

import '@farmainfo/theme';
import '../styles/globals.css';

export default function MyApp({
  Component,
  pageProps: { hasFooter, hasHeader, ...pageProps },
}: AppProps) {
  return (
    <LayoutMain hasFooter={hasFooter} hasHeader={hasHeader}>
      <Component {...pageProps} />
    </LayoutMain>
  );
}
