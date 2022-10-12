import type { AppProps } from 'next/app';
import LayoutMain from '../layouts/main';

import '@farmainfo/theme';
import '../styles/globals.css';

interface MyAppProps extends AppProps {
  pageProps: Record<string, any>;
}

export default function MyApp({
  Component,
  pageProps: { hasFooter, hasHeader, ...pageProps },
}: MyAppProps) {
  return (
    <LayoutMain hasFooter={hasFooter} hasHeader={hasHeader}>
      <Component {...pageProps} />
    </LayoutMain>
  );
}
