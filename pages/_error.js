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
});

export default function Page() {
  const [errorType, setErrorType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorType(localStorage.errorType);
    setErrorMessage(localStorage.errorMessage);
  }, []);

  return (
    <CenterBox>
      <StyledTypography variant="h2" color="primary">
        {errorType || 'ERROR'}
      </StyledTypography>
      <StyledTypography variant="h5" color="primary">
        {errorMessage || 'A página não existe.'}
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
