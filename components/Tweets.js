import React from 'react';

import Tweet from 'components/Tweet';

const Tweets = ({ tweets }) => {
  if (!tweets) return null;

  return (
    <>
      {tweets.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </>
  );
};

export default Tweets;
