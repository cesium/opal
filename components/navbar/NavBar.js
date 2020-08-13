import React from 'react';
import {
  styled,
  useTheme,
  useScrollTrigger,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import global from '../../data/global.json';
import BurgerButton from './BurgerButton';
import Link from '../Link';

export default function ButtonAppBar() {
  const theme = useTheme();
  const desktopSize = useMediaQuery(theme.breakpoints.up('md'));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1,
  });
  const router = useRouter();
  const isIndex = router.pathname === '/';
  const Div = styled('div')({
    flexGrow: 1,
  });

  const NavBar = styled(AppBar)({
    position: 'fixed',
    zIndex: 1400,
    background: trigger ? theme.palette.primary.main : 'none',
  });

  const Logo = styled(IconButton)({
    marginRight: theme.spacing(2),
  });

  const Entry = styled(Button)({
    color: theme.palette.text.title,
    '&:hover': {
      backgroundColor: theme.navbar.entryBackgroundColor,
    },
  });

  const MoonstoneOptions = () => {
    if (
      typeof Storage !== 'undefined' &&
      localStorage.jwt &&
      localStorage.name &&
      localStorage.avatar
    ) {
      return (
        <Grid item>
          <Link href="/profile">
            <Avatar alt={localStorage.name} src={localStorage.avatar}>
              {localStorage.name.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        </Grid>
      );
    }

    return (
      <Grid item>
        <Link href="/login">
          <Entry color="inherit">Login</Entry>
        </Link>
      </Grid>
    );
  };

  return (
    <Div>
      <NavBar elevation={trigger ? 3 : 0}>
        <Toolbar>
          {(trigger || !isIndex) && (
            <Link href="/">
              <Logo edge="start">
                <img width="80‰" src={global.navbar.logo} alt="" />
              </Logo>
            </Link>
          )}
          {desktopSize ? (
            <Grid
              container
              direction="row-reverse"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              <MoonstoneOptions />
              {global.navbar.pages
                .map((page) => (
                  <Grid item key={page.name}>
                    <Link href={page.link}>
                      <Entry color="inherit">{page.name}</Entry>
                    </Link>
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
