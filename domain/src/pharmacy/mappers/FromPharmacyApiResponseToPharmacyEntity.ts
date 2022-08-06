export default class FromPharmacyApiResponseToPharmacyEntity {
  map(pharmacies: []) {
    return pharmacies.map((pharmacy: { _id: string }) => ({
      id: pharmacy._id,
      ...pharmacy,
    }));
  }
}
