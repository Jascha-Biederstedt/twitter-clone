import { getSession } from 'next-auth/react';

import prisma from 'lib/prisma';

const handler = async (req, res) => {
  if (req.method !== 'POST' && req.method !== 'DELETE')
    return res.status(501).end();

  const session = await getSession({ req });

  if (!session)
    return res.status(401).json({ message: 'You are not logged in.' });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) return res.status(401).json({ message: 'User not found.' });

  if (req.method === 'POST') {
    await prisma.tweet.create({
      data: {
        content: req.body.content,
        author: {
          connect: { id: user.id },
        },
      },
    });

    return res.end();
  }

  if (req.method === 'DELETE') {
    const id = req.body.id;

    const tweet = await prisma.tweet.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    if (tweet.author.id !== user.id) {
      return res.status(401).end();
    }

    await prisma.tweet.delete({
      where: { id },
    });

    return res.status(200).end();
  }
};

export default handler;
