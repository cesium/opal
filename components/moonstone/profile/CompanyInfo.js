import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import theme from '../../theme';
import { StyledGrid, StyledAvatar, StyledTypography } from './StyledComponents';

export default function CompanyInfo({ data }) {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setAvatar(localStorage.avatar);
  }, []);

  return (
    <>
      <StyledGrid container justify="center" alignItems="center" spacing={5}>
        {avatar ? (
          <>
            <Grid item>
              <StyledAvatar src={avatar} />
            </Grid>
            <Grid item>
              <StyledTypography color={theme.palette.primary.light}>
                Nome:
              </StyledTypography>
              <StyledTypography color={theme.palette.primary.main} variant="h6">
                {data.name}
              </StyledTypography>
              <StyledTypography color={theme.palette.primary.light}>
                Plano de patrocínio:
              </StyledTypography>
              <StyledTypography color={theme.palette.primary.main} variant="h6">
                {data.sponsorship.toUpperCase()}
              </StyledTypography>
            </Grid>
          </>
        ) : (
          <Grid item>
            <CircularProgress size="100px" />
          </Grid>
        )}
      </StyledGrid>
    </>
  );
}

CompanyInfo.propTypes = {
  data: PropTypes.object.isRequired,
};
