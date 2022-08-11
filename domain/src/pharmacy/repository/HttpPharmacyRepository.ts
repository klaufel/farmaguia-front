import axios from 'axios';

interface InterfaceRepository {
  config: object;
  fetcher: any;
}

// @ts-ignore
export default class HttpPharmacyRepository implements InterfaceRepository {
  private config;
  private fetcher;

  constructor({ config, fetcher }: InterfaceRepository) {
    this.config = config;
    this.fetcher = fetcher;
  }

  async getPharmacyList() {
    const { default: response } = await import('./storage/murcia.json');
    return response;
  }
}
