import type { NextApiRequest, NextApiResponse } from 'next';

export default async function apiPharmacies(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json([
    {
      date: '28/07/2022',
      ids: ['adce57ac-d9be-480c-a405-64d1184b02af'],
    },
    {
      date: '29/07/2022',
      ids: ['61f63444-cce6-40df-821b-fe4e8a818713'],
    },
    {
      date: '30/07/2022',
      ids: ['80d8d8c7-66a2-4326-bb52-e37512f1ffab'],
    },
    {
      date: '31/07/2022',
      ids: ['df3e5088-f0ba-4138-9169-f1edb59b9e61'],
    },
    {
      date: '01/08/2022',
      ids: ['8b92a71b-a83a-4b7a-8ba2-14ea5c5a47ab'],
    },
    {
      date: '02/08/2022',
      ids: ['24675246-01e2-4eb6-9479-f4fd8105f7b7'],
    },
    {
      date: '03/08/2022',
      ids: ['0aedbb5d-fff8-4f2b-a2e3-b4e80a49d2d1'],
    },
    {
      date: '04/08/2022',
      ids: ['dd3ae52b-f9aa-4b1e-9fd4-ad906c9a9b56'],
    },
    {
      date: '05/08/2022',
      ids: ['adce57ac-d9be-480c-a405-64d1184b02af'],
    },
  ]);
}
