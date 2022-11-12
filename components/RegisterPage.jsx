import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

import OAuthLogin from './OAuthLogin';

function RegisterPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div>
      <p className='text-lg font-semibold text-light-text'>
        Join thousands of learners from around the world
      </p>
      <p className='pt-4 text-light-text'>
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
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
          Start coding now
        </button>
      </form>
      <OAuthLogin />
      <p className='pb-5 text-sm text-center text-icons pt-7'>
        Adready a member?<span className='text-blueText'> Login</span>
      </p>
    </div>
  );
}

export default RegisterPage;
