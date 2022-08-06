import GetPharmacyGuardDatesUseCase from '../GetPharmacyGuardDatesUseCase';
import { httpPharmacyRepository } from '../../repository/factory';

export default function getPharmacyGuardDatesUseCase({
  config,
}: DomainUseCase) {
  return new GetPharmacyGuardDatesUseCase({
    repository: httpPharmacyRepository({ config }),
  });
}
