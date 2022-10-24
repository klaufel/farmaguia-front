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

  async getPharmacyList() {
    const { data: pharmaciesList } = await this.fetcher({
      method: 'GET',
      url: '/pharmacies',
      baseURL: this.config.apiUrl,
    });

    return pharmaciesList.map((pharmacy) =>
      this.fromPharmacyApiResponseToPharmacyEntityMapper.map(pharmacy)
    );
  }

  async getPharmacyDetail({ pharmacyId }: { pharmacyId: string }) {
    const { data } = await this.fetcher({
      method: 'GET',
      url: '/pharmacies',
      baseURL: this.config.apiUrl,
    });

    const [pharmacy] = data;

    return [this.fromPharmacyApiResponseToPharmacyEntityMapper.map(pharmacy)];
  }
}
