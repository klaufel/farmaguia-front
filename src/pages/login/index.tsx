import { type SyntheticEvent, useState, useCallback } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../../firebase.config';

import Logo from '../../components/logo';
import Input from '../../components/input';
import FormControl from '../../components/formControl';

type Error = {
  code: string;
  message: string;
};

export default function PageLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateForm = useCallback((key: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [key]: value }));
  }, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    setError(null);
    setIsLoading(true);

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        localStorage.setItem('user', JSON.stringify(userCredential.user));
      })
      .catch(({ code, message }) => setError({ code, message }))
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-20">
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
            <FormControl label="Email" id="email">
              <Input
                id="email"
                type="email"
                required
                onChange={({ target }) => updateForm('email', target.value)}
              />
            </FormControl>
            <FormControl label="Contraseña" id="password">
              <Input
                id="password"
                type="password"
                required
                onChange={({ target }) => updateForm('password', target.value)}
              />
            </FormControl>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full block text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-semibold rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center items-center dark:focus:ring-primary/55"
            >
              {isLoading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-2 w-4 h-4 text-gray-200 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#fff"
                  />
                </svg>
              )}
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <div className="h-4 mt-6">
        {error && <p className="text-sm text-red-500">{error.code}</p>}
      </div>
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
