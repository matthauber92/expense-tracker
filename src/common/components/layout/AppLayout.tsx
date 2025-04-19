import * as React from 'react'
import {
  styled,
  useTheme,
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import {Outlet} from 'react-router-dom'
import {ThemeToggleButton} from "@common";

const drawerWidth = 240

interface AppBarProps extends React.ComponentProps<typeof MuiAppBar> {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
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
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({theme, open}) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    overflowX: 'hidden',
    ...(!open && {
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
}))

export default function AppLayout() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => setOpen(prev => !prev)

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{pr: 3}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              mr: 3,
              ...(open && {display: 'none'}),
            }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography component="h1" variant="h6" noWrap sx={{flexGrow: 1}}>
            Expense Tracker
          </Typography>
          <ThemeToggleButton/>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 1}}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon/>
          </IconButton>
        </Toolbar>
        <Divider/>
        <List>
          {['Dashboard', 'Transactions', 'Settings'].map((text, index) => (
            <ListItem key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.background.default,
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          p: 3,
        }}
      >
        <Toolbar/>
        <Outlet/>
      </Box>
    </Box>
  )
}
