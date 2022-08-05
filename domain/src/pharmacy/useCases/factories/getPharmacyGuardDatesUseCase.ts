import config from '@farmainfo/config';

import GetPharmacyGuardDatesUseCase from '../GetPharmacyGuardDatesUseCase';
import { httpPharmacyRepository } from '../../repository/factory';

export default function getPharmacyGuardDatesUseCase() {
  return new GetPharmacyGuardDatesUseCase({
    repository: httpPharmacyRepository({ config }),
  });
}
