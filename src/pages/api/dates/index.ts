import type { NextApiRequest, NextApiResponse } from 'next';

import { responseDates } from './responseDates';

export default function apiPharmacies(
  _req: NextApiRequest,
  res: NextApiResponse<GuardDatesType[]>
) {
  return res.status(200).json(responseDates);
}
