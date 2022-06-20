import { getUserTweets } from 'lib/data.js';

import prisma from 'lib/prisma';
import Tweets from 'components/Tweets';

export const getServerSideProps = async ({ params }) => {
  let tweets = await getUserTweets(params.name, prisma);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      name: params.name,
      tweets,
    },
  };
};

const UserProfile = ({ name, tweets }) => {
  return (
    <>
      <p className='text-center p-5'>User profile of {name}</p>
      <Tweets tweets={tweets} />
    </>
  );
};

export default UserProfile;
