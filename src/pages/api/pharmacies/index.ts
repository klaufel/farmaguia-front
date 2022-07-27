import type { NextApiRequest, NextApiResponse } from 'next';

import { pharmacies } from './response';

const pharmaciesMapper = (response) => {
  return response
    .filter(({ city }) => city === 'JUMILLA')
    .map((data) => ({
      id: '24675246-01e2-4eb6-9479-f4fd8105f7b7',
      name: data.name,
      phone: data.phone,
      city: data.city,
      email: data.email,
      web: null,
      address: data.address,
      map: {
        url: `https://www.google.es/maps/place/${encodeURIComponent(
          data.address
        )}`,
        lat: data.location.lat,
        lng: data.location.lng,
      },
      hours: [data.hours, data.hours, data.hours, data.hours, data.hours, []],
    }));
};

export default function apiPharmacies(
  _req: NextApiRequest,
  res: NextApiResponse<PharmaciesType[]>
) {
  return res.status(200).json(pharmacies);
}
