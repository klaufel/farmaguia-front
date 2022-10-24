import App from 'next/app';
import type { AppProps } from 'next/app';
import LayoutMain from '../layouts/main';
import { getCookie } from 'cookies-next';
import '@farmainfo/theme';
import '../styles/globals.css';

import UserContextProvider from '../contexts/user';
import LoadingBar from '../components/loadingBar';

type User = {
  userEmail: string | null;
  userId: string | null;
};
interface MyAppProps extends AppProps {
  pageProps: Record<string, any>;
  user: User;
}

export default function MyApp({
  Component,
  pageProps: { hasFooter, hasHeader, ...pageProps },
  user,
}: MyAppProps) {
  return (
    <UserContextProvider defaultValue={user}>
      <LayoutMain hasFooter={hasFooter} hasHeader={hasHeader}>
        <LoadingBar />
        <Component {...pageProps} />
      </LayoutMain>
    </UserContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const user = await getCookie('user', appContext.ctx);
  return { ...appProps, user };
};
