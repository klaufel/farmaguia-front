type UbicationType = {
  municipality: string;
  province: string;
};

type GuardDatesType = {
  date: string;
  ids: string[];
};

type PharmaciesType = {
  id: string;
  name: string;
  pharmacist: string;
  phone: string;
  address: string;
  municipality: string;
  province: string;
  zipCode: string;
  coordinates: number[];
  email: string;
  sanitaryAuth: string;
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    web: string;
    youtube: string;
  };
  schedule: PharmacyShedule;
  isOnGuard?: boolean;
  isOpen?: boolean;
};

type PharmacyShedule = [string[]][];

type SeoPageType = {
  title: string;
  description: string;
};
