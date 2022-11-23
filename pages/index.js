import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';

import { authOptions } from './api/auth/[...nextauth]';

import NavBar from '../components/NavBar';
import UserData from '../components/UserData';

const Home = ({ user }) => {
  // console.log(user);
  const { data: session } = useSession();
  // console.log(session);
  return (
    <div className='flex flex-col min-h-screen items-center p-5 bg-[#FAFAFB]'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/devchallenges.png' />
      </Head>

      <NavBar />

      <main className='flex flex-col items-center flex-1 w-full overflow-clip max-w-[845px]'>
        <UserData user={user} />
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
      redirect: { destination: '/login', permanent: false },
    };
  }
  const protocol = ctx.req.headers['x-forwarded-proto'] || 'http';

  const res = await fetch(`${protocol}://${ctx.req.headers.host}/api/user`, {
    headers: {
      cookie: ctx.req.headers.cookie || '',
    },
  });
  const { user } = await res.json();

  return { props: { user } };
}
