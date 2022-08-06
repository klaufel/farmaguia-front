import HttpPharmacyRepository from './HttpPharmacyRepository';

export const httpPharmacyRepository = ({ config }: DomainRepository) => {
  return new HttpPharmacyRepository({ config, fetcher: {} });
};
