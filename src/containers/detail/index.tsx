import config from '@farmainfo/config';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { kebabCase } from '../../utils';
import Image from 'next/image';

import {
  AtSymbolIcon,
  GlobeAltIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const i18n = {
  phone: (str: string) => str.match(/.{1,3}/g)?.join(' '),
};

import Calendar from '../../components/calendar';

import PharmacySchedule from '../../components/pharmacySchedule';
import PharmacyLabel from '../../components/pharmacyLabel';
import Breadcrumb from '../../components/breadcrumb';

const Map = dynamic(() => import('../../components/map'), {
  ssr: false,
});

import usePharmacies from '../../hooks/usePharmacies';

interface ContainerListProps {
  pharmacies: PharmaciesType[];
  ubication: UbicationType;
}

export default function ContainerList({ pharmacies }: ContainerListProps) {
  const { asPath } = useRouter();

  const { currentDate, pharmaciesList } = usePharmacies({ pharmacies });

  const [pharmacy] = pharmaciesList;
  const {
    address,
    email,
    isOnGuard,
    isOpen,
    municipality,
    name,
    pharmacist,
    phone,
    province,
    schedule,
    social,
    zipCode,
    guards,
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
        <Breadcrumb
          items={[
            { label: province, href: `/${kebabCase(province)}` },
            { label: municipality, href: backUrl },
            { label: name },
          ]}
        />
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
        {/* <div className="flex w-full rounded-2xl overflow-hidden border-b border-gray-100" mb-10>
          <Image
            src="/images/pharmacy-mosaic.webp"
            alt={`Fotos de ${name}`}
            width="1104"
            height="548"
          />
        </div> */}
        <div className="py-10">
          <h3 className="text-sm md:text-xl font-semibold mb-4">
            Información de la farmacia
          </h3>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
            <span className="flex items-center">
              <PhoneIcon className="w-4 mr-2" />
              {i18n.phone(phone)}
            </span>
            {email && (
              <span className="flex items-center">
                <AtSymbolIcon className="w-4 mr-2" />
                {email}
              </span>
            )}
            {web && (
              <span className="flex items-center">
                <GlobeAltIcon className="w-4 mr-2" />
                {web.replace(/(^\w+:|^)\/\//, '')}
              </span>
            )}
          </div>
        </div>

        <div className="py-10 border-t border-gray-100">
          <h3 className="text-sm md:text-xl font-semibold mb-4">
            Horario y servicio de guardias
          </h3>
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
            <div>
              <h4 className="text-gray-800 font-semibold mb-2">Horario:</h4>
              <PharmacySchedule schedule={schedule} />
            </div>

            <div>
              <h4 className="text-gray-800 font-semibold mb-2">
                Calendario de guardias:
              </h4>
              <Calendar currentDate={currentDate} selectedDates={guards} />
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
              {/* <Map pharmacies={pharmaciesList} maxZoom={16} /> */}
            </Suspense>
          </div>
        </div>
        <div className="py-10 border-t border-gray-100">
          <h3 className="text-sm md:text-xl font-semibold mb-4">
            ¿Hay algún error en la información?
          </h3>
          <p className="mb-6 block">
            Explícanos qué has detectado para poder corregirlo.
          </p>
          <a
            href={`mailto:${config.email}?subject=${encodeURIComponent(
              `Información errónea en ${name} de ${municipality}`
            )}&body=${encodeURIComponent(
              `Hola. He detectado información errónea en ${name} de ${municipality}.\n\nhttps://farmainfo.app${asPath}\n\n`
            )}`}
            className="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-primary/55"
            rel="noreferrer"
            target="_blank"
          >
            Reportar error
          </a>
        </div>
      </div>
    </div>
  );
}
