import { useState } from 'react';

import {
  UserCircleIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid';

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className='relative flex justify-between pb-7'>
      <img src={'/devchallenges.svg'} alt='logo' />
      <button onClick={() => setShowMenu(!showMenu)}>
        <img
          src='/man.png'
          alt='Avatar picture'
          className='w-8 rounded-md aspect-square'
        />
      </button>

      <div
        className={`${
          showMenu ? 'opacity-100 ' : ' opacity-0'
        } absolute transition-all duration-500 right-0 top-10 z-10 w-48 py-4 px-3 border border-dark-text rounded-xl bg-white font-medium text-xs text-inputLabel`}
      >
        <div className='flex gap-3 py-3 px-4 bg-[#f2f2f2] rounded-lg'>
          <UserCircleIcon className='w-4' />
          <p>My Profile</p>
        </div>
        <div className='flex gap-3 pb-5 py-3 px-4 border-b-dark-text border-b'>
          <UserGroupIcon className='w-4' />
          <p>Group Chat</p>
        </div>
        <button className='flex gap-3 pt-5 py-3 px-4 text-pinkText'>
          <ArrowRightOnRectangleIcon className='w-4' />
          <p>Logout</p>
        </button>
      </div>
    </header>
  );
}
