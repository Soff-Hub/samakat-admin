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
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { Link } from "react-router-dom";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ResponsiveDialog from "components/shared/modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3),
  createData(2, "Donut", 452, 25.0, 51, 4.9),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
  createData(9, "KitKat", 518, 26.0, 65, 7.0),
  createData(10, "Lollipop", 392, 0.2, 98, 0.0),
  createData(11, "Marshmallow", 318, 0, 81, 2.0),
  createData(12, "Nougat", 360, 19.0, 9, 37.0),
  createData(13, "Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Nomi",
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

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [alignment, setAlignment] = React.useState("web");
  const [type, setType] = React.useState("bistro");
  const [data, setData] = React.useState(null);
  const [count, setCount] = useState(10);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      const newSelected = data?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  console.log(">", selected);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const handleChange = async (e) => {
    setType(e.target.value);
    setPage(1);
    await Client.get(
      `${API_ENDPOINTS.PRODUCT}?page=${page}&type=${e.target.value}`
    )
      .then((resp) => {
        console.log(resp);
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
        console.log(resp?.results);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.PRODUCT}?search=${e}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    await Client.delete(`${API_ENDPOINTS.DELETE_PRODUCT}${deleteId}/`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setOpen(false);
        getProductData();
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.PRODUCT}?page=${value}&type=${type}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductData();
  }, []);

  // console.log(data);

  return (
    <>
      <div className="mb-5">
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
        <ToggleButton className="w-full" value="apteka">
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
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data?.length}
              />
              <TableBody>
                {data ? (
                  data?.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">
                          {JSON.parse(row.price)} so'm
                        </TableCell>
                        <TableCell align="right">
                          {row.discount} <i class="fa-solid fa-percent"></i>{" "}
                        </TableCell>
                        <TableCell align="right">
                          {true ? (
                            <i
                              style={{ color: "green" }}
                              class=" fa-regular fa-circle-check"
                            ></i>
                          ) : (
                            <i
                              style={{ color: "red" }}
                              class="fa-regular fa-xmark"
                            ></i>
                          )}{" "}
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          <span style={{ color: `${row?.badge?.textColor}` }}>
                            {row?.badge?.text}
                          </span>{" "}
                        </TableCell>
                        <TableCell align="right" sx={{ position: "relative" }}>
                          <Link to={`actions/?${row.type}?edit?${row.slug}`}>
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
          <div className="m-3 mb-5">
            <Stack spacing={2}>
              <Typography> Sahifa : {page}</Typography>
              <Pagination
                count={Math.trunc(count / 30) < 1 ? 1 : Math.trunc(count / 30)}
                page={page}
                onChange={handleChangePag}
              />
            </Stack>
          </div>
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
