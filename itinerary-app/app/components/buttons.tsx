'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';


export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated') {
    return (
      <Link href={`/`}>
        <Image
          src={'/mememan.webp'}
          width={32}
          height={32}
          alt="Your Name"
        />
        <SignOutButton/>
      </Link>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}