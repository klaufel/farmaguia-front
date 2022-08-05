import config from '@farmainfo/config';

import GetPharmacyListUseCase from '../GetPharmacyListUseCase';
import { httpPharmacyRepository } from '../../repository/factory';

export default function getPharmacyGuardDatesUseCase() {
  return new GetPharmacyListUseCase({
    repository: httpPharmacyRepository({ config }),
  });
}
