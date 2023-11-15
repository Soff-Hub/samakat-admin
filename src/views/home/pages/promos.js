import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import ResponsiveDialog from "components/shared/modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import NavHeader from "components/shared/NavHeader";
import { CircularProgress } from "@mui/material";

const headCells = [
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Nomi",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Kodi",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Foiz",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Reklamachi",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Boshlanish vaqti",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Tugash vaqti",
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: true,
    label: "Amallar",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <span className="font-bold text-[16px]"> {headCell.label} </span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(null);
  const [count, setCount] = useState(10);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClick = (event, id) => {
    console.log('ee', event, id);
    
    setSelected();
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.ADDRESS}?page=${value}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };


  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.PROMO_CODE}?search=${e}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const getData = async () => {
    setPage(1);
    await Client.get(`${API_ENDPOINTS.PROMO_CODE}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    await Client.delete(`${API_ENDPOINTS.DELETE_CREATE_PROMO_CODE}${deleteId}/`)
      .then((resp) => {
        console.log(resp);
        setOpen(false);
        getData();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="mb-5">
        <NavHeader title="Promo kodlar" />
      </div>
      <div>
        <input
          type="text"
          placeholder="Izlash"
          className=" w-full px-3 ps-5 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
          onChange={(e) => Search(e.target.value)}
        />
      </div>
      {data ? (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={data?.length}
                />
                <TableBody>
                  {data?.map((row, index) => {

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        key={row.id}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell align="right">{row.title}</TableCell>
                        <TableCell align="right">{row.code}</TableCell>
                        <TableCell align="right">{row.percentage} </TableCell>
                        <TableCell align="right">{row.advertiser} </TableCell>
                        <TableCell align="right">{row.start_date} </TableCell>
                        <TableCell align="right">{row.end_date} </TableCell>
                        <TableCell align="right" sx={{ position: "relative" }}>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setDeleteId(row.id);
                              setOpen(true);
                            }}
                            aria-label="delete"
                          >
                            <DeleteSharpIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {(count && Math.ceil(count / 30) <= 1) || count === 0 ? (
              <></>
            ) : (
              <div className="m-3 mb-5">
                <Stack spacing={2}>
                  <Typography> Sahifa : {page}</Typography>
                  <Pagination
                    count={
                      Math.ceil(count / 30) < 1 ? 1 : Math.ceil(count / 30)
                    }
                    page={page}
                    onChange={handleChangePag}
                  />
                </Stack>
              </div>
            )}
          </Paper>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            padding: "150px 0",
            margin: "0 auto",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </>
  );
}
