import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Spinner from 'components/Spinner';
import NewTweet from 'components/NewTweet';
import Tweets from 'components/Tweets';
import prisma from 'lib/prisma';
import { getTweets } from 'lib/data.js';

export const getServerSideProps = async () => {
  let tweets = await getTweets(prisma);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
};

const Home = ({ tweets }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <Spinner />;

  if (!session) router.push('/');

  return (
    <>
      <NewTweet />
      <Tweets tweets={tweets} />
    </>
  );
};

export default Home;
