export default function Logo() {
  return (
    <div className="inline-flex items-center">
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
      <span className="ml-2 font-semibold text-lg sm:text-xl mb-0.5 text-primary">
        farmaguia
      </span>
    </div>
  );
}
