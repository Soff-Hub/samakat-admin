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
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const headCells = [
  {
    id: "id",
    label: "Id",
  },
  {
    id: "first_name",
    label: "To'liq ismi",
  },
  {
    id: "phone_number",
    label: "Telefon raqam",
  },

  {
    id: "created_at",
    label: "Ro'yxatdan o'tgan sana",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left">
            <span className="font-bold text-[16px]">{headCell.label}</span>
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
    ></Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Users() {
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(null);
  const [count, setCount] = useState(10);
  const [role, setRole] = useState("");
  const [filial, setFilial] = useState("");
  const [filialData, setFilialData] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    await Client.get(API_ENDPOINTS.USERS)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (id) => {
    navigate(`actions/?detail?${id}`);
  };

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.USERS}?search=${e}`)
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.USERS}?page=${value}`)
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeFilial = async (event) => {
    setFilial(event.target.value);
    await Client.get(
      `${API_ENDPOINTS.USERS}?role=${role ? role : ""}&branch=${
        event.target.value
      }`
    )
      .then((resp) => {
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
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const getFilial = async () => {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((res) => {
        setFilialData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
    getFilial();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl">Foydalanuvchilar</h1>
      </div>
      <div className="flex items-center gap-1">
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
          <InputLabel id="demo-select-small-label" placholder="Holat bo'yicha">
            Filial bo'yicha
          </InputLabel>
          <Select
            className="py-0.5"
            value={filial}
            label="Holat bo'yicha"
            onChange={handleChangeFilial}
          >
            <MenuItem value={""}>
              {" "}
              <i className="fa-solid fa-minus"></i>{" "}
            </MenuItem>
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
          <InputLabel id="demo-select-small-label" placholder="Holat bo'yicha">
            Rol bo'yicha
          </InputLabel>
          <Select
            className="py-0.5"
            value={role}
            label="Holat bo'yicha"
            onChange={handleChangeRole}
          >
            <MenuItem value={""}>
              {" "}
              <i className="fa-solid fa-minus"></i>{" "}
            </MenuItem>
            <MenuItem value={"customer"}>Foydalanuvchi</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"kurer"}>Kurer</MenuItem>
            <MenuItem value={"superadmin"}>Super admin</MenuItem>
          </Select>
        </FormControl>
      </div>
      {data?.length >= 0 ? (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead rowCount={data?.length || 0} />
                <TableBody>
                  {data?.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={() => handleClick(row.id)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell component="th" align="left">
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
                            {row.first_name ? (
                              row.first_name
                            ) : (
                              <i className="fa-solid fa-minus"></i>
                            )}
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
                          {row.date_joined.slice(0, 10)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {Math.ceil(count / 30) <= 1 ? (
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
            wdith: "100%",
            justifyContent: "center",
            padding: "150px 0",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
