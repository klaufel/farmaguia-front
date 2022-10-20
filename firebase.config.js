import config from '@farmainfo/config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const { firebaseConfig } = config;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
