import NavHeader from "components/shared/NavHeader";
import React, { useEffect, useState } from "react";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { Link } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import { useTheme } from "contexts/themeContex";
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
import ResponsiveDialog from "components/shared/modal";

function Employee() {
  const [data, setData] = useState(null);
  const { theme } = useTheme();
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = useState(null)
  // const deleteImployee = async (id) => {
  //   const data = { id: id };
  //   await Client.delete(API_ENDPOINTS.DETAIL_EMPLOYEE + `${id}/`, data)
  //     .then((resp) => {
  //       getOrders();
  //       setData(resp.results);
  //     })
  //     .catch((err) => console.log(err));
  // };

  async function handleDelete() {
    await Client.delete(`${API_ENDPOINTS.DETAIL_EMPLOYEE}${deleteId}/`)
      .then((resp) => {
        setOpen(false);
        console.log(resp);
        getOrders();
      })
      .catch((err) => console.log(err));
  }

  async function getOrders() {
    await Client.get(API_ENDPOINTS.EMPLOYEE)
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.EMPLOYEE}?page=${value}`)
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
    <div className="px-2 py-3">
      <NavHeader title="Xodimlar" />
      <div className="py-3  px-2">
        {/* <Table columns={columns} dataSource={data} /> */}

        <div
          className={`block w-full border shadow-lg p-2 mt-5 ${
            theme.palette.mode === "light" ? "colorr" : "colorr-b"
          } `}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="font-bold text-[16px]">Ism</span>
                </TableCell>
                <TableCell align="">
                  <span className="font-bold text-[16px]">Nomer</span>
                </TableCell>
                <TableCell align="right">
                  <span className="font-bold text-[16px]">Tahrirlash</span>
                </TableCell>
                <TableCell align="right">
                  <span className="font-bold text-[16px]">O'chirish</span>
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
                        to={`actions/${row?.id}`}
                        className="hover:underline"
                      >
                        {row.first_name}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={`actions/${row?.id}`}
                        className="hover:underline"
                      >
                        {row.phone}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`actions/${row?.id}`}>
                        <IconButton color="info">
                          <DriveFileRenameOutlineOutlinedIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setDeleteId(row?.id);
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
            {count && Math.ceil(count / 30) <= 1 || count === 0 ? (
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
        <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
      </div>
    </div>
  );
}

export default Employee;
