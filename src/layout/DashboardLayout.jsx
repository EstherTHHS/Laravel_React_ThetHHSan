import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { Toolbar, IconButton, Typography, Badge, Divider, List, Box, Container, Breadcrumbs, Paper, Menu, MenuItem  } from '@mui/material';
import { ChevronLeft, Notifications, NavigateNext, AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material';
import { mainListItems } from '../components/listItems';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const breadcrumbs = location.pathname.split(/\//g);

const DashboardLayout = (props) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [userData, setUserData] = useState(null); // State to hold user data


  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []); 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open} elevation={0}>
        <Toolbar
          sx={{
            background: '#29B6F6',
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, textTransform: 'capitalize' }}
          >
            {props.title}
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="#8d0999"
            noWrap
            sx={{ flexGrow: -1, textTransform: 'capitalize' }}
          >
            {userData && userData.name}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
              sx={{ ml: 2 }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <Link to='/signin'><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
            </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Paper
            elevation={0}
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "start",
              height: 50,
            }}
          >
            <Breadcrumbs
              sx={{ fontSize: 14 }}
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link key="1" color="inherit" to="/welcome">
                Dashboard
              </Link>
              {breadcrumbs.length > 2 && (
                <Link
                  // underline="hover"
                  key="2"
                  color="inherit"
                  to="/material-ui/getting-started/installation/"
                // onClick={handleClick}
                >
                  {breadcrumbs[1]}
                </Link>
              )}
              <Typography
                key={breadcrumbs[breadcrumbs.length - 1]}
                color="text.primary"
              >
                {breadcrumbs[breadcrumbs.length - 1]}
              </Typography>
            </Breadcrumbs>
          </Paper>
        </Container>
        <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
