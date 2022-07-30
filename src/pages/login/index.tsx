import Link from 'next/link';

import Logo from '../../components/logo';

export default function PageLogin() {
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
          <form className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
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
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                ¿Has olvidado tu contraseña?
              </a>
            </div>
            <button
              type="submit"
              className="w-full block text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center items-center dark:focus:ring-primary/55"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <p className="text-sm font-light text-gray-500 mt-8">
        ¿Todavía no tienes cuenta?{' '}
        <a href="#" className="font-medium text-primary-600 hover:underline">
          Regístrate, ¡es gratis!
        </a>
      </p>
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
