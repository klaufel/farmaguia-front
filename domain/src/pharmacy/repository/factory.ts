import HttpPharmacyRepository from './HttpPharmacyRepository';

export const httpPharmacyRepository = ({ config }: { config: object }) => {
  return new HttpPharmacyRepository({ config, fetcher: {} });
};
