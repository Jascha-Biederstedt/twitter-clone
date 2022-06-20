import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Spinner from 'components/Spinner';

const Setup = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const router = useRouter();

  if (status === 'loading') return <Spinner />;

  if (!session || !session.user) return null;

  if (status !== 'loading' && session.user.name) {
    router.push('/home');
  }

  const handleSubmit = async event => {
    event.preventDefault();

    await fetch('/api/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });

    session.user.name = name;
    router.push('/home');
  };

  return (
    <form className='mt-10 ml-20' onSubmit={handleSubmit}>
      <div className='flex-1 mb-5'>
        <div className='flex-1 mb-5'>Username</div>
        <input
          type='text'
          name='name'
          value={name}
          onChange={event => setName(event.target.value)}
          className='border p-1'
        />
      </div>

      <button className='border px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover'>
        Save
      </button>
    </form>
  );
};

export default Setup;
