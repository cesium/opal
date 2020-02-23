import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AttendeeProfile from '../../components/moonstone/AttendeeProfile';
import MoonstoneLayout from '../../components/moonstone/MoonstoneLayout';
import { isJWTValid } from '../../utils/apiRequests';

function attributeBadge(UUID) {
  const endpoint = `${process.env.ENDPOINT}${process.env.API_REDEEMS}`;
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      redeem: {
        // eslint-disable-next-line camelcase
        attendee_id: UUID,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        // ADD ERROR BEHAVIOR
      }
    });
}

export default function Profile() {
  const router = useRouter();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let isUserValid = false;
    const result = isJWTValid(localStorage.jwt);
    result.then(
      (res) => {
        if (!res) router.push('/login');
        isUserValid = res;
        if (!isUserValid) router.push('/404');
        if (localStorage.type === 'company') attributeBadge(router.query.id);
        setIsDone(true);
      },
      () => router.push('/404'),
    );
  }, [router]);

  return (
    <>
      {isDone && router.query.id ? (
        <AttendeeProfile
          UUID={router.query.id}
          badgeSectionTitle="Badges Conquistados"
        />
      ) : (
        <MoonstoneLayout />
      )}
    </>
  );
}
