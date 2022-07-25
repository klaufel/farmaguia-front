import { type ReactNode } from 'react';

import styles from './main.module.css';

interface LayoutMainProps {
  children: ReactNode;
}

export default function LayoutMain({ children }: LayoutMainProps) {
  return <main className={styles.main}>{children}</main>;
}
