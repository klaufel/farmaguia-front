interface InterfaceRepository {
  config: object;
  fetcher: any;
  fromPharmacyApiResponseToPharmacyEntityMapper: any;
}

// @ts-ignore
export default class HttpPharmacyRepository implements InterfaceRepository {
  private config;
  private fetcher;
  private fromPharmacyApiResponseToPharmacyEntityMapper;

  constructor({
    config,
    fetcher,
    fromPharmacyApiResponseToPharmacyEntityMapper,
  }: InterfaceRepository) {
    this.config = config;
    this.fetcher = fetcher;
    this.fromPharmacyApiResponseToPharmacyEntityMapper =
      fromPharmacyApiResponseToPharmacyEntityMapper;
  }

  async getPharmacyList({ municipality, province }) {
    try {
      const { data: pharmaciesList } = await this.fetcher.get(
        `${this.config.apiUrl}/pharmacies`,
        { params: { municipality, province } }
      );

      return pharmaciesList.map((pharmacy) =>
        this.fromPharmacyApiResponseToPharmacyEntityMapper.map(pharmacy)
      );
    } catch {
      return null;
    }
  }

  async getPharmacyDetail({ pharmacyId }: { pharmacyId: string }) {
    try {
      const { data } = await this.fetcher.get(
        `${this.config.apiUrl}/pharmacies/${pharmacyId}`
      );

      const [pharmacy] = data;

      return [
        this.fromPharmacyApiResponseToPharmacyEntityMapper?.map(pharmacy),
      ];
    } catch {
      return null;
    }
  }
}
