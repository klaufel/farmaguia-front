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

  async execute({ pharmacyId }: { pharmacyId: string }) {
    const response = await this.repository.getPharmacyDetail({ pharmacyId });

    return response;
  }
}
