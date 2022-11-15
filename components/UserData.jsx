import PersonalPage from '../components/PersonalPage';
import EditPage from '../components/EditPage';

import { useRef, useState, useEffect } from 'react';

function UserData() {
  const ref = useRef();
  const [width, setWidth] = useState(null);
  const [onEdit, setOnEdit] = useState(false);

  function updateWindowWidth() {
    setWidth(-1 * ref.current.offsetWidth);
    setOnEdit(false);
  }

  useEffect(() => {
    setWidth(-ref.current.offsetWidth);
    window.addEventListener('resize', updateWindowWidth);
    return () => removeEventListener('resize', updateWindowWidth);
  }, []);

  return (
    <div
      ref={ref}
      className='flex w-full transition-transform duration-300'
      style={{ transform: `translate(${onEdit ? width : 0}px)` }}
    >
      <PersonalPage setOnEdit={setOnEdit} />
      <EditPage setOnEdit={setOnEdit} />
    </div>
  );
}

export default UserData;
