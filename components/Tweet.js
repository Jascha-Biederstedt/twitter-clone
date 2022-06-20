import React from 'react';

import timeago from 'lib/timeago';

const Tweet = ({ tweet }) => {
  return (
    <p>
      {timeago.format(new Date(tweet.createdAt))} {tweet.author.name}{' '}
      {tweet.content}
    </p>
  );
};

export default Tweet;
