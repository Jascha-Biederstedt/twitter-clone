import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import prisma from 'lib/prisma';
import { getTweet, getReplies } from 'lib/data';
import Tweet from 'components/Tweet';
import Tweets from 'components/Tweets';
import NewReply from 'components/NewReply';

export const getServerSideProps = async ({ params: { id } }) => {
  let tweet = await getTweet(id, prisma);
  tweet = JSON.parse(JSON.stringify(tweet));

  let replies = await getReplies(id, prisma);
  replies = JSON.parse(JSON.stringify(replies));

  return {
    props: {
      tweet,
      replies,
    },
  };
};

const SingleTweet = ({ tweet, replies }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (typeof window !== 'undefined' && tweet.parent) {
    router.push(`/${tweet.parent_data.author.name}/status/${tweet.parent}`);
  }

  const handleDeleteClick = async () => {
    const res = await fetch('/api/tweet', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: tweet.id,
      }),
    });

    if (res.status === 401) {
      alert('Unauthorized');
    }
    if (res.status === 200) {
      router.push('/home');
    }
  };

  return (
    <>
      <Tweet tweet={tweet} />

      {session?.user?.email === tweet.author.email && (
        <div className='flex-1 py-2 m-2 text-center'>
          <a
            href='#'
            className='flex items-center w-12 px-3 py-2 mt-1 text-base font-medium leading-6 text-gray-500 rounded-full hover:bg-color-accent-hover hover:color-accent-hover'
            onClick={handleDeleteClick}
          >
            delete
          </a>
        </div>
      )}

      <NewReply tweet={tweet} />

      <Tweets tweets={replies} noLink={true} />
    </>
  );
};

export default SingleTweet;
