import React from 'react';

import Tweet from 'components/Tweet';

const Tweets = ({ tweets, noLink }) => {
  if (!tweets) return null;

  return (
    <>
      {tweets.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} noLink={noLink} />
      ))}
    </>
  );
};

export default Tweets;
