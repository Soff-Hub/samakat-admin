import { Button, Table, TableBody, TableCell, TableRow } from '@mui/material'
import NavHeader from 'components/shared/NavHeader'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS } from 'service/ApiEndpoints'
import Client from 'service/Client'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Branches() {

  const [data, setData] = useState(null)

  async function getBranches() {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then(resp => setData(resp.results))
      .catch(err => console.log(err))
  }


  useEffect(() => {
    getBranches()
  }, [])

  return (
    <div>
      <NavHeader title="Filiallar" />
      {
        data ?
          <Table aria-label="simple table">
            <TableBody>
              {
                data.map((row) => {
                  return <TableRow
                    key={row.uuid}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to={'actions/' + row.uuid} className='hover:underline'>
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={'actions/' + row.uuid} className='hover:underline'>
                        {row.address}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={'actions/' + row.uuid}>
                        <Button variant="outlined" color='success'>Change</Button>
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <Button variant="outlined" color='error'>Delete</Button>
                    </TableCell>
                  </TableRow>
                })
              }
            </TableBody>
          </Table>
          : <Box sx={{ display: 'flex', wdith: '100%', justifyContent: 'center', padding: '150px 0' }}>
            <CircularProgress />
          </Box>
      }
    </div>
  )
}
