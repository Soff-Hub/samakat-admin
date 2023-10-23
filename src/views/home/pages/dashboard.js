import React from 'react'
import { Button, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { navigationConfig } from 'configs/navigationConfig';
import { Link } from 'react-router-dom';


export default function Dashboard() {

  const usersData = [
    {
      name: 'Foydalanuvchilar',
      path: '/users',
    }
  ]



  return (
    <div className='flex gap-5'>
      <div className='block w-1/2 border shadow-xl p-2'>
        <Typography className='p-2' sx={{ fontSize: 30 }}>
          Shop
        </Typography>
        <Table aria-label="simple table">
          <TableBody>
            {
              navigationConfig.map((row, index) => {
                return (
                  index !== 0 ? (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link to={row.path} className='hover:underline'>
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`${row.path}/actions`}>
                          <Button variant="outlined">Add</Button>
                        </Link>
                      </TableCell>
                      <TableCell align="">
                      <Link to={`${row.path}`}>
                        <Button variant="outlined" color='success'>Change</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ) : <></>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
      <div className='block w-1/2 border shadow-xl p-2'>
        <Typography className='p-2' sx={{ fontSize: 30 }}>
          Users
        </Typography>
        <Table aria-label="simple table">
          <TableBody>
            {usersData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={row.path} className='hover:underline'>
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined">Add</Button>
                </TableCell>
                <TableCell align="">
                  <Button variant="outlined" color='success'>Change</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
