import { useState } from 'react';
import Link from 'next/link';

import Logo from '../../components/logo';

export default function PageLogin() {
  const [_form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError(true);
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link href="/" passHref>
        <a className="mb-8">
          <Logo />
        </a>
      </Link>
      <h1 className="text-xl font-semibold mx-auto text-center text-gray-900 mb-8">
        Inicia sesión en tu cuenta
      </h1>
      <div className="w-full bg-white rounded-lg shadow-card md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
                onChange={({ target: { value } }) =>
                  setForm((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-900"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
                onChange={({ target: { value } }) =>
                  setForm((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500">
                    Recordarme
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full block text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-semibold rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center items-center dark:focus:ring-primary/55"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-6">
          Email o contraseña incorrectos
        </p>
      )}
    </section>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      hasHeader: false,
      hasFooter: false,
    },
  };
};
