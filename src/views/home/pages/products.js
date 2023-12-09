import NavHeaderSelect from "components/shared/NavHeaderSelect";
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
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ResponsiveDialog from "components/shared/modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AddNavHeaderSelect from "components/shared/addNavheaderSelect";

const headCells = [
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Nomi",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Hajmi",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Narxi",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Chegirmasi",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Sotuvda",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Belgi",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Amallar",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
          >
            <span className="font-bold text-[16px]"> {headCell.label}</span>
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
  const [page, setPage] = React.useState(1);
  const [type, setType] = React.useState("bistro");
  const [data, setData] = React.useState(null);
  const [count, setCount] = useState("");
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleChange = async (e) => {
    setType(e.target.value);
    setPage(1);
    await Client.get(
      `${API_ENDPOINTS.PRODUCT}?page=${page}&type=${e.target.value}`
    )
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const getProductData = async () => {
    setPage(1);
    setType("bistro");
    await Client.get(`${API_ENDPOINTS.PRODUCT}?page=${page}&type=bistro`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.PRODUCT}?type=${type}&search=${e}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    await Client.delete(`${API_ENDPOINTS.DELETE_PRODUCT}${deleteId}/`)
      .then((resp) => {
        console.log(resp);
        setOpen(false);
        getProductData();
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.PRODUCT}?page=${value}&type=${type}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="mb-5">
        {/* <AddNavHeaderSelect title="Mahsulotlar" /> */}
        <NavHeaderSelect title="Mahsulotlar" />
      </div>
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={handleChange}
        className="mt-5 flex items-center w-full"
      >
        <ToggleButton className="w-full" value="bistro">
          Bistro
        </ToggleButton>
        <ToggleButton className="w-full" value="byuti">
          Apteka
        </ToggleButton>
      </ToggleButtonGroup>
      <input
        type="text"
        placeholder="Izlash"
        className=" px-3 ps-5 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
        style={{ width: "100%" }}
        onChange={(e) => Search(e.target.value)}
      />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead rowCount={data?.length} />
              <TableBody>
                {data?.length >= 0 ? (
                  data?.map((row, index) => {
                    return (
                      <TableRow hover key={row.id}>
                        <TableCell align="left">
                          <Link to={`actions/?${row.type}?edit?${row.slug}`}>
                            {row.name}
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          <Link to={`actions/?${row.type}?edit?${row.slug}`}>
                            {row.specification}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`actions/?${row.type}?edit?${row.slug}`}>
                            {JSON.parse(row.price)} so'm
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`actions/?${row.type}?edit?${row.slug}`}>
                            {row.discount !== 0 ? (
                              <>
                                {row.discount}{" "}
                                <i className="fa-solid fa-percent"></i>{" "}
                              </>
                            ) : (
                              <i className="fa-solid fa-minus"></i>
                            )}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`actions/?${row.type}?edit?${row.slug}`}>
                            {row.on_sale ? (
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
                        <TableCell align="right">
                          <Link to={`actions/?${row.type}?edit?${row.slug}`}>
                            <span style={{ color: `${row?.badge?.textColor}` }}>
                              {row?.badge?.text ? row?.badge?.text :   <i className="fa-solid fa-minus"></i>}
                            </span>
                          </Link>
                        </TableCell>
                        <TableCell align="right" sx={{ position: "relative" }}>
                          <Link
                            to={`actions/?${row.type}?addVariant?${row.slug}?${row.variant_id}`}
                          >
                            <IconButton color="primary" aria-label="delete">
                              <AddCircleOutlinedIcon />
                            </IconButton>
                          </Link>
                          {row.is_delete ? (
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
                          ) : (
                            ""
                          )}
                          <Link to={`actions/?${row.type}?edit?${row.slug}`}>
                            <IconButton color="primary">
                              <DriveFileRenameOutlineOutlinedIcon />
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      wdith: "100%",
                      justifyContent: "center",
                      padding: "150px 0",
                      marginLeft: "400px",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {Math.ceil(count / 30) <= 1 || count === 0 ? (
            <></>
          ) : (
            <div className="m-3 mb-5">
              <Stack spacing={2}>
                <Typography> Sahifa : {page}</Typography>
                <Pagination
                  count={Math.ceil(count / 30) < 1 ? 1 : Math.ceil(count / 30)}
                  page={page}
                  onChange={handleChangePag}
                />
              </Stack>
            </div>
          )}
        </Paper>
      </Box>
      <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </>
  );
}
