import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NavHeader from "components/shared/NavHeader";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ResponsiveDialog from "components/shared/modal";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Branches() {
  const [data, setData] = useState(null);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [count, setCount] = useState("");
  const [page, setPage] = React.useState(1);

  async function getBranches() {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count)
      })
      .catch((err) => console.log(err));
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleDelete() {
    await Client.delete(`${API_ENDPOINTS.DELETE_BRANCH}${deleteId}/`)
      .then((resp) => {
        setOpen(false);
        console.log(resp);
        getBranches();
      })
      .catch((err) => console.log(err));
  }

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.GET_BRANCHS}?page=${value}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBranches();
  }, []);
  console.log("count", count);

  return (
    <div>
      <NavHeader title="Filiallar" />
      {data ? (
        <div className="block w-full border shadow-lg p-2 mt-5">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Filial Nomi</TableCell>
                <TableCell align="">Aniq Manzil</TableCell>
                <TableCell align="right">Amallar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                return (
                  <TableRow
                    key={row.uuid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/" + row.uuid}
                        className="hover:underline"
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/" + row.uuid}
                        className="hover:underline"
                      >
                        {row.address}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "20ch",
                            boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                          },
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <Link to={"actions/" + row.uuid}>Tahrirlash</Link>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setDeleteId(row.uuid);
                            setOpen(true);
                            handleClose();
                          }}
                        >
                          O'chirish
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {count && Math.ceil(count / 30) <= 1 ? (
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
          </Table>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            wdith: "100%",
            justifyContent: "center",
            padding: "150px 0",
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
    </div>
  );
}
