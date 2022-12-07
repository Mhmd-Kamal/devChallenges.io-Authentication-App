import React from 'react';

function PersonalPage({ setOnEdit, userData }) {
  return (
    <div className='flex-shrink-0 w-full pt-3 '>
      <h1 className='mb-2 text-2xl text-center'>Personal info</h1>
      <p className='mb-10 text-sm font-light text-center'>
        Basic info, like your name and photo
      </p>
      <section
        id='profile-data'
        className='flex flex-col divide-y divide-dark-text md:border border-dark-text rounded-xl'
      >
        <div className='flex items-center justify-between py-5 md:py-7 md:px-12'>
          <div className='w-[190px]'>
            <p className='mb-2 text-2xl'>Profile</p>
            <p className='text-sm font-medium text-icons'>
              Some info may be visible to other people
            </p>
          </div>
          <button
            onClick={() => setOnEdit(true)}
            className='px-8 py-2 font-medium border cursor-pointer border-icons rounded-xl text-icons text-'
          >
            Edit
          </button>
        </div>
        <div className='flex items-center justify-between py-4 md:px-12'>
          <p className='text-sm font-medium text-inputBorder'>PHOTO</p>
          <img
            src={userData.image || '/man.png'}
            alt='Profile Avatar'
            className='w-20 rounded-lg aspect-square'
          />
        </div>
        <div className='flex items-center justify-between py-9 md:px-12'>
          <p className='text-sm font-medium text-inputBorder'>NAME</p>
          <p className='font-medium text-dark-bg '>{userData.name || ''}</p>
        </div>
        <div className='flex items-center justify-between py-9 md:px-12'>
          <p className='text-sm font-medium text-inputBorder'>BIO</p>
          <p className='font-medium text-dark-bg '>
            {userData.bio || 'Add bio...'}
          </p>
        </div>
        <div className='flex items-center justify-between py-9 md:px-12'>
          <p className='text-sm font-medium text-inputBorder'>PHONE</p>
          <p className='font-medium text-dark-bg '>
            {userData.phone || 'Add phone...'}
          </p>
        </div>
        <div className='flex items-center justify-between py-9 md:px-12'>
          <p className='text-sm font-medium text-inputBorder'>EMAIL</p>
          <p className='font-medium text-dark-bg '>{userData.email}</p>
        </div>
        <div className='flex items-center justify-between py-9 md:px-12'>
          <p className='text-sm font-medium text-inputBorder'>PASSWORD</p>
          <p className='font-medium text-dark-bg '>************</p>
        </div>
      </section>
    </div>
  );
}

export default PersonalPage;
