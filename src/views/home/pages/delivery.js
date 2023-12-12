import KanbanColumnContainer from "components/kanban/kanban-column-container";
import KanbanColumnHeaderContainer from "components/kanban/kanban-column-header_container";
import KanbanColumnListContainer from "components/kanban/kanban-column-list_container";
import KanbanListItemContainer from "components/kanban/kanban-list-item_container";
import React from "react";
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
import { Button, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const repeat = (column = 4, row = 1) => {
  const result = [];
  for (let i = 0; i < column; i++) {
    result.push({
      id: i,
      title: `column-${i + 1}`,
      tasks: [],
    });
    for (let j = 0; j < row; j++) {
      result[i].tasks.push({
        id: `${i} - ${j}`,
        title: `Nami ${i} - ${j}`,
      });
    }
  }
  return result;
};

export default function Delivery() {

  // const [columns, setColumns] = useState(repeat());

  // const handleDrop = (columnId, rowData) => {
  //   const { rowId, oldColumnId } = rowData;

  //   const oldColumn = columns.find((column) => oldColumnId === column.id);
  //   console.log(oldColumn, `${oldColumn.id} - column, item berayotgan`);

  //   //olinayotgan itemni topish
  //   const rowCurrent = oldColumn.tasks.find((taskID) => taskID.id === rowId);
  //   console.log(rowCurrent);

  //   //iltemni olinayotgan qatoridan o'chirish
  //   oldColumn.tasks = oldColumn.tasks.filter((item) => item.id !== rowId);

  //   //itemni qabul qilayotgan qatorga qoshish
  //   const currentColumn = columns.find((column) => column.id === columnId);
  //   currentColumn.tasks.unshift(rowCurrent);

  //   setColumns([...columns]);
  //   // console.log(columns, "olinayotgan item");
  //   console.log(`columnId: ${columnId}, rowId: ${JSON.stringify(rowData)}`);
  // };

  // console.log("arr2", repeat());

  const [data, setData] = useState(null);
  const [count, setCount] = useState("");
  const [page, setPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusId, setStatusId] = useState("");
  const showModal = (id) => {
    setIsModalOpen(true);
    setStatusId(id)
  };
  const handleOk = async (id) => {
    const data = {
      process: status,
    };
    await Client.patch(API_ENDPOINTS.PATCH_ORDER + `${id}/`, data)
      .then((resp) => {
        console.log(resp);
        getOrders();
        message.open({
          type: "success",
          content: `Holat o'zgartirildi`,
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
      })
      .catch((err) => console.log(err));

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function getOrders() {
    await Client.get(API_ENDPOINTS.ORDER+"?status="+"process")
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

  useEffect(() => {
    getOrders();
  }, []);

  return (
    // <div>
    //   <h3 className="text-lg font-medium pb-4">Yetkazib berish statusi</h3>
    //   <div className="kanban-container">
    //     {columns?.map((el) => (
    //       <KanbanColumnContainer
    //         key={el.id}
    //         columnId={el.id}
    //         onDrop={handleDrop}
    //       >
    //         <KanbanColumnHeaderContainer title="Status" />
    //         <KanbanColumnListContainer>
    //           {el.tasks.map((task, index) => (
    //             <KanbanListItemContainer
    //               key={el.id}
    //               rowId={task.id}
    //               oldColumnId={el.id}
    //             />
    //           ))}
    //         </KanbanColumnListContainer>
    //       </KanbanColumnContainer>
    //     ))}
    //   </div>
    // </div>
    <div>
    <div className="mb-5">
      <h1 className="text-2xl">Yetkazib berish statusi</h1>
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
        </div>
        <Table sx={{ minWidth: 300 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold text-[16px]">Buyurtmachi</span>
              </TableCell>
              <TableCell>
                <span className="font-bold text-[16px]">
                  Buyurtma Idsi
                </span>
              </TableCell>
              <TableCell>
                <span className="font-bold text-[16px]">Narx</span>
              </TableCell>
              <TableCell>
                <span className="font-bold text-[16px]">To'lov turi</span>
              </TableCell>
          
              <TableCell>
                <span className="font-bold text-[16px]">Holati</span>
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
                    {/* <Link
                      to={"actions/?" + row.id}
                      className="hover:underline"
                    > */}
                      {row.user.phone}
                    {/* </Link> */}
                  </TableCell>
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
                      {row.total_amount}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      to={"actions/?" + row.id}
                      className="hover:underline"
                    >
                      {row.payment_type === "by_card" ? (
                        <>
                          {/* <i class="fa-regular fa-credit-card"></i> */}
                          {/* <br/> */}
                          <span>Karta orqali</span>
                        </>
                      ) : (
                        <>
                          {/* <i class="fa-solid fa-money-bill-1-wave"></i>  */}
                          {/* <br/> */}
                          <span>Naxt pul orqali</span>
                        </>
                      )}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      to={"actions/?" + row.id}
                      className={`hover:underline ${
                        row.process === "delivered"
                          ? " text-[green]"
                          : row.process === "new"
                          ? "text-[#3B82F6]"
                          : row.process === "collection"
                          ? "text-[#F4CA16]"
                          :  "black"
                      }`}
                    >
                      {row.process === "delivered"
                        ? "Yetkazildi"
                        : row.process === "new"
                        ? "Yangi"
                        : row.process === "collection"
                        ? "Yig'ilmoqda"
                        : row.process === "in_courier" ? "Yo'lda" : ""}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <>
                      <Button onClick={() => showModal(row.id)}>
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Button>
                      <Modal
                        title="Holatni tahrirlash"
                        open={isModalOpen}
                        onOk={() => handleOk(statusId)}
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
                        <ul className="modal-ul-delivry">
                        <li
                            onClick={() => setStatus("new")}
                            style={{
                              backgroundColor:
                                status === "new" ? "#ccc" : "",
                            }}
                          >
                           Yangi
                          </li>
                        <li
                            onClick={() => setStatus("collection")}
                            style={{
                              backgroundColor:
                                status === "collection" ? "#ccc" : "",
                            }}
                          >
                          Yig'ilmoqda
                          </li>
                        
                         
                          <li
                            onClick={() => setStatus("in_cuorier")}
                            style={{
                              backgroundColor:
                                status === "in_courier" ? "#ccc" : "",
                            }}
                          >
                           Yo'lda
                          </li>
                          <li
                            onClick={() => setStatus("delivered")}
                            style={{
                              backgroundColor:
                                status === "delivered" ? "#ccc" : "",
                            }}
                          >
                           Yetkazildi
                          </li>
                        </ul>
                      </Modal>
                    </>
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
