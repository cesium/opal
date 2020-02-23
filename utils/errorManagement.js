import Router from 'next/router';

function pushErrorPage(errorType) {
  localStorage.clear();
  switch (errorType) {
    case 'Unauthorized':
      localStorage.errorType = 'Unauthorized';
      localStorage.error = 'Não é permitido aceder a esta página';
      break;
    case '':
      localStorage.errorType = 'Unauthorized';
      localStorage.error = 'Não é permitido aceder a esta página';
      break;
    default:
      break;
  }
  Router.push('/404');
}

// eslint-disable-next-line import/prefer-default-export
export { pushErrorPage };
