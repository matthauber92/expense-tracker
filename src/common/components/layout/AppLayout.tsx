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
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {ThemeToggleButton} from '@common'

const drawerWidth = 240

interface AppBarProps extends React.ComponentProps<typeof MuiAppBar> {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {shouldForwardProp: prop => prop !== 'open'})<AppBarProps>(
  ({theme, open}) => ({
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
  }),
)

const Drawer = styled(MuiDrawer, {shouldForwardProp: prop => prop !== 'open'})(
  ({theme, open}) => ({
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
  }),
)

// Define menu items with route paths
const menuItems = [
  {text: 'Dashboard', icon: <InboxIcon/>, path: '/'},
  {text: 'Transactions', icon: <MailIcon/>, path: '/transactions'},
  {text: 'Settings', icon: <InboxIcon/>, path: '/settings'},
]

export default function AppLayout() {
  const theme = useTheme()
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => setOpen(prev => !prev)
  const location = useLocation()

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{pr: 3, display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{mr: 3, ...(open && {display: 'none'})}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography component="h1" variant="h6" noWrap onClick={() => navigate('/')} sx={{cursor: 'pointer'}}>
              Expense Tracker
            </Typography>
          </Box>
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
          {menuItems.map(({text, icon, path}) => {
            const selected = location.pathname === path
            return (
              <ListItemButton
                key={text}
                selected={selected}
                onClick={() => navigate(path)}
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  transition: theme.transitions.create(['background-color'], {
                    duration: theme.transitions.duration.short,
                  }),
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{color: selected ? theme.palette.primary.main : 'inherit'}}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            )
          })}
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
