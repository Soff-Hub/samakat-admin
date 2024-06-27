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
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { useSelector } from "react-redux";
import { Select } from "antd";

export default function Branches() {
  const [data, setData] = useState(null);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [count, setCount] = useState("");
  const [page, setPage] = React.useState(1);
  const { role } = useSelector((state) => state.admin);
  const [storeData, setStoreData] = useState([]);
  const status = {
    approved: {
      name: "tasdiqlangan",
      color: "green",
    },
    pending: {
      name: "kutilmoqda",
      color: "#F4CA16",
    },
    cancelled: {
      name: "bekor qilingan",
      color: "red",
    },
  };

  async function getBranches() {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }

  async function handleDelete() {
    await Client.delete(`${API_ENDPOINTS.DELETE_BRANCH}${deleteId}/`)
      .then((resp) => {
        setOpen(false);
        console.log(resp);
        getBranches();
      })
      .catch((err) => console.log(err));
  }

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

  const handleChangeStore = async (event) => {
    await Client.get(`${API_ENDPOINTS.GET_BRANCHS}?seller=${event}`)
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBranches();
    (role === "superadmin" || role === "employee" )&& getStore()  
  }, []);


  return (
    <div className="px-2 py-3">
      <NavHeader
        title="Filiallar"
        admin={role === "superadmin" ? true : false}
      />

      {(role === "superadmin" || role === "employee") ? (
        <Select
          mode="select"
          placeholder="
                  Do'kon"
          style={{
            width: "100%",
            height: "47px",
          }}
          className="mt-4"
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

      {data ? (
        <div className="block w-full border shadow-lg p-2 colorr mt-2">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="font-bold text-[16px]">Filial Nomi</span>
                </TableCell>
                {(role === "superadmin" || role === "employee") ? (
                  <TableCell>
                    <span className="font-bold text-[16px]">Do'kon Nomi</span>
                  </TableCell>
                ) : (
                  ""
                )}
                <TableCell align="">
                  <span className="font-bold text-[16px]">Aniq Manzil</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-bold text-[16px]">Yaratilgan vaqt</span>
                </TableCell>
                <TableCell align="right">
                  <span className="font-bold text-[16px]">Holati</span>
                </TableCell>
                <TableCell align="right">
                  <span className="font-bold text-[16px]">Amallar</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => {
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
                        {row?.name}
                      </Link>
                    </TableCell>
                    {(role === "superadmin" || role === "employee") ? (
                      <TableCell component="th" scope="row">
                        <Link
                          to={"actions/" + row?.uuid}
                          className="hover:underline"
                        >
                          {row?.seller}
                        </Link>
                      </TableCell>
                    ) : (
                      ""
                    )}
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/" + row?.uuid}
                        className="hover:underline"
                      >
                        {row?.address}
                      </Link>
                    </TableCell>
                    <TableCell  align="center" component="th" scope="row">
                      <Link
                        to={"actions/" + row?.uuid}
                        className="hover:underline"
                      >
                       {row?.created_at}
                      </Link>
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      <Link
                        to={"actions/" + row?.uuid}
                        className={`hover:underline text-[${
                          status[row?.status]?.color
                        }] `}
                      >
                        {status[row?.status]?.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={"actions/" + row?.uuid}>
                        <IconButton color="primary">
                          <DriveFileRenameOutlineOutlinedIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setDeleteId(row?.uuid);
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
            {( Math.ceil(count / 30) <= 1) || count === 0 ? (
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
