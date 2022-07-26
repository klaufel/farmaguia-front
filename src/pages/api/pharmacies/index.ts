import type { NextApiRequest, NextApiResponse } from 'next';

import { pharmacies } from './response';

export default function apiPharmacies(
  _req: NextApiRequest,
  res: NextApiResponse<PharmaciesType[]>
) {
  return res.status(200).json(pharmacies);
}
