import React from 'react';
import { styled, CircularProgress } from '@material-ui/core';

const CenterBox = styled('div')({
  display: 'flex',
  height: '100vh',
  padding: '2rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function CenteredCircularProgress() {
  return (
    <CenterBox>
      <CircularProgress size="150px" />
    </CenterBox>
  );
}
