import type { NextApiRequest, NextApiResponse } from 'next';

import { pharmaciesResponse } from './pharmaciesResponse';

export default function apiPharmacies(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json(pharmaciesResponse);
}
