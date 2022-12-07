import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useRef } from 'react';
import { unstable_getServerSession } from 'next-auth/next';

import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

import { authOptions } from './api/auth/[...nextauth]';

import OAuthLogin from '../components/OAuthLogin';

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  async function handleUserRegister(e) {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/login');
    } else {
      console.log(data.message);
    }
  }

  return (
    <div className='min-h-screen md:flex bg-[#FAFAFB] md:justify-center md:items-center'>
      <div className='flex flex-col md:w-[473px] p-5 md:border rounded-3xl md:border-inputBorder md:p-14'>
        <Head>
          <title>Create Next App</title>
          <link rel='icon' href='/devchallenges.png' />
        </Head>

        <img
          className='self-start h-5 mb-7'
          src={'/devchallenges.svg'}
          alt='logo'
        />
        <main className='flex flex-col flex-1 w-full overflow-hidden'>
          <p className='text-lg font-semibold text-light-text'>
            Join thousands of learners from around the world
          </p>
          <p className='pt-4 text-light-text'>
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
          <form onSubmit={handleUserRegister} className='flex flex-col py-8 '>
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
              Start coding now
            </button>
          </form>
          <OAuthLogin />
          <p className='pb-5 text-sm text-center text-icons pt-7'>
            Adready a member?
            <Link href={'/login'} className='pl-1 text-blueText'>
              Login
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}

export default Register;

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}
