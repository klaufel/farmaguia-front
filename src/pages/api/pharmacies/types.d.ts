type PharmaciesType = {
  id: string;
  name: string;
  pharmacist: string;
  phone: string;
  address: string;
  city: string;
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
  schedule: [string[]][];
};
