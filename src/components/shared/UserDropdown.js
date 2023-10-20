import React from 'react';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserDropdown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='ms-auto'>
            <Button style={{ color: '#fff' }} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                <AccountCircleIcon />
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem className='w-36' onClick={handleClose}>Profile</MenuItem>
                <MenuItem className='w-36' onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
