import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
// custom client-side routing with React Router
import CustomLink from './CustomLink';
import CustomButtonLink from './CustomButtonLink';
// LanguageSelector
import { MenuItem, FormControl, Select } from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
// appbar
import { Drawer, CssBaseline, AppBar, Toolbar, List, Divider, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// sidebar
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
/*
  Navigation Menu holds
    - navbar (for settings)
    - div to move all content down (so not obscurbed by navbar)
    - sidebar for route navigation
*/

const drawerWidth = 240;

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));

function LanguageSelector(props) {
  const { onSelectLanguage } = props;
  const classes = useStyles2();
  const [lang, setLang] = React.useState('en');

  const handleChange = (event) => {
    setLang(event.target.value);
    onSelectLanguage(event);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        id="demo-simple-select"
        IconComponent={() => <TranslateIcon style={{ color: "inherit" }} />}
        value={lang}
        onChange={handleChange}
        style={{ color: "inherit", fontSize: '18px' }}
      >
        <MenuItem value={'en'}>English</MenuItem>
        <MenuItem value={'es'}>Español</MenuItem>
        <MenuItem value={'zh'}>简体中文</MenuItem>
        <MenuItem value={'jp'}>日本語</MenuItem>
      </Select>
    </FormControl>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonHidden: {
    display: 'none',
  },
  logo: {
    height: '50px',
  },
  divider: {
    margin: theme.spacing(0, 0.5),
    background: "white",
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));


export default function PersistentDrawerLeft(props) {
  const { logo, routeData, langCallback, signInText } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        style={{
          backgroundColor: '#393e46',
          backgroundBlendMode: "normal,luminosity",
          backdropFilter: 'blur(5px)',
          boxShadow: '3px 6px 20px rgba(104,102,255,.44), -3px -6px 10px hsla(0,0%,100%,.6)'
        }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <CustomButtonLink
            ariaLabel="back to home logo"
            to="/"
            primary={"EXAMPLE"}
            icon={<img src={logo} className={classes.logo} alt="logo" />}
          />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <CustomButtonLink
              ariaLabel="sign-in"
              to="/signin"
              primary={signInText}
              icon={<></>}
            />
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <LanguageSelector onSelectLanguage={langCallback} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={toggleDrawer(false)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {routeData.map((obj, idx) => {
              const icon = obj.iconFunc();
              const primary = obj.text;
              return (
                <CustomLink key={obj.text + idx} to={obj.link}>
                  <li>
                    <ListItem button>
                      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                      <ListItemText primary={primary} />
                    </ListItem>
                  </li>
                </CustomLink>
              )
            })}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}
      </main>
    </div>
  );
}
