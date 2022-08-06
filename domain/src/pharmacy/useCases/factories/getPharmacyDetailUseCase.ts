import GetPharmacyDetailUseCase from '../GetPharmacyDetailUseCase';
import { httpPharmacyRepository } from '../../repository/factory';
import { fromPharmacyApiResponseToPharmacyEntity } from '../../mappers/factory';

export default function getPharmacyDetailUseCase({ config }: DomainUseCase) {
  return new GetPharmacyDetailUseCase({
    mapper: fromPharmacyApiResponseToPharmacyEntity(),
    repository: httpPharmacyRepository({ config }),
  });
}
