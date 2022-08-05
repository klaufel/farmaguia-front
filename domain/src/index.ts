import getPharmacyGuardDatesUseCase from './pharmacy/useCases/factories/getPharmacyGuardDatesUseCase';
import getPharmacyListUseCase from './pharmacy/useCases/factories/getPharmacyListUseCase';

const useCases = {
  get_pharmacy_guard_dates_use_case: getPharmacyGuardDatesUseCase,
  get_pharmacy_list_use_case: getPharmacyListUseCase,
};

const domain = {
  get: (useCase: keyof typeof useCases) => useCases[useCase](),
};

export default domain;
