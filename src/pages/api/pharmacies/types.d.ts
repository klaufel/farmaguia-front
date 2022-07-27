type PharmaciesType = {
  address: string;
  city: string;
  email?: string;
  id: string;
  map: {
    url: string;
    lat: number;
    lng: number;
  };
  name: string;
  phone: string;
  web: string;
  hours: string[][][];
};
