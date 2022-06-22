import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Spinner from 'components/Spinner';
import NewTweet from 'components/NewTweet';
import Tweets from 'components/Tweets';
import LoadMore from 'components/LoadMore';
import prisma from 'lib/prisma';
import { getTweets } from 'lib/data.js';

export const getServerSideProps = async () => {
  let tweets = await getTweets(prisma, 2);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      initialTweets: tweets,
    },
  };
};

const Home = ({ initialTweets }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tweets, setTweets] = useState(initialTweets);

  if (status === 'loading') return <Spinner />;

  if (!session) router.push('/');

  if (session && !session.user.name) {
    router.push('/setup');
  }

  return (
    <>
      <NewTweet tweets={tweets} setTweets={setTweets} />
      <Tweets tweets={tweets} />
      <LoadMore tweets={tweets} setTweets={setTweets} />
    </>
  );
};

export default Home;
