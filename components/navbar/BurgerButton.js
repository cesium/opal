import React from 'react';
import {
  Box,
  Drawer,
  Avatar,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import global from '../../data/global.json';
import Link from '../Link';
import theme from '../theme';

// As far as I could understand from the documentation,
// this can't be changed to a styled component
const useStyles = makeStyles({
  paper: {
    backgroundColor: theme.palette.primary.main,
  },
});

const Spacer = styled('div')(theme.mixins.toolbar);

const Item = styled(ListItemText)({
  color: theme.palette.text.title,
  textAlign: 'right',
});

const StyledAvatar = styled(Avatar)({
  marginLeft: 'auto',
});

const MoonstoneOptions = () => {
  if (
    typeof Storage !== 'undefined' &&
    localStorage.name &&
    localStorage.avatar
  ) {
    return (
      <Link href="/profile">
        <ListItem button>
          <StyledAvatar alt={localStorage.name} src={localStorage.avatar}>
            {localStorage.name.charAt(0).toUpperCase()}
          </StyledAvatar>
        </ListItem>
      </Link>
    );
  }
  return (
    <Link href="/login">
      <ListItem button>
        <Item primary="Log In" />
      </ListItem>
    </Link>
  );
};

function BurgerButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <img width="25‰" src="/img/burger.svg" alt="" />
      </IconButton>
      <Drawer classes={{ paper: classes.paper }} anchor="top" open={open}>
        <div className={classes.list} role="presentation">
          <Spacer />
          <List>
            {global.navbar.pages.map((page) => (
              <Link href={page.link}>
                <ListItem button key={page.name}>
                  <Item primary={page.name} />
                </ListItem>
              </Link>
            ))}
            <MoonstoneOptions />
          </List>
        </div>
      </Drawer>
    </Box>
  );
}

export default BurgerButton;
