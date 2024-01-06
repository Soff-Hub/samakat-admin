  import React from "react";
  import { TextField, Tooltip } from "@mui/material";
  import { Button, Modal, message } from "antd";
  import { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { API_ENDPOINTS } from "service/ApiEndpoints";
  import Client from "service/Client";
  import CircularProgress from "@mui/material/CircularProgress";
  import Box from "@mui/material/Box";

  export default function Delivery() {
    const [newS, setNewS] = useState([]);
    const [collection, setCollection] = useState([]);
    const [way, setWay] = useState([]);
    const [delivery, setDelivery] = useState([]);

    const [data, setData] = useState(null);
    const [count, setCount] = useState("");
    const [page, setPage] = React.useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [status, setStatus] = useState("");
    const [statusId, setStatusId] = useState("");
    const [detail, setDetail] = useState(null);
    const [commit, setCommit] = useState("");
    const navigate = useNavigate();

    const showModal = (id) => {
      setIsModalOpen(true);
      setStatusId(id);
    };
    const showModalDetail = async (id) => {
      setIsModalOpenDetail(true);
      await Client.get(API_ENDPOINTS.DETAIL_ORDER + `${id}/`)
        .then((resp) => {
          setDetail(resp);
        })
        .catch((err) => console.log(err));
    };

    const handleChangeRouter = (id) => {
      navigate(`/users/actions/?detail?${id}`);
    };

    const handleOkDetail = () => {
      setIsModalOpenDetail(false);
    };

    const handleCancelDetail = () => {
      setIsModalOpenDetail(false);
    };

    const handleOk = async (id) => {
      if (status === "cancelled") {
        const data = {
          status: status,
          commentary: commit,
        };
        await Client.patch(API_ENDPOINTS.PATCH_ORDER + `${id}/`, data)
          .then((resp) => {
            console.log(resp);
            getOrders();
            message.open({
              type: "success",
              content: `Status o'zgartirildi`,
              className: "custom-class",
              style: {
                marginTop: "20vh",
              },
            });
            setStatus("");
          })
          .catch((err) => {
            console.log(err);
            message.open({
              type: "error",
              content: `Status o'zgartirilmadi`,
              className: "custom-class",
              style: {
                marginTop: "20vh",
              },
            });
          });
      } else {
        const data = {
          process: status,
        };
        await Client.patch(API_ENDPOINTS.PATCH_ORDER + `${id}/`, data)
          .then((resp) => {
            console.log(resp);
            getOrders();
            message.open({
              type: "success",
              content: `Status o'zgartirildi`,
              className: "custom-class",
              style: {
                marginTop: "20vh",
              },
            });
            setStatus("");
          })
          .catch((err) => {
            console.log(err);
            message.open({
              type: "error",
              content: `Status o'zgartirilmadi`,
              className: "custom-class",
              style: {
                marginTop: "20vh",
              },
            });
          });
      }

      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    async function getOrders() {
      await Client.get(API_ENDPOINTS.PROCESS)
        .then((resp) => {
          setData(resp.results);
          setCount(resp.count);
          setNewS(resp.results.filter((el) => el.process === "new"));
          setCollection(resp.results.filter((el) => el.process === "collection"));
          setWay(resp.results.filter((el) => el.process === "in_courier"));
          setDelivery(resp.results.filter((el) => el.process === "delivered"));
        })
        .catch((err) => console.log(err));
    }

    const handle_is_Paid = async (id) => {
      const data = {
        is_paid: true,
      };
      await Client.patch(API_ENDPOINTS.PATCH_ORDER + `${id}/`, data)
        .then((res) => {
          console.log(res);
          getOrders();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      getOrders();
    }, []);

    const getDate = (date) => {
      const Date = date.slice(0, 10);
      const time = date.slice(11, 18);
      return Date + "\n" + time;
    };

    return (
      <div>
        <div className="mb-5">
          <h1 className="text-2xl">Kurer</h1>
        </div>
        {data ? (
          <div className="delivery-container">
            <div className="delivery-item-container">
              <div className="delivery-item-container_header">
                <h3>Yangi</h3>
              </div>

              <div className="delivery-item-container">
                {newS?.map((el) => (
                  <div className="delivery-item-container_component">
                    <div className="item">
                      <div className=" font-medium text-[#757575]">N{el.id}</div>
                      <div>{el.branch}</div>
                    </div>
                    <div classNacme=" font-medium text-[#757575] mb-1">
                      {getDate(el?.created_at)}
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {el.is_paid ? (
                        <Tooltip title="Buyurtma narxi to'langan" placement="top">
                          <button
                            style={{ cursor: "not-allowed" }}
                            className="money-btn true"
                          >
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title="Buyurtma narxi to'lanmagan"
                          placement="top"
                        >
                          <button
                            style={{ cursor: "not-allowed" }}
                            className="money-btn false"
                          >
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                          </button>
                        </Tooltip>
                      )}

                      <Button
                        style={{ width: "70%" }}
                        onClick={() => showModalDetail(el.id)}
                      >
                        <i class="fa-solid fa-layer-group"></i>
                      </Button>
                      <Button onClick={() => showModal(el.id)}>
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="delivery-item-container">
              <div className="delivery-item-container_header">
                <h3>Yig'ilmoqda</h3>
              </div>
              <div className="delivery-item-container">
                {collection?.map((el) => (
                  <div className="delivery-item-container_component">
                    <div className="item">
                      <div className=" font-medium text-[#757575]">N{el.id}</div>
                      <div>{el.branch}</div>
                    </div>
                    <div classNacme=" font-medium text-[#757575] mb-1">
                      {getDate(el?.created_at)}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      {el.is_paid ? (
                        <Tooltip title="Buyurtma narxi to'langan" placement="top">
                          <button
                            style={{ cursor: "not-allowed" }}
                            className="money-btn true"
                          >
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title="Buyurtma narxi to'lanmagan"
                          placement="top"
                        >
                          <button
                            style={{ cursor: "not-allowed" }}
                            className="money-btn false"
                          >
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                          </button>
                        </Tooltip>
                      )}
                      <Button
                        style={{ width: "70%" }}
                        onClick={() => showModalDetail(el.id)}
                      >
                        <i class="fa-solid fa-layer-group"></i>
                      </Button>
                      <Button onClick={() => showModal(el.id)}>
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="delivery-item-container">
              <div className="delivery-item-container_header">
                <h3>Yo'lda</h3>
              </div>
              <div className="delivery-item-container">
                {way?.map((el) => (
                  <div className="delivery-item-container_component">
                    <div className="item">
                      <div className=" font-medium text-[#757575]">N{el.id}</div>
                      <div>{el.branch}</div>
                    </div>
                    <div classNacme=" font-medium text-[#757575] mb-1">
                      {getDate(el?.created_at)}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      {el.is_paid ? (
                        <Tooltip title="Buyurtma narxi to'langan" placement="top">
                          <button
                            style={{ cursor: "not-allowed" }}
                            className="money-btn true"
                          >
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title="Buyurtma narxi to'lanmagan"
                          placement="top"
                        >
                          <button
                            style={{ cursor: "not-allowed" }}
                            className="money-btn false"
                          >
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                          </button>
                        </Tooltip>
                      )}
                      <Button
                        style={{ width: "70%" }}
                        onClick={() => showModalDetail(el.id)}
                      >
                        <i class="fa-solid fa-layer-group"></i>
                      </Button>
                      <Button onClick={() => showModal(el.id)}>
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="delivery-item-container">
              <div className="delivery-item-container_header">
                <h3>Yetkazildi</h3>
              </div>
              <div className="delivery-item-container">
                {delivery?.map((el) => (
                  <div className="delivery-item-container_component">
                    <div className="item">
                      <div className=" font-medium text-[#757575]">N{el.id}</div>
                      <div>{el.branch}</div>
                    </div>
                    <div classNacme=" font-medium text-[#757575] mb-1">
                      {getDate(el?.created_at)}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: "10px",
                      }}
                    >
                      {el.is_paid ? (
                        <Tooltip title="Buyurtma narxi to'langan" placement="top">
                          <button
                            style={{ cursor: "not-allowed" }}
                            className="money-btn true"
                          >
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title="Buyurtma narxi to'lanmagan"
                          placement="top"
                        >
                          <button
                            onClick={() => handle_is_Paid(el.id)}
                            className="money-btn false"
                          >
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                          </button>
                        </Tooltip>
                      )}
                      <Button
                        style={{ width: "70%" }}
                        onClick={() => showModalDetail(el.id)}
                      >
                        <i class="fa-solid fa-layer-group"></i>
                      </Button>
                      <Button onClick={() => showModal(el.id)}>
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Modal
              title="Buyurtma ma'lumotlari "
              open={isModalOpenDetail}
              onOk={handleOkDetail}
              okText="Ortga"
              onCancel={handleCancelDetail}
              cancelButtonProps={{
                style: {
                  display: "none",
                },
              }}
              okButtonProps={{
                style: {
                  backgroundColor: "#3B82F6",
                  color: "white",
                },
              }}
            >
              {detail ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="text-center w-full flex flex-col	"
                >
                  <form className="w-full p-2 bg-slate-200  flex flex-col gap-5 mt-6  create-branch-form">
                    <TextField
                      label="Foydalanuvchi"
                      variant="outlined"
                      size="large"
                      type="text"
                      value={detail.user_about ? detail?.user_about?.user : "-"}
                      onClick={() => handleChangeRouter(detail.user?.id)}
                    />
                    <TextField
                      label="Umumiy so'mma"
                      variant="outlined"
                      size="large"
                      value={detail.total_amount ? detail?.total_amount : "-"}
                      type="text"
                    />
                    <TextField
                      label="Soni"
                      variant="outlined"
                      size="large"
                      value={
                        detail.count_products
                          ? detail?.count_products + " ta"
                          : "-"
                      }
                      type="text"
                    />
                    <TextField
                      label="Vaqti"
                      variant="outlined"
                      size="large"
                      value={
                        detail?.created_at
                          ? detail?.created_at?.slice(0, 10) +
                            " | " +
                            detail?.created_at?.slice(11, 18)
                          : "-"
                      }
                      type="text"
                    />
                    <TextField
                      label="Manzil"
                      variant="outlined"
                      size="large"
                      value={detail?.address ? detail?.address?.location : "-"}
                      type="text"
                    />
                    {/* <TextField
                  label="Promo kod"
                  variant="outlined"
                  size="large"
                  value={detail.promocode ? detail?.promocode?.code : "-"}
                  type="text"
                /> */}
                    <TextField
                      label="Holat"
                      variant="outlined"
                      size="large"
                      value={
                        detail && detail?.status === "approved"
                          ? "tasdiqlangan"
                          : detail && detail?.status === "process"
                          ? "jarayonda"
                          : detail && detail?.status === "cancelled"
                          ? "bekor qilingan"
                          : ""
                      }
                      type="text"
                    />

                    <TextField
                      label="Izoh"
                      variant="outlined"
                      size="large"
                      value={detail.commentary ? detail?.commentary : "-"}
                      type="text"
                      multiline
                      rows={4}
                    />
                    {/* <div className="text-left flex align-center">
                      <label className="font-normal font-sans text-base pt-2 pr-2">
                        Eshik oldida qoldirish
                      </label>
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={detail ? detail?.leave : ""}
                      >
                        <FormControlLabel
                          value={detail ? detail?.leave : ""}
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </div> */}
                  </form>
                  <form className="w-full mt-2  bg-slate-200 p-2 mt-6 ">
                    <p className="font-normal font-sans text-start text-lg pb-2">
                      Buyurtmalar:
                    </p>
                    <ul className="border-[#AEB2B8] py-2 text-start border rounded">
                      {detail?.product_count?.map((el, i) => (
                        <li className="font-normal font-sans text-base pl-2">
                          {i + 1}. {el.product}{" "}
                          {el.amount !== null ? ` - ${el.amount}` : ""}
                        </li>
                      ))}
                    </ul>
                  </form>
                </div>
              ) : (
                ""
              )}
            </Modal>

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
                    backgroundColor: status === "new" ? "#ccc" : "",
                  }}
                >
                  Yangi
                </li>
                <li
                  onClick={() => setStatus("collection")}
                  style={{
                    backgroundColor: status === "collection" ? "#ccc" : "",
                  }}
                >
                  Yig'ilmoqda
                </li>

                <li
                  onClick={() => setStatus("in_courier")}
                  style={{
                    backgroundColor: status === "in_courier" ? "#ccc" : "",
                  }}
                >
                  Yo'lda
                </li>
                <li
                  onClick={() => setStatus("delivered")}
                  style={{
                    backgroundColor: status === "delivered" ? "#ccc" : "",
                  }}
                >
                  Yetkazildi
                </li>
                <li
                  onClick={() => setStatus("cancelled")}
                  style={{
                    backgroundColor: status === "cancelled" ? "#ccc" : "",
                  }}
                >
                  <p> Bekor qilindi</p>
                  {status === "cancelled" ? (
                    <textarea
                      onChange={(e) => setCommit(e.target.value)}
                      style={{ width: "100%" }}
                      cols="30"
                      rows="5"
                    ></textarea>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </Modal>
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
