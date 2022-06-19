import { useSession } from 'next-auth/react';

import Spinner from 'components/Spinner';
import NewTweet from 'components/NewTweet';

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Spinner />;
  }

  return <div>{session ? <NewTweet /> : <p>You are not logged in 😞</p>}</div>;
};

export default Home;
