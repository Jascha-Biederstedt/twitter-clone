export const getTweet = async (id, prisma) => {
  return await prisma.tweet.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });
};

export const getTweets = async prisma => {
  return await prisma.tweet.findMany({
    where: {},
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  });
};

export const getUserTweets = async (name, prisma) => {
  return await prisma.tweet.findMany({
    where: {
      author: {
        name: name,
      },
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  });
};
