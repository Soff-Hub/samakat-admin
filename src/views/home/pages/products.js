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
import { Link } from "react-router-dom";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ResponsiveDialog from "components/shared/modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";
import NavHeaderProduct from "components/shared/NavHeaderProduct";

function EnhancedTableHead() {
  const { role } = useSelector((state) => state.admin);
  const headCells = [
    {
      id: "calories",
      numeric: false,
      disablePadding: false,
      label: "Id",
    },
    {
      id: "calories",
      numeric: false,
      disablePadding: false,
      label: "Nomi",
    },
    {
      id: "carbs",
      numeric: 1,
      disablePadding: false,
      label: "Sotuvda",
    },
    {
      id: "carbsd",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: "Amallar",
    },
  ];

  const headCellsAdmin = [
    {
      id: "calories",
      numeric: false,
      disablePadding: false,
      label: "Id",
    },
    {
      id: "calories",
      numeric: false,
      disablePadding: false,
      label: "Nomi",
    },
    {
      id: "carbs",
      numeric: 1,
      disablePadding: false,
      label: "Sotuvda",
    },
    {
      id: "carbsd",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "carbsd",
      numeric: true,
      disablePadding: false,
      label: "Do'kon",
    },
    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: "Amallar",
    },
  ];
  return (
    <TableHead>
      <TableRow>
        {(role === "superadmin" || role === "employee")
          ? headCellsAdmin.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={
                  headCell.numeric === 1
                    ? "center"
                    : headCell.numeric
                    ? "right"
                    : "left"
                }
              >
                <span className="font-bold text-[16px]"> {headCell.label}</span>
              </TableCell>
            ))
          : headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={
                  headCell.numeric === 1
                    ? "center"
                    : headCell.numeric
                    ? "right"
                    : "left"
                }
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
  // const [type, setType] = React.useState("bistro");
  const [data, setData] = React.useState(null);
  const [count, setCount] = useState("");
  const [constCount, setConstCount] = useState("");
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryValue, setCategoryValue] = useState("");
  const [SaleValue, setSaleValue] = useState(null);
  const [storeValue, setStoreValue] = useState("");
  const [errorData, setErrorData] = useState("");
  const [storeList, setStoreList] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [branch, setBranch] = useState([]);
  const { role } = useSelector((state) => state.admin);
  const [sale_product, setSale_product] = useState([
    {
      id: 1,
      name: "Sotuvda",
      value: "true",
    },
    {
      id: 2,
      name: "Sotuvda emas",
      value: "false",
    },
    {
      id: 3,
      name: "Tugagan mahsulotlar",
      value: "tugagan",
    },
  ]);

  const status = {
    approved: {
      name: "tasdiqlangan",
      color: "green",
    },
    pending: {
      name: "tekshirilmoqda",
      color: "#F4CA16",
    },
    cancelled: {
      name: "bekor qilingan",
      color: "red",
    },
  };

  const getProductData = async () => {
    setPage(1);
    await Client.get(`${API_ENDPOINTS.PRODUCT}?page=${page}`)
      .then((resp) => {
        setCount(resp.count);
        setConstCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };
  const getCategory = async () => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES_CHAILD}`)
      .then((resp) => {
        setCategory(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const getStoreList = async () => {
    await Client.get(`${API_ENDPOINTS.STOR_LIST}`)
      .then((resp) => {
        setStoreList(resp);
      })
      .catch((err) => console.log(err));
  };

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.PRODUCT}?search=${e}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    await Client.delete(`${API_ENDPOINTS.DELETE_PRODUCT}${deleteId}/`)
      .then((resp) => {
        setOpen(false);
        getProductData();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setErrorData(err.response.data.msg);
      });
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.PRODUCT}?page=${value}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeCategory = async (event) => {
    setCategoryValue(event.target.value);
    await Client.get(
      `${API_ENDPOINTS.PRODUCT}?page=${page}&category=${event.target.value}&on_sale=${SaleValue}&seller=${storeValue}`
    )
      .then((resp) => {
        setCount(resp.results);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeSale = async (event) => {
    if (event.target.value === "tugagan") {
      setQuantity(0);
    }
    setSaleValue(event.target.value);
    await Client.get(
      `${API_ENDPOINTS.PRODUCT}?page=${page}&on_sale=${
        event.target.value === "tugagan" ? "" : event.target.value
      }`
    )
      .then((resp) => {
        setCount(resp.results);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeStore = async (event) => {
    setStoreValue(event.target.value);
    await Client.get(
      `${API_ENDPOINTS.PRODUCT}?page=${page}&on_sale=${SaleValue}&category=${categoryValue}&seller=${event.target.value}`
    )
      .then((resp) => {
        setCount(resp.results);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  async function getBranches() {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((resp) => {
        setBranch(resp.results);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProductData();
    getCategory();
    getStoreList();
    getBranches();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="px-2 py-3">
      <div>
        {branch?.length > 0 && (
          <NavHeaderProduct
            admin={role === "superadmin" ? true : false}
            title="Mahsulotlar"
          />
        )}
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-sans">
          Jami mahsulotlar{" "}
          <span className="slashed-zero font-semibold font-mono text-[#3B82F6]">
            {constCount}
          </span>{" "}
          {constCount ? "ta  " : ""}
        </h1>
      </div>

      <Box sx={{ width: "100%" }} className="colorr p-2 pt-3">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Izlash"
            className=" lg:w-1/3 md:w-1/3 sm:w-full   px-3 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
            onChange={(e) => Search(e.target.value)}
          />
          <FormControl size="small" className=" w-1/3  ">
            <InputLabel
              id="demo-select-small-label"
              placholder="Holat bo'yicha"
            >
              Kategoriya
            </InputLabel>
            <Select
              className="py-0.5"
              value={categoryValue}
              label="Holat bo'yicha"
              onChange={handleChangeCategory}
            >
              <MenuItem value={""}>
                <i className="fa-solid fa-minus"></i>{" "}
              </MenuItem>
              {category ? (
                category?.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>

          <FormControl size="small" className="w-1/3 ">
            <InputLabel
              id="demo-select-small-label"
              placholder="Sotuv bo'yicha"
            >
              Sotuv bo'yicha
            </InputLabel>
            <Select
              className="py-0.5"
              value={SaleValue}
              label="Sotuv bo'yicha"
              onChange={handleChangeSale}
            >
              <MenuItem value={""}>
                <i className="fa-solid fa-minus"></i>{" "}
              </MenuItem>
              {sale_product &&
                sale_product?.map((item, i) => (
                  <MenuItem key={i} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {role === "superadmin" || role === "employee" ? (
            <FormControl size="small" className="w-1/3 ">
              <InputLabel
                id="demo-select-small-label"
                placholder="Filial bo'yicha"
              >
                Do'kon
              </InputLabel>
              <Select
                className="py-0.5"
                value={storeValue}
                label="Sotuv bo'yicha"
                onChange={handleChangeStore}
              >
                <MenuItem value={" "}>
                  <i className="fa-solid fa-minus"></i>{" "}
                </MenuItem>
                {storeList?.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
        </div>

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
                          <Link to={`actions/?edit?${row.id}`}>{row.id}</Link>
                        </TableCell>
                        <TableCell
                          className="text-truncate "
                          align="left"
                          style={{
                            width: "200px",
                            maxWidth: "200px",
                            minWidth: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Link to={`actions/?edit?${row.id}`}>
                            <span className="text-truncate">{row.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`actions/?edit?${row.id}`}>
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
                          <Link to={`actions/?edit?${row.id}`}>
                            <span
                              style={{
                                color: `${status[row.status].color}`,
                              }}
                            >
                              {status[row.status].name}
                            </span>
                          </Link>
                        </TableCell>
                        {(role === "superadmin" || role === "employee") && (
                          <TableCell align="right">
                            <Link to={`actions/?edit?${row.id}`}>
                              <span>
                                {row?.seller?.name ? (
                                  row?.seller?.name
                                ) : (
                                  <i className="fa-solid fa-minus"></i>
                                )}
                              </span>
                            </Link>
                          </TableCell>
                        )}
                        <TableCell align="right" sx={{ position: "relative" }}>
                          {/* <Link
                            to={`actions/?addVariant?${row.id}?${row.variant_id}`}
                          >
                            <IconButton color="primary" aria-label="delete">
                              <AddCircleOutlinedIcon />
                            </IconButton>
                          </Link> */}
                          {row.is_delete ? (
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
                          ) : (
                            ""
                          )}
                          <Link to={`actions/?edit?${row.id}`}>
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
          {!(count >= 30) ? (
            <></>
          ) : (
            <div className="m-3 mb-5">
              <Stack spacing={2}>
                <Typography> Sahifa : {page}</Typography>
                <Pagination
                  count={Math.ceil(count / 30) <= 1 ? 1 : Math.ceil(count / 30)}
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
        errorData={errorData}
      />
    </div>
  );
}
