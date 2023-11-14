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
import Checkbox from "@mui/material/Checkbox";
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
import NavHeader from "components/shared/NavHeader";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Select } from "antd";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Mahsulot",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Filial",
  },

  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Soni",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Amallar",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [type, setType] = React.useState("bistro");
  const [data, setData] = React.useState(null);
  const [count, setCount] = useState(10);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [branch, setBranch] = useState("");
  const [product, setProduct] = useState("");
  const [filialData, setFilialData] = useState(null);
  const [productData, setProductData] = useState(null);

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

  const handleChange = async (e) => {
    setType(e.target.value);
    setPage(1);
    await Client.get(
      `${API_ENDPOINTS.PRODUCT_COUNT_BRANCH}?page=${page}&branch=${branch}&product=${product}&product__type=${e.target.value}`
    )
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.PRODUCT_COUNT_BRANCH}?search=${e}`)
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeFilial = async (event) => {
    setBranch(event);
    await Client.get(
      `${API_ENDPOINTS.PRODUCT_COUNT_BRANCH}?branch=${event}&product=${product}&product__type=${type}`
    )
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeProductFilter = async (event) => {
    setProduct(event);
    await Client.get(
      `${API_ENDPOINTS.PRODUCT_COUNT_BRANCH}?branch=${branch}&product=${event}&product__type=${type}`
    )
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.RETCIPE}?page=${value}&type=${type}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };
  const getRetsipeData = async () => {
    setPage(1);
    setType("bistro");
    await Client.get(
      `${API_ENDPOINTS.PRODUCT_COUNT_BRANCH}?product__type=${type}`
    )
      .then((resp) => {
        console.log(resp.results);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };
  const getFilial = async () => {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((res) => {
        setFilialData(
          res.results.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProduct = async () => {
    await Client.get(API_ENDPOINTS.PRODUCT_MIN_LIST)
      .then((res) => {
        setProductData(res.results?.map((el) => ({
          label : el.name,
          value : el.id
        }))
          );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    await Client.delete(
      `${API_ENDPOINTS.DELETE_PRODUCT_COUNT_BRANCH}${deleteId}/`
    )
      .then((resp) => {
        console.log(resp);
        setOpen(false);
        getRetsipeData();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRetsipeData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getFilial();
    getProduct();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <NavHeader title="Filiallardagi mahsulotlar" />
      </div>
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={handleChange}
        className="mt-5 flex items-center w-full"
      >
        <ToggleButton className="w-full" value="bistro">
          Быстрый
        </ToggleButton>
        <ToggleButton className="w-full" value="apteka">
          Apteka
        </ToggleButton>
      </ToggleButtonGroup>

      {data ? (
        <Box sx={{ minWidth: 300 }}>
          <Paper sx={{ mb: 2 }}>
            <TableContainer>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="Izlash"
                  className="sm:w-full  w-1/3 px-3 ps-5 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
                  onChange={(e) => Search(e.target.value)}
                />
                <Select
                  mode="select"
                  placeholder="Filial"
                  style={{
                    width: "100%",
                    height: "47px",
                  }}
                  onChange={handleChangeFilial}
                  options={filialData}
                ></Select>
                <Select
                  mode="select"
                  placeholder="Mahsulot"
                  style={{
                    width: "100%",
                    height: "47px",
                  }}
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  onChange={handleChangeProductFilter}
                  options={productData}
                ></Select>
              </div>
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
                  rowCount={data?.length}
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
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.product}</TableCell>
                        <TableCell align="right">{row.branch}</TableCell>
                        <TableCell align="right">{row.quantity} </TableCell>
                        <TableCell align="right" sx={{ position: "relative" }}>
                          <Link to={`actions/?edit?${row.id}`}>
                            <IconButton color="primary">
                              <DriveFileRenameOutlineOutlinedIcon />
                            </IconButton>
                          </Link>
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
    </div>
  );
}
