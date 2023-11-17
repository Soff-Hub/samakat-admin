import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Branches() {
  const [data, setData] = useState(null);
  const [select, setSelect] = useState("");
  const [count, setCount] = useState("");
  const [page, setPage] = React.useState(1);

  async function getOrders() {
    await Client.get(API_ENDPOINTS.ORDER)
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }

  const handleChange = async (event) => {
    setSelect(event.target.value);
    await Client.get(`${API_ENDPOINTS.ORDER}?status=${event.target.value}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.ORDER}?search=${e}`)
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.ORDER}?page=${value}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl">Buyurtmalar</h1>
      </div>
      {data ? (
        <div className="block w-full border shadow-lg p-2 mt-5">
          <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Izlash"
              className="sm:w-full w-1/2 px-3 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
              onChange={(e) => Search(e.target.value)}
            />
            <FormControl
              sx={{ minWidth: 100 }}
              size="small"
              className="sm:w-full  w-1/2"
            >
              <InputLabel
                id="demo-select-small-label"
                placholder="Holat bo'yicha"
              >
                Holat bo'yicha
              </InputLabel>
              <Select
                className="pt-1"
                style={{
                  color: `${
                    select === "approved"
                      ? "green"
                      : select === "pending"
                      ? "#F4CA16"
                      : select === "cancelled"
                      ? "red"
                      : "black"
                  }`,
                }}
                value={select}
                label="Holat bo'yicha"
                onChange={handleChange}
              >
                <MenuItem value={"approved"} style={{ color: "green" }}>
                  tasdiqlangan
                </MenuItem>
                <MenuItem value={"pending"} style={{ color: "#F4CA16" }}>
                  jarayonda
                </MenuItem>
                <MenuItem value={"cancelled"} style={{ color: "red" }}>
                  bekor qilingan
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <Table sx={{ minWidth: 300 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="font-bold text-[16px]">Id</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">
                    Foydalanuvchi nomi
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Telefon raqam</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Umumiy so'mma</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Promo kod</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Holat</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.id}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.user.first_name ? row.user.first_name :  <i className="fa-solid fa-minus"></i>}
                        {row.user.last_name}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.user.phone}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.total_amount}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.promocode === null ? (
                          <i className="fa-solid fa-minus"></i>
                        ) : (
                          row.promocode
                        )}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className={`hover:underline ${
                          row.status === "approved"
                            ? " text-[green]"
                            : row.status === "pending"
                            ? "text-[#F4CA16]"
                            : row.status === "cancelled"
                            ? "text-[red]"
                            : "black"
                        }`}
                      >
                        {row.status === "approved"
                          ? "tasdiqlangan"
                          : row.status === "pending"
                          ? "jarayonda"
                          : row.status === "cancelled"
                          ? "bekor qilingan"
                          : ""}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {(count && Math.ceil(count / 30) <= 1) || count === 0 ? (
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
    </div>
  );
}
