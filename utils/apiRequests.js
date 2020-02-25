import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { pushErrorPage } from './errorManagement';

async function isJWTValid(jwt) {
  if (!jwt || jwt === undefined || jwt === null) {
    return false;
  }
  const endpoint = `${process.env.ENDPOINT}${process.env.API_USER_INFO}`;
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .catch(() => pushErrorPage('Promise', 'error: is_jwt_valid'));
  if (response.error) return false;
  return true;
}

async function isRegistered(UUID) {
  const endpoint = `${process.env.ENDPOINT}${process.env.API_IS_REGISTERED}/${UUID}`;
  const response = await fetch(endpoint, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => pushErrorPage('Promise', 'error: is_registered'));
  return response.is_registered;
}

function changeNickname(nickname, jwt, UUID) {
  const endpoint = `${process.env.ENDPOINT}${process.env.API_ATTENDEES}/${UUID}`;
  const response = fetch(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ attendee: { nickname } }),
  })
    .then((res) => res.json())
    .catch(() => pushErrorPage('Promise', 'error: change_nickname'));
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
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        setErrorMsg(res.errors.details);
        localStorage.clear();
        setIsLoading(false);
      } else {
        localStorage.avatar = res.data.avatar;
        Router.push('/profile');
      }
    })
    .catch(() => {
      localStorage.clear();
      setIsLoading(false);
      pushErrorPage('Promise', 'error: company_update_avatar');
    });
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
    .then((res) => res.json())
    .then((res) => {
      localStorage.jwt = jwt;
      localStorage.email = res.email;
      localStorage.name = res.name;
      localStorage.sponsorship = res.sponsorship;
      companyUpdateAvatar(jwt, res.badge_id, setIsLoading, setErrorMsg);
    })
    .catch(() => {
      localStorage.clear();
      setIsLoading(false);
      pushErrorPage('Promise', 'error: company_update');
    });
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
    .then((res) => res.json())
    .then((res) => {
      if (!res.error) {
        localStorage.jwt = jwt;
        localStorage.nickname = res.nickname;
        localStorage.name = res.name;
        localStorage.email = res.email;
        localStorage.UUID = res.id;
        localStorage.avatar = res.avatar;
        Router.push('/profile');
      } else {
        setErrorMsg(res.error);
        setIsLoading(false);
        localStorage.clear();
      }
    })
    .catch(() => {
      localStorage.clear();
      setIsLoading(false);
      pushErrorPage('Promise', 'error: attendee_update');
    });
};

async function updateLocalStorage(jwt, setIsLoading, setErrorMsg) {
  const apiEndpoint = process.env.ENDPOINT + process.env.API_USER_INFO;
  const yo = await fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) setErrorMsg(res.error);
      switch (res.type) {
        case 'company':
          companyUpdateLocalStorage(jwt, setIsLoading, setErrorMsg);
          break;
        case 'attendee':
          attendeeUpdateLocalStorage(jwt, setIsLoading, setErrorMsg);
          break;
        default:
          localStorage.clear();
          setIsLoading(false);
          break;
      }
    })
    .catch(() => {
      localStorage.clear();
      setIsLoading(false);
      pushErrorPage('Promise', 'error: login_update');
    });

  return yo;
}

async function checkUserType(jwt) {
  const apiEndpoint = process.env.ENDPOINT + process.env.API_USER_INFO;
  const result = await fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      pushErrorPage('Promise', 'error: check_user_type');
    });
  return result.type;
}

export {
  isJWTValid,
  changeNickname,
  updateLocalStorage,
  checkUserType,
  isRegistered,
};
