import GetPharmacyDetailUseCase from '../GetPharmacyDetailUseCase';
import { httpPharmacyRepository } from '../../repository/factory';

export default function getPharmacyDetailUseCase({ config }: DomainUseCase) {
  return new GetPharmacyDetailUseCase({
    repository: httpPharmacyRepository({ config }),
  });
}
