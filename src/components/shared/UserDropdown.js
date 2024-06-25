import React, { useEffect } from 'react';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, setUser } from 'store/slice';
import Client from 'service/Client';
import { API_ENDPOINTS } from 'service/ApiEndpoints';

export default function UserDropdown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch()
    const open = Boolean(anchorEl);
    const { user } = useSelector(state => state.admin)

    const getUser = async () => {
        await Client.get(API_ENDPOINTS.PROFILE)
            .then(data => {
                dispatch(setUser(data))
            })
            .catch(err => console.log(err))
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleClose()
        dispatch(logoutSuccess())
    }

    useEffect(() => {
        if (user === null) {
            getUser()
        }
        // eslint-disable-next-line
    }, [user])
    

    return (
        <div className='ms-auto'>
            <Button style={{ color: '#fff' }} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                <p className='me-3'>{user?.role === 'superadmin' ? 'Admin' : user?.role === 'seller' ? user?.seller?.name : user?.role === 'employee' ? "Xodim" : '' }</p>
                <p className='me-3'>{user?.phone}</p>
              {
                user?.role != 'seller' ? <AccountCircleIcon /> : <img style={{width:'35px', height:'35px', borderRadius:'50%', border:'1px solid #fff'}} src={user?.seller?.image} alt="alokand" />
              }  

            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem className='w-36' onClick={logout}>Chiqish</MenuItem>
            </Menu>
        </div>
    );
}
