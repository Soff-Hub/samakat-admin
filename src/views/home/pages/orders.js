import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import NavHeader from "components/shared/NavHeader";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Branches() {
  const [data, setData] = useState(null);
  const [select, setSelect] = useState("");
  const [search, setSarch] = useState("");

  async function getBranches() {
    await Client.get(API_ENDPOINTS.ORDER)
      .then((resp) => setData(resp.results))
      .catch((err) => console.log(err));
  }

  const handleChange = async (event) => {
    setSelect(event.target.value);
    await Client.get(`${API_ENDPOINTS.ORDER}?status=${event.target.value}`)
      .then((resp) => {
        console.log(resp);
        // setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const Search = async (e) => {
    setSarch(e)
    await Client.get(`${API_ENDPOINTS.ORDER}?search=${e}`)
      .then((resp) => {
        console.log(resp);
        // setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBranches();
  }, [search, select]);

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl">Buyurtmalar</h1>
      </div>
      {data ? (
        <div className="block w-full border shadow-lg p-2 mt-5">
          <div>
            <input
              type="text"
              placeholder="Buyurtmalarni izlang..."
              className=" w-2/3 px-3 py-3 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
              onChange={(e) => Search(e.target.value)}
            />
            <FormControl
              sx={{ minWidth: 80 }}
              size="small"
              className="mt-8 p-2"
              style={{
                marginTop: "2px",
                marginLeft: "5px",
                minWidth: "300px",
                padding: "13px",
              }}
            >
              <InputLabel
                style={{ padding: "8px" }}
                id="demo-select-small-label"
                placholder="Holat bo'yicha"
              >
                Holat bo'yicha
              </InputLabel>
              <Select
                className="pt-1"
                value={select}
                label="Holat bo'yicha"
                onChange={handleChange}
              >
                <MenuItem value={"approved"}>tasdiqlangan</MenuItem>
                <MenuItem value={"pending"}>jarayonda</MenuItem>
                <MenuItem value={"cancelled"}>bekor qilingan</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="">Foydalanuvchi</TableCell>
                <TableCell align="">Umumiy so'mma</TableCell>
                <TableCell align="">Manzil</TableCell>
                <TableCell align="">Promo kod</TableCell>
                <TableCell align="">Holat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data?.map((row) => {
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
                        {row.user}
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
                        {row.address}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.promocode === null ? (
                          <i class="fa-solid fa-minus"></i>
                        ) : (
                          row.promocode
                        )}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={"actions/?" + row.id}
                        className="hover:underline"
                      >
                        {row.status == "approved"
                          ? "tasdiqlangan"
                          : row.status == "pending"
                          ? "jarayonda"
                          : row.status == "cancelled"
                          ? "bekor qilingan"
                          : ""}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
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
    </div>
  );
}
