import { type ReactNode } from 'react';

import Footer from '../../components/footer';
import Header from '../../components/header';

interface LayoutMainProps {
  children: ReactNode;
}

export default function LayoutMain({ children }: LayoutMainProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
