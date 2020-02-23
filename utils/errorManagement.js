import Router from 'next/router';

function pushErrorPage(errorType, details) {
  localStorage.errorDetails = details;
  switch (errorType) {
    case 'Unauthorized':
      localStorage.errorType = 'Unauthorized';
      localStorage.errorMessage = 'Não é permitido aceder a esta página';
      break;
    case 'Promise':
      localStorage.errorType = 'Erro';
      localStorage.errorMessage =
        'Ocorreu um erro desconhecido.\nPor favor, tente novamente.\nSe continuar a ocorrer, contacte a organização.';
      break;
    case 'Login':
      localStorage.errorType = 'Erro';
      localStorage.errorMessage =
        'Ocorreu um erro durante o login.\nPor favor, tente novamente.\nSe continuar a ocorrer, contacte a organização.';
      break;
    default:
      break;
  }
  Router.push('/404');
}

// eslint-disable-next-line import/prefer-default-export
export { pushErrorPage };
