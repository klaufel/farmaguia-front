import type { NextApiRequest, NextApiResponse } from 'next';

import { kebabCase } from '../../../utils';
import { pharmaciesResponse } from './pharmaciesResponse';

export default function apiPharmacies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const provinceQuery = req?.query?.province;
  const municipalityQuery = req?.query?.municipality;
  const slugQuery = req?.query?.slug;

  const responseProvince = pharmaciesResponse.filter(
    ({ province }) => kebabCase(province) === provinceQuery
  );

  const responseMunicipality = pharmaciesResponse.filter(
    ({ municipality }) => kebabCase(municipality) === municipalityQuery
  );

  const responseSlug = pharmaciesResponse.filter(
    ({ name }) => kebabCase(name) === slugQuery
  );

  const isOnlyProvince = provinceQuery && !municipalityQuery;
  const responseLocation = isOnlyProvince
    ? responseProvince
    : responseMunicipality;

  const response = slugQuery ? responseSlug : responseLocation;

  return res.status(200).json(response);
}
