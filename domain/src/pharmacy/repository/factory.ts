import axios from 'axios';
import HttpPharmacyRepository from './HttpPharmacyRepository';

import { fromPharmacyApiResponseToPharmacyEntityMapper } from '../mappers/factory';

export const httpPharmacyRepository = ({ config }: DomainRepository) => {
  return new HttpPharmacyRepository({
    config,
    fetcher: axios,
    fromPharmacyApiResponseToPharmacyEntityMapper:
      fromPharmacyApiResponseToPharmacyEntityMapper(),
  });
};
