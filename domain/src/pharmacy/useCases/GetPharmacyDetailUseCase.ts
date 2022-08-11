export default class GetPharmacyDetailUseCase {
  private repository;

  // @ts-ignore
  constructor({ repository }) {
    this.repository = repository;
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
    const detail = this._getPharmacyBySlug({ response, pharmacyId });

    return detail;
  }
}
