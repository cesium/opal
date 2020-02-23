import React, { useState, useEffect } from 'react';
import router from 'next/router';
import AttendeeProfile from '../components/moonstone/AttendeeProfile';
import CompanyProfile from '../components/moonstone/CompanyProfile';
import MoonstoneLayout from '../components/moonstone/MoonstoneLayout';
import { checkUserType, isJWTValid } from '../utils/apiRequests';

export default function Page() {
  const [jwt, setJwt] = useState('');
  const [UUID, setUUID] = useState('');
  const [type, setType] = useState('');


  useEffect(() => {
    let isUserValid = false;
    const result = isJWTValid(localStorage.jwt);
    result.then(
      (res) => {
        if (!res) {
          localStorage.clear();
          router.push('/login');
        }
        setJwt(localStorage.jwt);
        isUserValid = res && localStorage.avatar && localStorage.name;
        setUUID(localStorage.UUID);
        checkUserType(localStorage.jwt).then((data) => setType(data.type));
        if (!isUserValid) router.push('/404');
      },
      () => router.push('/404'),
    );
  }, []);

  if (type === 'attendee' && UUID) {
    return (
      <AttendeeProfile
        UUID={UUID}
        allowEdits
        showMenu
        badgeSectionTitle="Os meus badges"
      />
    );
  }

  if (type === 'company' && jwt) {
    return <CompanyProfile jwt={jwt} />;
  }

  return <MoonstoneLayout />;
}
