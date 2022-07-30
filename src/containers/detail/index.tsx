import { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { kebabCase } from '../../utils';
import Image from 'next/image';

import { GlobeAltIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline';

const i18n = {
  phone: (str: string) => str.match(/.{1,3}/g)?.join(' '),
};

import PharmacySchedule from '../../components/pharmacySchedule';
import PharmacyLabel from '../../components/pharmacyLabel';
const Map = dynamic(() => import('../../components/map'), {
  ssr: false,
  suspense: true,
});

import usePharmacies from '../../hooks/usePharmacies';

interface ContainerListProps {
  guardDates: GuardDatesType[];
  pharmacies: PharmaciesType[];
  ubication: UbicationType;
}

export default function ContainerList({
  guardDates,
  pharmacies,
}: ContainerListProps) {
  const { currentDate, pharmaciesList } = usePharmacies({
    guardDates,
    pharmacies,
  });

  const [pharmacy] = pharmaciesList;
  const {
    name,
    pharmacist,
    address,
    isOnGuard,
    isOpen,
    id,
    schedule,
    email,
    social,
    phone,
    zipCode,
    province,
    municipality,
  } = pharmacy;
  const { web } = social;

  const backUrl = `/${kebabCase(province)}/${kebabCase(municipality)}`;

  const fullAddress = [address, zipCode, municipality, province].join(', ');

  const services = [
    'Atención farmacéutica',
    'Formulación magistral',
    'Dietética y nutrición',
    'Fitoterapia y plantas medicinales',
    'Vida sexual',
    'Higiene bucodental',
    'Ortopedia',
    'Homeopatía',
    'Veterinaria',
    'Óptica',
    'Alimentación infantil',
    'Embarazo y lactancia',
    'Higiene y cuidado infantil',
    'Tratamientos repelentes',
    'Glucemia Colesterol',
    'Facial',
    'Perfumería',
    'Esteticién',
    'Podología',
  ];

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto max-w-6xl py-10 px-4 sm:px-6 ">
        <div className="flex items-end justify-between py-4 mb-4 sm:mb-6 border-b border-gray-100">
          <div className="flex flex-col">
            <h1 className="flex items-center text-lg md:text-2xl font-semibold mb-2">
              {name} en {municipality}
              <div className="flex ml-2">
                <PharmacyLabel
                  currentDate={currentDate}
                  isOnGuard={isOnGuard}
                  isOpen={isOpen}
                  schedule={schedule}
                />
              </div>
            </h1>
            <h2 className="text-sm md:text-lg">{pharmacist}</h2>
          </div>
          <Link href={backUrl} passHref>
            <a className="text-sm md:text-md text-gray-600">
              Volver al listado
            </a>
          </Link>
        </div>
        <div className="flex w-full rounded-2xl overflow-hidden ">
          <Image
            src="/images/pharmacy-mosaic.webp"
            alt={`Fotos de ${name}`}
            width="1104"
            height="548"
          />
        </div>

        <div className="py-10 border-t border-gray-100">
          <h3 className="text-sm md:text-xl font-semibold mb-4">
            Información de la farmacia
          </h3>
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
            <span className="flex items-center">
              <PhoneIcon className="w-4 mr-2" />
              {i18n.phone(phone)}
            </span>
            {web && (
              <span className="flex items-center">
                <GlobeAltIcon className="w-4 mr-2" />
                {web.replace(/(^\w+:|^)\/\//, '')}
              </span>
            )}
            {email && (
              <span className="flex items-center">
                <MailIcon className="w-4 mr-2" />
                {email}
              </span>
            )}
          </div>
        </div>

        <div className="py-10 border-t border-gray-100">
          <h3 className="text-sm md:text-xl font-semibold mb-4">
            Horario y servicio de guardias
          </h3>
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
            <PharmacySchedule schedule={schedule} />
            <div>
              <h4 className="text-gray-800 font-semibold mb-2">
                Fechas de guardias:
              </h4>
              {guardDates
                .filter(({ ids }) => ids.includes(id))
                .map(({ date }) => (
                  <span key={date}>{date}</span>
                ))}
            </div>
          </div>
        </div>

        {services && (
          <div className="py-10 border-t border-gray-100 mt-10">
            <h3 className="text-sm md:text-xl font-semibold mb-4">
              Servicios de esta farmacia
            </h3>
            <ul className="grid md:grid-cols-3 gap-x-6 gap-y-2">
              {services.map((service) => (
                <li key={service} className="text-md">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="py-10 border-t border-gray-100">
          <h3 className="text-sm md:text-xl font-semibold mb-4">Ubicación</h3>
          <address className="not-italic mb-6 block">{fullAddress}</address>
          <div className="w-full h-96 rounded-2xl overflow-hidden bg-map">
            <Suspense fallback={null}>
              <Map
                municipality={municipality}
                pharmacies={pharmaciesList}
                maxZoom={16}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
