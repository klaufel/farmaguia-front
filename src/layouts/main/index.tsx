import { type ReactNode } from 'react';

interface LayoutMainProps {
  children: ReactNode;
}

export default function LayoutMain({ children }: LayoutMainProps) {
  return <main className="p-6">{children}</main>;
}
