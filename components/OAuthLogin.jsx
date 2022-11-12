import { signIn } from 'next-auth/react';

export default function OAuthLogin() {
  return (
    <div>
      <p className='pb-5 text-sm text-center text-icons'>
        or continue with these social profile
      </p>
      <ul className='flex justify-center gap-5'>
        <li onClick={() => signIn('google')}>
          <img src='/Google.svg' alt='google signup link' />
        </li>
        <li onClick={() => signIn('facebook')}>
          <img src='/Facebook.svg' alt='facebook signup link' />
        </li>
        <li onClick={() => signIn('twitter')}>
          <img src='/Twitter.svg' alt='twitter signup link' />
        </li>
        <li onClick={() => signIn('github')}>
          <img src='/Github.svg' alt='github signup link' />
        </li>
      </ul>
    </div>
  );
}
