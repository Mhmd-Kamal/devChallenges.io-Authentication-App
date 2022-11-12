import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';

import { authOptions } from './api/auth/[...nextauth]';

import NavBar from '../components/NavBar';
import UserData from '../components/UserData';

const Home = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className='flex flex-col min-h-screen p-5 bg-[#FAFAFB]'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/devchallenges.png' />
      </Head>

      <NavBar />

      <main className='flex flex-col flex-1 w-full overflow-hidden'>
        <UserData />
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
