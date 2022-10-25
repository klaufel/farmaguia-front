export default class FromPharmacyApiResponseToPharmacyEntityMapper {
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

  private _kebabCase(string: string) {
    return string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  private _getSheduleDay(shedule = []) {
    const sheduleMorning = shedule?.[0] ? [[shedule?.[0], shedule?.[1]]] : [];
    const sheduleAfternoon = shedule?.[2] ? [[shedule?.[2], shedule?.[3]]] : [];

    return [...sheduleMorning, ...sheduleAfternoon];
  }

  private _getShedule(schedule = {}) {
    return [
      this._getSheduleDay(schedule.monday),
      this._getSheduleDay(schedule.tuesday || schedule.monday),
      this._getSheduleDay(schedule.wednesday || schedule.monday),
      this._getSheduleDay(schedule.thursday || schedule.monday),
      this._getSheduleDay(schedule.friday || schedule.monday),
      this._getSheduleDay(schedule.saturday),
      this._getSheduleDay(schedule.sunday),
    ];
  }

  map(pharmacy = {}) {
    const detailUrl =
      '/farmacias/' +
      [pharmacy.province, pharmacy.municipality, pharmacy.slug]
        .map((location) => this._kebabCase(location))
        .join('/');

    return {
      id: pharmacy.id,
      name: pharmacy.name,
      pharmacist: pharmacy.pharmacist,
      phone: pharmacy.phone,
      address: pharmacy.address,
      municipality: pharmacy.municipality,
      province: pharmacy.province,
      zipCode: pharmacy.postal_code,
      email: pharmacy.email,
      sanitaryAuth: pharmacy.sanitary_auth,
      detailUrl,
      images: pharmacy.images ?? [],
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
        web: '',
        youtube: '',
      },
      coordinates: [pharmacy.coordinates.lat, pharmacy.coordinates.long],
      guards: pharmacy.guards ?? [],
      schedule: this._getShedule(pharmacy.schedule),
    };
  }
}
