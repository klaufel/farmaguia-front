export default class GetPharmacyDetailUseCase {
  private repository;

  // @ts-ignore
  constructor({ repository }) {
    this.repository = repository;
  }

  async execute({ pharmacyId }: { pharmacyId: string }) {
    const response = await this.repository.getPharmacyDetail({ pharmacyId });

    return response;
  }
}
