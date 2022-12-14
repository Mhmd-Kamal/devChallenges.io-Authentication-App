import { CameraIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useRef, useState } from 'react';

function EditPage({ setOnEdit, userData, setUserData }) {
  const imageUploadRef = useRef();

  const [newUser, setNewUser] = useState(userData);

  function handleChange(e) {
    const { value, name } = e.target;
    setNewUser({ ...newUser, [name]: value });
    console.log(newUser);
  }

  const handleSubmit = async () => {
    setOnEdit(false);
    setUserData(newUser);
    const res = await fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify({ newUser }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      setOnEdit(true);
      setUserData(userData);
    }
  };
  return (
    <div className='flex-shrink-0 w-full pt-3'>
      <button
        onClick={() => setOnEdit(false)}
        className='flex items-center mb-8 cursor-pointer'
      >
        <ChevronLeftIcon className='mr-2 w-7 text-blueText' />
        <span className='text-lg text-blueText'>Back</span>
      </button>

      <section className='md:border border-dark-text rounded-xl md:px-12 md:py-8'>
        <div className='max-w-[460px]'>
          <h1 className='mb-2 text-2xl'>Change Info</h1>
          <p className='text-sm font-medium text-icons'>
            Changes will be reflected to every services
          </p>

          <div className='flex mt-6 gap-7'>
            <div>
              <label htmlFor='image' className='relative cursor-pointer'>
                <img
                  className='w-20 rounded-lg aspect-square'
                  src={newUser.image || '/man.png'}
                  alt='Avatar Image'
                />
                <CameraIcon className='absolute w-6 text-white -translate-x-1/2 -translate-y-1/2 inset-1/2' />
              </label>
              <input
                ref={imageUploadRef}
                className='hidden'
                type='file'
                name='image'
                id='image'
              />
            </div>
            <button
              onClick={() => imageUploadRef.current.click()}
              className='text-sm font-medium cursor-pointer text-icons'
            >
              CHANGE PHOTO
            </button>
          </div>

          <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium text-inputLabel'
                htmlFor='name'
              >
                Name
              </label>
              <input
                className='p-4 border rounded-xl border-inputBorder placeholder:text-inputBorder'
                placeholder='Enter your name...'
                type='text'
                name='name'
                id='name'
                value={newUser.name || ''}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col'>
              <label
                className='text-sm font-medium text-inputLabel'
                htmlFor='bio'
              >
                Bio
              </label>
              <textarea
                className='w-full h-24 p-4 border rounded-xl border-inputBorder placeholder:text-inputBorder'
                placeholder='Enter your bio...'
                name='bio'
                id='bio'
                value={newUser.bio || ''}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium text-inputLabel'
                htmlFor='phone'
              >
                Phone
              </label>
              <input
                className='p-4 border rounded-xl border-inputBorder placeholder:text-inputBorder'
                placeholder='Enter your phone...'
                type='tel'
                name='phone'
                id='phone'
                value={newUser.phone || ''}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium text-inputLabel'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='p-4 border rounded-xl border-inputBorder placeholder:text-inputBorder'
                placeholder='Enter your email...'
                type='email'
                name='email'
                id='email'
                disabled
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium text-inputLabel'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='p-4 border rounded-xl border-inputBorder placeholder:text-inputBorder'
                placeholder='Enter your new password...'
                type='password'
                name='password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSubmit}
              className='px-6 py-2 text-white rounded-lg bg-btnBG max-w-max'
              type='submit'
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditPage;
