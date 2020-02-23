import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AttendeeProfile from '../../components/moonstone/AttendeeProfile';
import MoonstoneLayout from '../../components/moonstone/MoonstoneLayout';
import { isJWTValid, isRegistered } from '../../utils/apiRequests';
import { pushErrorPage } from '../../utils/errorManagement';
import CenteredCircularProgress from '../../components/CenteredCircularProgress';

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
  });
}

export default function Profile() {
  const router = useRouter();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (router.query.id !== undefined) {
      const UUID = router.query.id;
      isRegistered(UUID)
        .then((registered) => {
          if (!registered) {
            router.push(`/signup?id=${UUID}`);
          } else {
            isJWTValid(localStorage.jwt).then((valid) => {
              if (valid) {
                if (localStorage.type === 'company') attributeBadge(UUID);
                setIsDone(true);
              } else pushErrorPage('Unauthorized');
            });
          }
        })
        .catch(() => pushErrorPage('Promise'));
    }
  }, [router]);

  return (
    <>
      {isDone && router.query.id !== undefined ? (
        <AttendeeProfile
          UUID={router.query.id}
          badgeSectionTitle="Badges Conquistados"
        />
      ) : (
        <MoonstoneLayout>
          <CenteredCircularProgress />
        </MoonstoneLayout>
      )}
    </>
  );
}
