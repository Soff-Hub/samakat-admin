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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ResponsiveDialog from "components/shared/modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import NavHeader from "components/shared/NavHeader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const headCells = [
  {
    id: "id",
    label: "Id",
  },
  {
    id: "phone_number",
    label: "Telefon raqam",
  },
  {
    id: "first_name",
    label: "To'liq ismi",
  },
  {
    id: "created_at",
    label: "Yaratilgan vaqt",
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
            align="left"
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

export default function Users() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(null);
  const [count, setCount] = useState(10);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [role, setRole] = useState("");
  const [filial, setFilial] = useState("");
  const [search, setSearch] = useState("");
  const [filialData, setFilialData] = useState([]);

  const getUsers = async () => {
    await Client.get(API_ENDPOINTS.USERS)
      .then((resp) => {
        console.log(resp.results);
        setData(resp.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const Search = async (e) => {
    setSearch(e);
    await Client.get(`${API_ENDPOINTS.USERS}?search=${e}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {};

  const handleChangeFilial = async (event) => {
    setFilial(event.target.value);
    await Client.get(
      `${API_ENDPOINTS.USERS}?role=${role ? role : ""}&branch=${
        event.target.value
      }`
    )
      .then((resp) => {
        console.log(resp);
        // setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeRole = async (event) => {
    setRole(event.target.value);
    await Client.get(
      `${API_ENDPOINTS.USERS}?role=${event.target.value}&branch=${
        filial ? filial : ""
      }`
    )
      .then((resp) => {
        console.log(resp);
        // setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const getFilial = async () => {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((res) => {
        console.log("res", res.results);
        setFilialData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
    getFilial();
  }, [search, filial, role]);

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl">Foydalanuvchilar</h1>
      </div>
      <div className="flex items-center gap-1" >
        <input
          type="text"
          placeholder="Izlash"
          className=" sm:w-full  w-1/3 px-3 ps-5 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
          onChange={(e) => Search(e.target.value)}
        />
        <FormControl
          sx={{ minWidth: 100 }}
          size="small"
          className="sm:w-full  w-1/3"
        >
          <InputLabel
            id="demo-select-small-label"
            placholder="Holat bo'yicha"
          >
            Filial bo'yicha
          </InputLabel>
          <Select
           className="py-0.5"
            value={filial}
            label="Holat bo'yicha"
            onChange={handleChangeFilial}
          >
            {filialData ? (
              filialData?.map((item, i) => (
                <MenuItem key={i} value={item.id}>
                  {item.name}
                </MenuItem>
              ))
            ) : (
              <></>
            )}
          </Select>
        </FormControl>
        <FormControl
         sx={{ minWidth: 100 }}
         size="small"
         className="sm:w-full  w-1/3"
        >
          <InputLabel
            id="demo-select-small-label"
            placholder="Holat bo'yicha"
          >
            Rol bo'yicha
          </InputLabel>
          <Select
            className="py-0.5"
            value={role}
            label="Holat bo'yicha"
            onChange={handleChangeRole}
          >
            <MenuItem value={"customer"}>Foydalanuvchi</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"kurer"}>Kurer</MenuItem>
            <MenuItem value={"superadmin"}>Super admin</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data?.length || 0}
              />
              <TableBody>
                {data?.map((row, index) => {
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
                      <TableCell padding="checkbox" align="left">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} align="left">
                        <Link
                          to={`actions/?detail?${row.id}`}
                          className="hover:underline"
                        >
                          {row.id}
                        </Link>
                      </TableCell>

                      <TableCell align="left">
                        <Link
                          to={`actions/?detail?${row.id}`}
                          className="hover:underline"
                        >
                          {row.phone}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <Link
                          to={`actions/?detail?${row.id}`}
                          className="hover:underline"
                        >
                          {row.first_name == "" ? "No name" : row.first_name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        {row.date_joined.slice(0, 10)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="m-3 mb-5">
            <Stack spacing={2}>
              <Typography> Sahifa : {page}</Typography>
              <Pagination
                count={Math.trunc(count / 10) < 1 ? 1 : Math.trunc(count / 10)}
                page={page}
                onChange={handleChangePag}
              />
            </Stack>
          </div>
        </Paper>
      </Box>
    </div>
  );
}
