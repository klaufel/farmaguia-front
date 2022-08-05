export default class GetPharmacyGuardDatesUseCase {
  private repository;

  // @ts-ignore
  constructor({ repository }) {
    this.repository = repository;
  }

  async execute() {
    const response = await this.repository.getPharmacyGuardDates();
    return response;
  }
}
