import type { NextApiRequest, NextApiResponse } from 'next';

import { guardDates } from './response';

export default function apiPharmacies(
  _req: NextApiRequest,
  res: NextApiResponse<GuardDatesType[]>
) {
  return res.status(200).json(guardDates);
}
