import type { NextApiRequest, NextApiResponse } from 'next';

import { dates } from './response';

export default function apiPharmacies(
  _req: NextApiRequest,
  res: NextApiResponse<DatesType[]>
) {
  return res.status(200).json(dates);
}
