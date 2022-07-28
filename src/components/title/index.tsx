interface TitleProps {
  currentDate: Date;
}

const Logo = () => (
  <div className="w-14 h-auto">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
      <path fill="#3BBB8C" d="M0 43h160v60H0V43Z" />
      <path fill="#3BBB8C" d="M110 0v94H50V0h60Z" />
      <path fill="#fff" d="M130 83a50 50 0 1 1-100 0 50 50 0 0 1 100 0Z" />
      <path
        fill="#3BBB8C"
        d="M120 83c0 22-40 77-40 77s-40-55-40-77a40 40 0 1 1 80 0Z"
      />
      <path fill="#fff" d="M100 79a20 20 0 1 1-40 0 20 20 0 0 1 40 0Z" />
    </svg>
  </div>
);

export default function Title({ currentDate }: TitleProps) {
  return (
    <div className="px-6 py-4 w-full sticky top-0 left-0 border-b bg-white border-gray-200 flex items-center">
      <Logo />
      <div className="ml-6">
        <h1 className="text-xl md:text-2xl mb-1 font-semibold">
          Farmacias de guardia en Jumilla
        </h1>
        <h2 className="text-md md:text-lg">
          Hoy{' '}
          {currentDate.toLocaleString('es-ES', {
            day: 'numeric',
            month: 'long',
            weekday: 'long',
            year: 'numeric',
          })}
        </h2>
      </div>
    </div>
  );
}
