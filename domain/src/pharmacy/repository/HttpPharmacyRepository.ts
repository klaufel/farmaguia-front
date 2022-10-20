import config from '@farmainfo/config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const { firebaseConfig } = config;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import {
  collection,
  query,
  where,
  doc,
  limit,
  getDocs,
  getDoc,
} from 'firebase/firestore';

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

  private _kebabCase(string: string) {
    return string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  async getPharmacyList() {
    // const docRef = doc(db, 'pharmacies', '62ed2c6b0e15fbb8b0e80ab1');
    // const docSnap = await getDoc(docRef);

    const pharmaciesSnap = await getDocs(collection(db, 'pharmacies'));
    const pharmaciesList = pharmaciesSnap?.docs.map((doc) => doc.data());

    return pharmaciesList.map((pharmacy) => {
      const detailUrl =
        '/' +
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
        zipCode: pharmacy.zipCode,
        email: pharmacy.email,
        sanitaryAuth: pharmacy.sanitaryAuth,
        detailUrl,
        social: {
          facebook: '',
          instagram: '',
          twitter: '',
          web: '',
          youtube: '',
        },
        coordinates: [pharmacy.coordinates._lat, pharmacy.coordinates._long],
        guards: pharmacy.guards ?? [],
        schedule: [
          pharmacy.schedule.monday ?? [],
          pharmacy.schedule.tuesday ?? [],
          pharmacy.schedule.wednesday ?? [],
          pharmacy.schedule.thursday ?? [],
          pharmacy.schedule.friday ?? [],
          pharmacy.schedule.saturday ?? [],
          pharmacy.schedule.sunday ?? [],
        ],
      };
    });
  }

  async getPharmacyDetail({ pharmacyId }: { pharmacyId: string }) {
    const pharmaciesSnap = await getDocs(collection(db, 'pharmacies'));
    const pharmaciesList = pharmaciesSnap?.docs.map((doc) => doc.data());

    const q = query(
      collection(db, 'pharmacies'),
      where('slug', '==', pharmacyId),
      limit(1)
    );

    const pharmacySnap = await getDocs(q);

    const [pharmacy] = pharmacySnap?.docs.map((doc) => doc.data());

    const detailUrl =
      '/' +
      [pharmacy.province, pharmacy.municipality, pharmacy.slug]
        .map((location) => this._kebabCase(location))
        .join('/');

    return [
      {
        id: pharmacy.id,
        name: pharmacy.name,
        pharmacist: pharmacy.pharmacist,
        phone: pharmacy.phone,
        address: pharmacy.address,
        municipality: pharmacy.municipality,
        province: pharmacy.province,
        zipCode: pharmacy.zipCode,
        email: pharmacy.email,
        sanitaryAuth: pharmacy.sanitaryAuth,
        detailUrl,
        social: {
          facebook: '',
          instagram: '',
          twitter: '',
          web: '',
          youtube: '',
        },
        coordinates: [pharmacy.coordinates._lat, pharmacy.coordinates._long],
        guards: pharmacy.guards ?? [],
        schedule: [
          pharmacy.schedule.monday ?? [],
          pharmacy.schedule.tuesday ?? [],
          pharmacy.schedule.wednesday ?? [],
          pharmacy.schedule.thursday ?? [],
          pharmacy.schedule.friday ?? [],
          pharmacy.schedule.saturday ?? [],
          pharmacy.schedule.sunday ?? [],
        ],
      },
    ];
  }
}
