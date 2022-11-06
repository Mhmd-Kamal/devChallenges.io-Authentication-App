import React from 'react';

function PersonalPage() {
  return (
    <div className='pt-3'>
      <h1 className='mb-2 text-2xl text-center'>Personal info</h1>
      <p className='mb-10 text-sm font-light text-center'>
        Basic info, like your name and photo
      </p>
      <section
        id='profile-data'
        className='flex flex-col divide-y divide-dark-text'
      >
        <div className='flex items-center justify-between gap-4 py-5'>
          <div>
            <p className='mb-2 text-2xl'>Profile</p>
            <p className='text-sm font-medium text-icons'>
              Some info may be visible to other people
            </p>
          </div>
          <button className='px-8 py-2 font-medium border border-icons rounded-xl text-icons text-'>
            Edit
          </button>
        </div>
        <div className='flex items-center justify-between py-4'>
          <p className='text-sm font-medium text-inputBorder'>PHOTO</p>
          <img
            src='/man.png'
            alt='Profile Avatar'
            className='w-20 rounded-lg aspect-square'
          />
        </div>
        <div className='flex items-center justify-between py-9'>
          <p className='text-sm font-medium text-inputBorder'>NAME</p>
          <p className='font-medium text-dark-bg '>Xanthe Neal</p>
        </div>
        <div className='flex items-center justify-between py-9'>
          <p className='text-sm font-medium text-inputBorder'>BIO</p>
          <p className='font-medium text-dark-bg '>
            I am a software developer...
          </p>
        </div>
        <div className='flex items-center justify-between py-9'>
          <p className='text-sm font-medium text-inputBorder'>EMAIL</p>
          <p className='font-medium text-dark-bg '>xanthe.neal@gmail.com</p>
        </div>
        <div className='flex items-center justify-between py-9'>
          <p className='text-sm font-medium text-inputBorder'>PASSWORD</p>
          <p className='font-medium text-dark-bg '>************</p>
        </div>
      </section>
    </div>
  );
}

export default PersonalPage;
