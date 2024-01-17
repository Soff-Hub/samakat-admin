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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Branches() {
  const [data, setData] = useState(null);
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
  const getDate = (date) => {
    const Date = date.slice(0, 10);
    const time = date.slice(11, 18);
    return time + "\n" + Date;
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="p-2">
      <div className="mb-5">
        <h1 className="text-2xl"  >Buyurtmalar</h1>
      </div>
      {data ? (
        <div className="block w-full border shadow-lg p-2 colorr">
          <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Izlash"
              className="sm:w-full w-1/2 px-3 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
              onChange={(e) => Search(e.target.value)}
            />
          </div>
          <Table sx={{ minWidth: 300 }} aria-label="caption table" >
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="font-bold text-[16px]">Id</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Foydalanuvchi</span>
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
                  <span className="font-bold text-[16px]">Filial</span>
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
                        {row?.user_about?.user ? (
                          row?.user_about?.user
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
                          {row?.count_products}{" "}
                        </span>{" "}
                        {row?.count_products ? "ta" : ""}
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
                        <span className="font-semibold">
                          {" "}
                          {row?.total_amount}
                        </span>{" "}
                        {row?.total_amount ? "so'm" : ""}
                      </Link>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.branch === null ? (
                          <i className="fa-solid fa-minus"></i>
                        ) : (
                          row.branch
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
                        {getDate(row?.created_at)}
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
                    {/* <TableCell component="th" scope="row">
                      <>
                      {
                        row.payment_type === "by_card" ?
                        "" :
                        <Button style={{
                          cursor:`${row.payment_type === "by_card" ? "not-allowed" : "pointer"}`
                        }} onClick={() =>  showModal(row.id) }>
                          <i class="fa-solid fa-pen-to-square"></i>
                        </Button>

                      }
                        <Modal
                          title="Holatni tahrirlash"
                          open={isModalOpen}
                          onOk={() => handleOk()}
                          onCancel={handleCancel}
                          okText="Yuborish"
                          cancelText="Ortga"
                          okButtonProps={{
                            style: {
                              backgroundColor: "#3B82F6",
                              color: "white",
                            },
                          }}
                        >
                          <ul className="modal-ul">
                            <li
                              onClick={() => setStatus("approved")}
                              style={{
                                backgroundColor:
                                  status === "approved" ? "#ccc" : "",
                              }}
                            >
                              Tasdiqlangan
                            </li>
                            <li
                              onClick={() => setStatus("pending")}
                              style={{
                                backgroundColor:
                                  status === "pending" ? "#ccc" : "",
                              }}
                            >
                              Jarayonda
                            </li>
                            <li
                              onClick={() => setStatus("in_courier")}
                              style={{
                                backgroundColor:
                                  status === "in_courier" ? "#ccc" : "",
                              }}
                            >
                              Yo'lda
                            </li>
                            <li
                              onClick={() => setStatus("cancelled")}
                              style={{
                                backgroundColor:
                                  status === "cancelled" ? "#ccc" : "",
                              }}
                            >
                              Bekor qilingan
                            </li>
                           
                          </ul>
                        </Modal>
                      </>
                    </TableCell> */}
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
