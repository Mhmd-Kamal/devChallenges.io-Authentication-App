import Head from 'next/head';
import Register from '../components/Register';
import Login from '../components/Login';
import PersonalPage from '../components/PersonalPage';
import EditPage from '../components/EditPage';
const Home = () => {
  return (
    <div className='flex flex-col min-h-screen p-5 items-centerS'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/devchallenges.png' />
      </Head>

      <header className='flex justify-between pb-7'>
        <img src={'/devchallenges.svg'} alt='logo' />
        <button>
          <img
            src='/man.png'
            alt='Avatar picture'
            className='w-8 rounded-md aspect-square'
          />
        </button>
      </header>

      <main className='flex flex-col flex-1 w-full'>
        {/* <Register /> */}
        {/* <Login /> */}
        {/* <PersonalPage /> */}
        <EditPage />
      </main>
    </div>
  );
};

export default Home;
