import NavHeaderSelect from "components/shared/NavHeaderSelect";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ResponsiveDialog from "components/shared/modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";
import { Select } from "antd";

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
    label: "Aktiv",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Amallar",
  },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={
              headCell.numeric === true
                ? "right"
                : headCell.numeric === null
                ? "center"
                : "left"
            }
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <span className="font-bold text-[16px]"> {headCell.label} </span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(null);
  const [count, setCount] = useState(10);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [active, setActive] = useState("");

  const getRetsipeData = async () => {
    setPage(1);
    await Client.get(`${API_ENDPOINTS.RETCIPE}?page=1&type=bistro`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const Search = async (e) => {
    await Client.get(
      `${API_ENDPOINTS.RETCIPE}?search=${e}&is_active=${active}`
    )
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    await Client.delete(`${API_ENDPOINTS.DELETE_RECIPE}${deleteId}/`)
      .then((resp) => {
        console.log(resp);
        setOpen(false);
        getRetsipeData();
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.RETCIPE}?page=${value}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeSelect = async (e) => {
    setActive(e);
    await Client.get(
      `${API_ENDPOINTS.RETCIPE}?page=${page}&is_active=${e}`
    )
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRetsipeData();
  }, []);
  return (
    <div className="px-2 py-3 bg--color">
      <div className="mb-5">
        <NavHeaderSelect title="Retseptlar" />
      </div>

      {data?.length >= 0 ? (
        <Box sx={{ width: "100%" }} className="colorr p-2 pt-3">
          <input
            type="text"
            placeholder="Izlash"
            className=" px-3 ps-4 py-3 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
            style={{ width: "100%" }}
            onChange={(e) => Search(e.target.value)}
          />
          <div className="flex justify-end">
            <Select
              style={{
                width: "25%",
                paddingLeft: "10px",
                margin: "8px 0",
              }}
              optionFilterProp="children"
              placeholder="Filter"
              onChange={handleChangeSelect}
              options={[
                {
                  label: "Hammasi",
                  value: "",
                },
                {
                  label: "Aktiv",
                  value: "true",
                },
                {
                  label: "Aktiv emas",
                  value: "false",
                },
              ]}
            />
          </div>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead rowCount={data?.length} />
                <TableBody>
                  {data?.map((row, index) => {
                    return (
                      <TableRow hover key={row.id}>
                        <TableCell align="left">
                          <Link to={`actions/?edit?${row.slug}`}>
                            {row.title}
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          <Link to={`actions/?edit?${row.slug}`}>
                            {row.is_active ? (
                              <i
                                style={{ color: "green" }}
                                className=" fa-regular fa-circle-check"
                              ></i>
                            ) : (
                              <i
                                style={{ color: "red" }}
                                className="fa-regular fa-circle-xmark"
                              ></i>
                            )}
                          </Link>
                        </TableCell>
                        <TableCell align="right" sx={{ position: "relative" }}>
                          <Link to={`actions/?edit?${row.slug}`}>
                            <IconButton color="primary">
                              <DriveFileRenameOutlineOutlinedIcon />
                            </IconButton>
                          </Link>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setDeleteId(row.slug);
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
            {Math.ceil(count / 30) <= 1 || count === 0 ? (
              <></>
            ) : (
              <div className="m-3 mb-5 pb-4 pt-4">
                <Stack spacing={2}>
                  <Typography> Sahifa : {page} </Typography>
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
