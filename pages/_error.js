import React, { useEffect, useState } from 'react';
import { styled, Typography, Button } from '@material-ui/core';
import Link from '../components/Link';

const CenterBox = styled('div')({
  display: 'flex',
  height: '100vh',
  padding: '2rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Divider = styled('div')({
  height: '1rem',
});

const StyledTypography = styled(Typography)({
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});

const StyledImage = styled('img')({
  margin: '20px',
  display: 'block',
  maxWidth: '230px',
  width: 'auto',
  height: 'auto',
});

export default function Page() {
  const [errorType, setErrorType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    setErrorType(localStorage.errorType);
    setErrorMessage(localStorage.errorMessage);
    setErrorDetails(localStorage.errorDetails);
  }, []);

  return (
    <CenterBox>
      <StyledImage src="/img/eneiLogoBorderBlack.png" alt="" />
      <StyledTypography variant="h2" color="primary">
        {errorType || 'ERRO'}
      </StyledTypography>
      <StyledTypography variant="h5" color="primary">
        {errorMessage || 'A página não existe.'}
      </StyledTypography>
      <StyledTypography variant="body1" color="primary">
        {errorDetails}
      </StyledTypography>
      <Divider />
      <Link href="/">
        <Button variant="outlined" color="primary" size="large">
          VOLTAR À PÁGINA INICIAL
        </Button>
      </Link>
    </CenterBox>
  );
}
