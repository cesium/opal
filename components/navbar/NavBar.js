import React from 'react';
import {
  styled,
  useTheme,
  useScrollTrigger,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import global from '../../static/global.json';
import BurgerButton from './BurgerButton';

export default function ButtonAppBar() {
  const theme = useTheme();
  const desktopSize = useMediaQuery(theme.breakpoints.up('md'));
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 1 });

  const Div = styled('div')({
    flexGrow: 1,
  });

  const NavBar = styled(AppBar)({
    position: 'fixed',
    zIndex: 1400,
    background: trigger ? theme.navbar.backgroundColor : 'none',
  });

  const Logo = styled(IconButton)({
    marginRight: theme.spacing(2),
  });

  const Entry = styled(Button)({
    '&:hover': {
      backgroundColor: theme.navbar.entryBackgroundColor,
    },
  });

  return (
    <Div>
      <NavBar elevation={trigger ? 3 : 0}>
        <Toolbar>
          <Logo edge="start">
            <img width="90‰" src={global.navbar.logo} alt="" />
          </Logo>

          {desktopSize ? (
            <Grid
              container
              direction="row-reverse"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              {global.navbar.pages
                .map((page) => (
                  <Grid item>
                    <Entry color="inherit">{page.name}</Entry>
                  </Grid>
                ))
                .reverse()}
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <BurgerButton />
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </NavBar>
    </Div>
  );
}
