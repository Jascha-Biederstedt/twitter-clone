import React from 'react';

import prisma from 'lib/prisma';
import { getTweet } from 'lib/data';
import Tweet from 'components/Tweet';

export const getServerSideProps = async ({ params: { id } }) => {
  let tweet = await getTweet(id, prisma);
  tweet = JSON.parse(JSON.stringify(tweet));

  return {
    props: {
      tweet,
    },
  };
};

const SingleTweet = ({ tweet }) => {
  return <Tweet tweet={tweet} />;
};

export default SingleTweet;
