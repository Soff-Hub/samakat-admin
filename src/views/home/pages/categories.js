import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import NavHeader from 'components/shared/NavHeader'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS } from 'service/ApiEndpoints'
import Client from 'service/Client'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ResponsiveDialog from 'components/shared/modal'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



export default function Categories() {

  const [data, setData] = useState(null)
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null)

  async function getCategories() {
    await Client.get(API_ENDPOINTS.CATEGORIES)
      .then(resp => setData(resp.results))
      .catch(err => console.log(err))
  }


  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleDelete() {
    await Client.delete(`${API_ENDPOINTS.DELETE_CATEGORY}${deleteId}/`)
      .then(resp => {
        setOpen(false)
        console.log(resp);
        getCategories()
      })
      .catch(err => console.log(err))
  }

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [openContext, setOpenContext] = React.useState(false);

  function Row(props) {
    const { row } = props;

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' }, padding: 0 }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenContext(!openContext)}
            >
              {openContext ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell>{row.parent || "Yo'q"}</TableCell>
          <TableCell>{row.order}</TableCell>
          <TableCell align="right" sx={{ position: 'relative' }}>
            <Button color='error' variant='outlined' onClick={() => {
              setDeleteId(row.slug)
              setOpen(true)
            }}>
              O'chirish
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openContext} timeout="auto" unmountOnExit>
              fjnkdfjkdfdk
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };




  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div>
      <NavHeader title="Kategoriyalar" />
      {/* {
        data ?
          <div className='block w-1/2 border shadow-lg p-2 mt-5'>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nomi</TableCell>
                  <TableCell>Ota kategoriyasi</TableCell>
                  <TableCell>Tartib raqami</TableCell>
                  <TableCell align="right">Amallar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.map((row) => {
                    return <TableRow
                      key={row.slug}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link to={'actions/' + row.slug} className='hover:underline'>
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={'actions/' + row.slug} className='hover:underline'>
                          {row.parent || "yo'q"}
                        </Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={'actions/' + row.slug} className='hover:underline'>
                          {row.order}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: '20ch',
                              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'
                            },
                          }}
                        >
                          <MenuItem onClick={handleClose}>
                            <Link to={'actions/' + row.slug}>
                              Tahrirlash
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={() => {
                            setDeleteId(row.slug)
                            setOpen(true)
                            handleClose()
                          }}>
                            O'chirish
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </div>
          : <Box sx={{ display: 'flex', wdith: '100%', justifyContent: 'center', padding: '150px 0' }}>
            <CircularProgress />
          </Box>
      } */}

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Ko'rish</TableCell>
              <TableCell>Nomi</TableCell>
              <TableCell>Ota kategoriyasi</TableCell>
              <TableCell>Tartib raqami</TableCell>
              <TableCell align="right">Amallar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data ? data.map((row) => (
                <Row key={row.slug} row={row} />
              )) : <></>
            }
          </TableBody>
        </Table>
      </TableContainer>

      <ResponsiveDialog open={openDelete} setOpen={setOpen} handleDelete={handleDelete} />
    </div>
  )
}
