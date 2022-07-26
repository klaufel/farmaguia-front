import { useState } from 'react';

import useInterval from '../useInterval';

export default function useDate(delay: number = 60000) {
  const [date, setDate] = useState<Date>(new Date());

  useInterval(() => {
    setDate(new Date());
  }, delay);

  return date;
}
