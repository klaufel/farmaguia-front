import { type ReactNode } from 'react';

interface LayoutMainProps {
  children: ReactNode;
}

export default function LayoutMain({ children }: LayoutMainProps) {
  return <main>{children}</main>;
}
