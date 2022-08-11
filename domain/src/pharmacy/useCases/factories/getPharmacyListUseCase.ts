import GetPharmacyListUseCase from '../GetPharmacyListUseCase';
import { httpPharmacyRepository } from '../../repository/factory';

export default function getPharmacyListlUseCase({ config }: DomainUseCase) {
  return new GetPharmacyListUseCase({
    repository: httpPharmacyRepository({ config }),
  });
}
