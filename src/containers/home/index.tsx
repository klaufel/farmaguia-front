import Link from 'next/link';

export default function ContainerHome({}) {
  return (
    <div
      className="container py-10 px-4 sm:px-6 mx-auto pt-20 pb-40"
      style={{ minHeight: 'calc(100vh - 5rem)' }}
    >
      <div className="text-center mb-20">
        <h1 className="text-lg md:text-2xl font-semibold text-black mb-4">
          Listado farmacias y farmacias de guardia en tu ciudad
        </h1>
        <p className="text-lg max-w-xl m-auto">
          Encuentra farmacias cercanas, farmacias de guardia, 24 horas, con
          envío a domilicio y mucho más
        </p>
      </div>

      <Link href="/murcia/jumilla">
        <a className="flex bg-primary p-4 sm:p-6 shadow-card rounded-xl cursor-pointer max-w-lg m-auto items-center justify-center">
          <h2 className="text-lg font-semibold text-white">
            Farmacias en Jumilla
          </h2>
        </a>
      </Link>
    </div>
  );
}
