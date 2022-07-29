import type { NextApiRequest, NextApiResponse } from 'next';

import { pharmaciesResponse } from './pharmaciesResponse';

const kebabCase = (string: string) => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export default function apiPharmacies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = pharmaciesResponse.filter(
    ({ municipality }) => kebabCase(municipality) === req?.query?.municipality
  );

  return res.status(200).json(response);
}
