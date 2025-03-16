'use client';

import {useRouter} from "next/navigation";

export default function Logout() {
  const router = useRouter();

  fetch('/api/logout', {
    method: 'GET',
  }).then(() => {
    router.push('/');
  });

}
