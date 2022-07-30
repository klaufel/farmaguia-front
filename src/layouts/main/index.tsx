import { type ReactNode } from 'react';

import Footer from '../../components/footer';
import Header from '../../components/header';

interface LayoutMainProps {
  children: ReactNode;
  hasFooter?: boolean;
  hasHeader?: boolean;
}

export default function LayoutMain({
  children,
  hasFooter = true,
  hasHeader = true,
}: LayoutMainProps) {
  return (
    <>
      {hasHeader && <Header />}
      <main>{children}</main>
      {hasFooter && <Footer />}
    </>
  );
}
