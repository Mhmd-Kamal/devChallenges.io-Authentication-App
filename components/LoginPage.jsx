import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

import OAuthLogin from './OAuthLogin';

export default function LoginPage({}) {
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div>
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
        <button className='py-2 text-white rounded-lg bg-btnBG' type='submit'>
          Login
        </button>
      </form>
      <OAuthLogin />

      <p className='pb-5 text-sm text-center text-icons pt-7'>
        Don’t have an account yet?
        <span className='text-blueText'> Register</span>
      </p>
    </div>
  );
}
