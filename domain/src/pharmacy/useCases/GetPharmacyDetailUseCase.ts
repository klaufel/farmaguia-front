export default class GetPharmacyDetailUseCase {
  private repository;
  private mapper;

  // @ts-ignore
  constructor({ repository, mapper }) {
    this.repository = repository;
    this.mapper = mapper;
  }

  private _kebabCase(string: string) {
    return string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  private _getPharmacyBySlug({
    response,
    pharmacyId,
  }: {
    response: [];
    pharmacyId: string;
  }) {
    return response.filter(({ name }) => this._kebabCase(name) === pharmacyId);
  }

  async execute({ pharmacyId }: { pharmacyId: string }) {
    const response = await this.repository.getPharmacyList();
    const filter = this._getPharmacyBySlug({ response, pharmacyId });

    const data = this.mapper.map(filter);

    return data;
  }
}
