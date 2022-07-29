import { type ReactNode } from 'react';

import Header from '../../components/header';

interface LayoutMainProps {
  children: ReactNode;
}

export default function LayoutMain({ children }: LayoutMainProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
