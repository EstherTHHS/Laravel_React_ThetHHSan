import { Link } from 'react-router-dom';
import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {Dashboard, ShoppingCart, People} from '@mui/icons-material';

export const mainListItems = (
  <>
    <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
      <ListItemButton>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" sx={{span: {fontSize: 15}}} />
      </ListItemButton>
    </Link>
    <Link to='/dashboard/inquiry'  style={{color: 'inherit', textDecoration: 'none'}}>
      <ListItemButton>  
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="Inquiry" sx={{span: {fontSize: 15}}} />
      </ListItemButton>
    </Link>
    <Link to='/dashboard/category-data'  style={{color: 'inherit', textDecoration: 'none'}}>
      <ListItemButton>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Category Data" sx={{span: {fontSize: 15}}} />
      </ListItemButton>
    </Link>
  </>
);