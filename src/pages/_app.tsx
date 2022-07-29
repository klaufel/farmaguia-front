import type { AppProps } from 'next/app';
import LayoutMain from '../layouts/main';

import '@pod/theme';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutMain>
      <Component {...pageProps} />
    </LayoutMain>
  );
}
