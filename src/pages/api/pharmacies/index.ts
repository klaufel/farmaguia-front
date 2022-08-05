import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const data = JSON.stringify({
  collection: 'pharmacies',
  database: 'farmainfo',
  dataSource: 'farmainfo-0',
  filter: { province: 'Murcia' },
});

const config = {
  method: 'post',
  url: 'https://data.mongodb-api.com/app/data-pyzmj/endpoint/data/v1/action/find',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key':
      'kWfKPj1yTEiSEzUTFJcXKJeMjq3LFoZu2DFhWzF99kSHA1R8F6e1be0UI1DD7iZ3',
  },
  data: data,
};

const pharmacyResponseToPharmacyEntityMapper = (pharmacies: []) => {
  return pharmacies.map((pharmacy: { _id: string }) => ({
    id: pharmacy._id,
    ...pharmacy,
  }));
};

export default async function apiPharmacies(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await axios(config);

  const responseMapper = pharmacyResponseToPharmacyEntityMapper(data.documents);

  return res.status(200).json(responseMapper);
}
