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
import ResponsiveDialog from "components/shared/modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import NavHeaderSelect from "components/shared/NavHeaderSelect";
import { CircularProgress } from "@mui/material";
import { Input, Select } from "antd";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const headCells = [
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Mahsulot nomi",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Do'kon",
  },
  {
    id: "calories",
    numeric: false,
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
    numeric: 1,
    disablePadding: false,
    label: "Mahsulot sonini tahrirlash",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "O'chirish",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
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
  const [data, setData] = React.useState(null);
  const [count, setCount] = useState(10);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [branch, setBranch] = useState("");
  const [filialData, setFilialData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [countProduct, setCountProduct] = useState("");
  const { role } = useSelector((state) => state.admin);

  const Search = async (e) => {
    await Client.get(
      `${API_ENDPOINTS.PRODUCT_COUNT_BRANCH}?branch=${branch}&search=${e}`
    )
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeFilial = async (event) => {
    setBranch(event);
    await Client.get(`${API_ENDPOINTS.PRODUCT_COUNT_BRANCH}?branch=${event}`)
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeStore = async (event) => {
    setBranch(event);
    await Client.get(
      `${API_ENDPOINTS.PRODUCT_COUNT_BRANCH}?branch__seller=${event}`
    )
      .then((resp) => {
        setData(resp.results);
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
  const getProductBranchData = async () => {
    setPage(1);
    await Client.get(`${API_ENDPOINTS.PRODUCT_COUNT_BRANCH}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const getFilial = async () => {
    await Client.get(API_ENDPOINTS.GET_COUNT_BRANCH)
      .then((res) => {
        setCount(res.count);
        setFilialData(
          res?.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStore = async () => {
    await Client.get(API_ENDPOINTS.STOR_LIST)
      .then((res) => {
        setCount(res.count);
        setStoreData(
          res?.map((el) => ({
            label: el.name,
            value: el.id,
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
        setOpen(false);
        getProductBranchData();
      })
      .catch((err) => console.log(err));
  };

  const handleChangeCount = async (id) => {
    const data = {
      quantity: countProduct ? +countProduct : "",
    };
    await Client.patch(
      `${API_ENDPOINTS.UPDATE_PRODUCT_COUNT_BRANCH}${id}/`,
      data
    )
      .then((data) => {
        setCountProduct("");
        toast.success("Filialdagi mahsulot soni muvaffaqiyatli tahrirlandi");
        getProductBranchData();
      })
      .catch((err) => {
        toast.error(
          `${
            err?.response?.data?.quantity
              ? "Mahsulotlar sonini kiritish majburiy"
              : "Xatolik! Qayta urinib ko'ring"
          } `
        );
      });
  };

  useEffect(() => {
    getFilial();
    getStore();
    getProductBranchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="px-2 py-3 bg--color">
      <div>
        <NavHeaderSelect
          admin={role === "superadmin" ? true : false}
          title="Filiallardagi mahsulotlar"
        />
      </div>
      <Toaster />
      {data ? (
        <Box sx={{ minWidth: 300 }}>
          <Paper sx={{ mb: 2, p: 2 }}>
            <TableContainer>
              <div className="flex items-center gap-1 colorr">
                <input
                  type="text"
                  placeholder="Izlash"
                  className="sm:w-full  w-1/3 px-3 ps-3 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
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
                  options={[
                    {
                      label: "Hammasi",
                      value: "",
                    },
                    ...filialData,
                  ]}
                ></Select>
                {role === "superadmin" ? (
                  <Select
                    mode="select"
                    placeholder="
                  Do'kon"
                    style={{
                      width: "100%",
                      height: "47px",
                    }}
                    onChange={handleChangeStore}
                    options={[
                      {
                        label: "Hammasi",
                        value: "",
                      },
                      ...storeData,
                    ]}
                  ></Select>
                ) : (
                  ""
                )}
              </div>
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
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">
                          {row.seller ? row.seller : "-"}
                        </TableCell>
                        <TableCell align="left">{row.branch}</TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left" sx={{ position: "relative" }}>
                          <div className="flex w-75 justify-end end-100">
                            <Input
                              type="number"
                              placeholder="Sonini kiriting"
                              onChange={(e) => setCountProduct(e.target.value)}
                              style={{
                                display: "inline-block",
                                position: "absalute",
                              }}
                            />
                            <IconButton
                              onClick={() => handleChangeCount(row?.id)}
                              color="primary"
                            >
                              <SaveAsIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell align="left" sx={{ position: "relative" }}>
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

            {Math.ceil(count / 30) <= 1 || count === 0 ? (
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
