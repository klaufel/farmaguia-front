export default class GetPharmacyListUseCase {
  private repository;

  // @ts-ignore
  constructor({ repository }) {
    this.repository = repository;
  }

  async execute({ municipality, province } = {}) {
    const response = await this.repository.getPharmacyList({
      municipality,
      province,
    });

    return response;
  }
}
