import Link from 'next/link';
import Head from 'next/head';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';

import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

import NavBar from '../components/NavBar';
import OAuthLogin from '../components/OAuthLogin';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { data: session } = useSession();
  console.log(session);

  return (
    <div className='min-h-screen md:flex bg-[#FAFAFB] md:justify-center md:items-center'>
      <div className='flex flex-col md:w-[473px] p-5 md:border rounded-3xl md:border-inputBorder md:p-14'>
        <Head>
          <title>Create Next App</title>
          <link rel='icon' href='/devchallenges.png' />
        </Head>

        <NavBar />
        <main className='flex flex-col flex-1 w-full overflow-hidden'>
          <p className='text-lg font-semibold text-light-text'>Login</p>

          <form className='flex flex-col py-8 '>
            <div
              onClick={() => emailRef.current.focus()}
              className='flex gap-3 p-3 mb-4 border rounded-lg border-inputBorder'
            >
              <EnvelopeIcon className='w-5 text-icons' />
              <input
                ref={emailRef}
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                className='flex-1 placeholder:text-icons'
              />
            </div>
            <div
              onClick={() => passwordRef.current.focus()}
              className='flex gap-3 p-3 mb-6 border rounded-lg border-inputBorder'
            >
              <LockClosedIcon className='w-5 text-icons' />
              <input
                ref={passwordRef}
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                className='flex-1 placeholder:text-icons'
              />
            </div>
            <button
              className='py-2 text-white rounded-lg bg-btnBG'
              type='submit'
            >
              Login
            </button>
          </form>
          <OAuthLogin />

          <p className='pb-5 text-sm text-center text-icons pt-7'>
            Don’t have an account yet?
            <Link href={'/register'}>
              <a className='pl-1 text-blueText'>Register</a>
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
