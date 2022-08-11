export default class FromPharmacyApiResponseToPharmacyEntity {
  /**
   * Returned date formated date string elements with left zero digits
   * @example this._getDateSegments(new Date())
   */
  private _getDateSegments(date: Date): {
    day: string;
    month: string;
    year: string;
  } {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return { day, month, year };
  }

  /**
   * Format date into date string 'dd/mm/yyyy' | 'mm/dd/yyyy'
   * @example this._formatDate(new Date(), 'dd/mm/yyyy')
   */
  private _formatDate(
    date: Date,
    format: 'dd/mm/yyyy' | 'mm/dd/yyyy' = 'dd/mm/yyyy'
  ): string {
    const { day, month, year } = this._getDateSegments(date);

    return format.replace('dd', day).replace('mm', month).replace('yyyy', year);
  }

  private _guardsMapper(guards: Date[] = []) {
    return guards.map((guard) => {
      return this._formatDate(new Date(guard));
    });
  }

  map(pharmacies: []) {
    return pharmacies.map(
      ({ _id, ...pharmacy }: { _id: string; guards: Date[] }) => ({
        ...pharmacy,
        id: _id,
        guards: this._guardsMapper(pharmacy.guards),
      })
    );
  }
}
