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
        'Ocorreu um erro.\nPode não estar autorizado a aceder à página sem estar autenticado.\n';
      break;
    case 'Login':
      localStorage.errorType = 'Erro';
      localStorage.errorMessage =
        'Ocorreu um erro.\nPode não estar autorizado a aceder à página sem estar autenticado.\n';
      break;
    case 'Unexpected':
      localStorage.errorType = 'Erro inesperado';
      localStorage.errorMessage =
        'Ocorreu um error inesperado. Tenta novamente';
      break;
    case 'Bad request':
      localStorage.errorType = 'Erro';
      localStorage.errorMessage = 'Ocorreu um erro. Tenta novamente.';
      break;
    default:
      break;
  }
  Router.push('/404');
}

// eslint-disable-next-line import/prefer-default-export
export { pushErrorPage };
