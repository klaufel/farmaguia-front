export default class GetPharmacyListUseCase {
  private repository;

  // @ts-ignore
  constructor({ repository }) {
    this.repository = repository;
  }

  async execute(query?: {}) {
    const response = await this.repository.getPharmacyList({ query });

    return response;
  }
}
