import { Grid, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../theme';

const StyledGrid = styled(Grid)({
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '95%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: '70%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '60%',
  },
});

const StyledAvatar = styled(Avatar)({
  width: '200px',
  height: '200px',
});

const StyledTypography = styled(Typography)(({ color }) => ({
  color,
}));

export { StyledGrid, StyledTypography, StyledAvatar };
