import { useSession } from 'next-auth/react';

import Spinner from 'components/Spinner';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <div>
      {session ? <p>You are logged in!</p> : <p>You are not logged in 😞</p>}
    </div>
  );
}
