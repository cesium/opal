import fetch from 'isomorphic-unfetch';

async function isJWTValid(jwt) {
  const endpoint = `${process.env.ENDPOINT}${process.env.API_USER_INFO}`;
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then(
    (res) => res.json(),
    (error) => {
      return {
        error,
      };
    },
  );
  if (response.error) return false;
  return true;
}

// function isRegistered(UUID) {
//   const endpoint = `${process.env.ENDPOINT}${process.env.API_IS_REGISTERED}/${UUID}`;
//   const response = fetch(endpoint, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   }).then(
//     (res) => res.json(),
//     (error) => {
//       return {
//         error,
//       };
//     },
//   );
//   if (response.error) return false;
//   return true;
// }

function changeNickname(nickname, jwt, UUID) {
  const endpoint = `${process.env.ENDPOINT}${process.env.API_ATTENDEES}/${UUID}`;
  const response = fetch(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ attendee: { nickname } }),
  }).then(
    (res) => res.json(),
    (error) => console.log(error),
  );
  return response;
}

const companyUpdateAvatar = (jwt, badgeId, setIsLoading, setErrorMsg) => {
  const apiEndpoint = `${process.env.ENDPOINT}${process.env.API_BADGES}/${badgeId}`;
  fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(
      (res) => res.json(),
      (err) => {
        localStorage.clear();
        setIsLoading(false);
        setErrorMsg(err);
      },
    )
    .then(
      (res) => {
        localStorage.avatar = res.data.avatar;
      },
      () => localStorage.clear(),
    );
};

const companyUpdateLocalStorage = (jwt, setIsLoading, setErrorMsg) => {
  localStorage.type = 'company';
  const apiEndpoint = process.env.ENDPOINT + process.env.API_COMPANY;
  fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(
      (res) => res.json(),
      (err) => {
        localStorage.clear();
        setIsLoading(false);
        setErrorMsg(err);
      },
    )
    .then(
      (res) => {
        localStorage.jwt = jwt;
        localStorage.email = res.email;
        localStorage.name = res.name;
        localStorage.sponsorship = res.sponsorship;
        companyUpdateAvatar(jwt, res.badge_id, setIsLoading, setErrorMsg);
      },
      () => localStorage.clear(),
    );
};

const attendeeUpdateLocalStorage = (jwt, setIsLoading, setErrorMsg) => {
  localStorage.type = 'attendee';
  const apiEndpoint = process.env.ENDPOINT + process.env.API_ATTENDEE;
  fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(
      (res) => res.json(),
      (err) => {
        localStorage.clear();
        setIsLoading(false);
        setErrorMsg(err);
      },
    )
    .then(
      (res) => {
        if (!res.error) {
          localStorage.jwt = jwt;
          localStorage.nickname = res.nickname;
          localStorage.name = res.name;
          localStorage.email = res.email;
          localStorage.UUID = res.id;
          localStorage.avatar = res.avatar;
        } else {
          localStorage.clear();
        }
      },
      () => localStorage.clear(),
    );
};

const updateLocalStorage = (jwt, setIsLoading, setErrorMsg) => {
  const apiEndpoint = process.env.ENDPOINT + process.env.API_USER_INFO;
  fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(
      (res) => res.json(),
      (err) => {
        localStorage.clear();
        setIsLoading(false);
        setErrorMsg(err);
      },
    )
    .then(
      (res) => {
        switch (res.type) {
          case 'company':
            companyUpdateLocalStorage(jwt, setIsLoading, setErrorMsg);
            break;
          case 'attendee':
            attendeeUpdateLocalStorage(jwt, setIsLoading, setErrorMsg);
            break;
          default:
            localStorage.clear();
            break;
        }
      },
      () => localStorage.clear(),
    );
};

async function checkUserType(jwt) {
  const apiEndpoint = process.env.ENDPOINT + process.env.API_USER_INFO;
  const result = await fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then(
    (res) => res.json(),
    (err) => {
      console.log(err);
    },
  );
  return result;
}

export { isJWTValid, changeNickname, updateLocalStorage, checkUserType };
