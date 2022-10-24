import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './loadingBar.module.css';

function LoadingBar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      return url !== router.asPath && setLoading(true);
    };

    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return loading ? <div className={styles.loadingBar} /> : null;
}

export default memo(LoadingBar);
