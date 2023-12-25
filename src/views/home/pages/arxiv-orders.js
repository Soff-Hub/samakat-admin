import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Button, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";


export default function ArxivOrders() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState("");
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("approved");

  async function getOrders() {
    await Client.get(API_ENDPOINTS.ARCHIVE)
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.ARCHIVE}?search=${e}`)
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.ARCHIVE}?page=${value}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const getDate = (date) => {
    const Date = date.slice(0,10)
    const time = date.slice(11,18)
    return time + '\n' + Date
  }

  const handleChange = async (e) => {
    setPage(1);
    setStatus(e.target.value);
    await Client.get(
      `${API_ENDPOINTS.ARCHIVE}?status=${e.target.value}`
    )
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
        <h1 className="text-2xl">Buyurtmalar arxivi</h1>
      </div>
      <ToggleButtonGroup
        color="primary"
        value={status}
        exclusive
        onChange={handleChange}
        className="mt-5 flex items-center w-full"
      >
        <ToggleButton className="w-full" value="approved">
          Tasdiqlanganlar
        </ToggleButton>
        <ToggleButton className="w-full" value="cancelled">
          Bekor qilinganlar
        </ToggleButton>
      </ToggleButtonGroup>
      {data ? (
        <div className="block w-full border shadow-lg p-2 mt-5">
          <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Izlash"
              className="sm:w-full w-1/2 px-3 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
              onChange={(e) => Search(e.target.value)}
            />
          </div>
          <Table sx={{ minWidth: 300 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="font-bold text-[16px]">Id</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">
                    Foydalanuvchi 
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Soni</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Umumiy so'mma</span>
                </TableCell>
                
                {/* <TableCell>
                    <span className="font-bold text-[16px]">Promo kod</span>
                  </TableCell> */}
                <TableCell>
                  <span className="font-bold text-[16px]">Manzil</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">To'lov usuli</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Vaqti</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Holat</span>
                </TableCell>
                <TableCell></TableCell>
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
                        {row.user_about ? (
                          row.user_about?.user
                        ) : (
                          <i className="fa-solid fa-minus"></i>
                        )}
                      </Link>
                    </TableCell>
                   
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        <span className="font-semibold">
                          {row?.count_products} {" "}
                        </span>{" "}
                        { row?.count_products ? "ta" : ""}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        <span className="font-semibold">
                          {" "}
                          {row?.total_amount}
                        </span>{" "}
                        {row?.total_amount ? "so'm" : ""}
                      </Link>
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                        <Link to={"/promos"} className="hover:underline">
                          {row.promocode === null ? (
                            <i className="fa-solid fa-minus"></i>
                          ) : (
                            row.promocode?.code
                          )}
                        </Link>
                      </TableCell> */}
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.address === null ? (
                          <i className="fa-solid fa-minus"></i>
                        ) : (
                          row.address
                        )}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.payment_type === "by_card" ? (
                          <>
                            <i class="fa-regular fa-credit-card"></i>
                            <br />
                            <span>Karta orqali</span>
                          </>
                        ) : (
                          <>
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                            <br />
                            <span>Naxt pul orqali</span>
                          </>
                        )}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.created_at === null ? (
                          <i className="fa-solid fa-minus"></i>
                        ) : (
                         getDate( row.created_at)
                        )}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className={`hover:underline ${
                          row.status === "approved"
                            ? " text-[green]"
                            : row.status === "process"
                            ? "text-[#F4CA16]"
                            : row.status === "cancelled"
                            ? "text-[red]"
                            : "text-[#3B82F6]"
                        }`}
                      >
                        {row.status === "approved"
                          ? "tasdiqlangan"
                          : row.status === "pending"
                          ? "kutilmoqda"
                          : row.status === "cancelled"
                          ? "bekor qilingan"
                          : row.status === "process"
                          ? "jarayonda"
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
