import React from "react";
import { TextField, Tooltip } from "@mui/material";
import { Button, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ReactModal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "500px",
    overflowY: "scroll",
  },
};
export default function Delivery() {
  const [newS, setNewS] = useState([]);
  const [collection, setCollection] = useState([]);
  const [way, setWay] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const [data, setData] = useState(null);
  const [count, setCount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPriceOpen, setIsModalPriceOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusId, setStatusId] = useState("");
  const [priceId, setPriceId] = useState("");
  const [detail, setDetail] = useState(null);
  const [commit, setCommit] = useState("");
  const navigate = useNavigate();

  const showModal = (id) => {
    setIsModalOpen(true);
    setStatusId(id);
  };

  const handleChangeRouter = (id) => {
    navigate(`/users/actions/?detail?${id}`);
  };

  const handleOk = async (id) => {
    if (status === "cancelled") {
      const data = {
        condition: status,
        canceled_comment: commit,
      };
      await Client.patch(API_ENDPOINTS.PATCH_ORDER + `${id}/`, data)
        .then((resp) => {
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
        condition: status,
      };
      await Client.patch(API_ENDPOINTS.PATCH_ORDER + `${id}/`, data)
        .then((resp) => {
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
  const handlePriceOk = async (id) => {
    const data = {
      is_paid: true,
    };
    await Client.patch(API_ENDPOINTS.PATCH_ORDER + `${id}/`, data)
      .then((res) => {
        setIsModalPriceOpen(false)
        getOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handle_is_Paid = async (id) => {
    setPriceId(id)
    setIsModalPriceOpen(true)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePriceCancel = () => {
    setIsModalPriceOpen(false);
  };

  async function getOrders() {
    await Client.get(API_ENDPOINTS.PROCESS)
      .then((resp) => {
        setData(resp);
        // setCount(resp.count);
        setNewS(resp.filter((el) => el.condition === "new"));
        setCollection(resp.filter((el) => el.condition === "collection"));
        setWay(resp.filter((el) => el.condition === "in_courier"));
        setDelivery(resp.filter((el) => el.condition === "delivered"));
      })
      .catch((err) => console.log(err));
  }



  useEffect(() => {
    getOrders();
  }, []);

  const getDate = (date) => {
    const Date = date?.slice(0, 10);
    const time = date?.slice(11, 18);
    return Date + "\n" + time;
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  async function openModal(id) {
    setIsOpen(true);
    await Client.get(API_ENDPOINTS.DETAIL_ORDER + `${id}/`)
      .then((resp) => {
        setDetail(resp);
      })
      .catch((err) => console.log(err));
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }


  console.log('address', newS);
  

  return (
    <div className="p-2">
      <div className="mb-2">
        <h1 className="text-2xl mt-2">Kurer</h1>
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
                    {el?.created_at} 
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
                      onClick={() => openModal(el.id)}
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
                    {el?.created_at}
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
                      onClick={() => openModal(el.id)}
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
                      onClick={() => openModal(el.id)}
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
                    {el?.created_at}
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
                      onClick={() => openModal(el.id)}
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

          <ReactModal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Mahsulot</h2>
              <button onClick={closeModal}>
                <i class="fa-solid fa-xmark fa-lg"></i>
              </button>
            </div>
            <div>
              {detail ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "400px",
                  }}
                  className="text-center w-full flex flex-col	"
                >
                  <form className="w-full p-2 bg-slate-200  flex flex-col justify-start gap-5 mt-6  create-branch-form">
                    <TextField
                      label="Foydalanuvchi"
                      variant="outlined"
                      size="large"
                      type="text"
                      value={detail.user_about ? detail?.user_about?.user : "-"}
                      onClick={() => handleChangeRouter(detail.user_about?.id)}
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
                      {detail?.product_orders?.map((el, i) => (
                        <li className="font-normal font-sans text-base pl-2">
                          {i + 1}. {el.product_data?.name}{" "} {el?.quantity} ta
                        </li>
                      ))}
                    </ul>
                  </form>
                </div>
              ) : (
                ""
              )}
            </div>
          </ReactModal>
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
          <Modal
            title="Pulini o'zgartirish uchun ogohlantirish"
            open={isModalPriceOpen}
            onOk={() => handlePriceOk(priceId)}
            onCancel={handlePriceCancel}
            okText="Xa"
            cancelText="Ortga"
            okButtonProps={{
              style: {
                backgroundColor: "#3B82F6",
                color: "white",
              },
            }}
          >
          <h2>Puli to'langanligiga ishonchingiz komilmi?</h2>
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
