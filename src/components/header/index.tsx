import Link from 'next/link';

function Logo() {
  return (
    <svg
      className="w-8 sm:w-10 h-auto"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
    >
      <path fill="#3bbb8c" d="M0 43h160v60H0V43Z" />
      <path fill="#3bbb8c" d="M110 0v94H50V0h60Z" />
      <path fill="#ffffff" d="M130 83a50 50 0 1 1-100 0 50 50 0 0 1 100 0Z" />
      <path
        fill="#3bbb8c"
        d="M120 83c0 22-40 77-40 77s-40-55-40-77a40 40 0 1 1 80 0Z"
      />
      <path fill="#ffffff" d="M100 79a20 20 0 1 1-40 0 20 20 0 0 1 40 0Z" />
    </svg>
  );
}

export default function Header() {
  return (
    <div className="h-16 sm:h-20 px-4 sm:px-6 sm:py-4 w-full sticky top-0 left-0 bg-white border-b border-gray-100 flex items-center justify-between z-20">
      <div>
        <Link href="/" passHref>
          <a className="inline-flex items-center">
            <Logo />
            <span
              className="ml-2 font-semibold text-md"
              style={{ color: '#3bbb8c' }}
            >
              Farmacias de guardia
            </span>
          </a>
        </Link>
      </div>
      <button
        type="button"
        className="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-primary/55"
      >
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Iniciar sesión con Google
      </button>
    </div>
  );
}
