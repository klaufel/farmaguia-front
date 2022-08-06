export default class GetPharmacyListUseCase {
  private repository;
  private mapper;

  // @ts-ignore
  constructor({ repository, mapper }) {
    this.repository = repository;
    this.mapper = mapper;
  }

  async execute(query?: {}) {
    const response = await this.repository.getPharmacyList({ query });
    const data = this.mapper.map(response);
    return data;
  }
}
