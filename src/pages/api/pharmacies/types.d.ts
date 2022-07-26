type PharmaciesType = {
  address: string;
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
