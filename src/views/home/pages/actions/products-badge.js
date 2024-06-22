import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, Select, Space } from "antd";

export default function Aksiya() {
  const [submiting, setSubmiting] = useState(false);
  const [badge, setBadge] = useState("#000");
  const [text, setText] = useState("");
  const [textRu, setTextRu] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [img, setImage] = useState(null);
  const [mainImageReal, setMainImageReal] = useState("");
  const [product, setProduct] = useState([]);
  const [productData, setProductData] = useState([]);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    text && formData.append("name_uz", text);
    textRu && formData.append("name_ru", textRu);
    badge && formData.append("hex_code", badge);
    if (img) {
      formData.append("image", img);
    }
    setSubmiting(true);
    await Client.patch(
      API_ENDPOINTS.BADGE + `${location.search.split("?")[2]}/`,
      formData
    )
      .then((data) => {
        toast.success("Aksiya muvaffaqiyatli tahrirlandi");
        setTimeout(() => {
          navigate("/product-badge");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const handleSubmitAdd = async () => {
    const formData = new FormData();
    formData.append("name_uz", text);
    formData.append("name_ru", textRu);
    formData.append("hex_code", badge);
    formData.append("products", product ? [product] : product );
    if (img) {
      formData.append("image", img);
    }

    setSubmiting(true);
    await Client.post(API_ENDPOINTS.CREATE_BADGE, formData)
      .then((data) => {
        toast.success("Aksiya muvaffaqiyatli qo'shildi");
        setTimeout(() => {
          navigate("/product-badge");
        }, 300);
      })
      .catch((err) => {
        toast.error(err?.response?.data);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const getBadge = async () => {
    await Client.get(`${API_ENDPOINTS.BADGE}${location.search.split("?")[2]}`)
      .then((res) => {
        setData(res);
        // setText(res.name_uz);
        // setTextRu(res.name_ru);
        // setBadge(res.hex_code);
        setMainImageReal(res.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = async () => {
    await Client.get(`${API_ENDPOINTS.PRODUCT_MIN_LIST}`)
      .then((res) => {
        console.log("res", res);
        setProductData(
          res?.map((e) => ({
            label: e?.name,
            value: e?.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ImageChangeAll = (e) => {
    setImage(e.target.files[0]);
    setMainImageReal(window.URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeProduct = async (event) => {
    setProduct(event);
  };

  useEffect(() => {
    if (location.search.split("?")[1] === "edit") {
      getBadge();
    }
    getProducts();
    // eslint-disable-next-line
  }, []);

  console.log("data", data);

  return location.search.split("?")[1] === "edit" ? (
    data ? (
      <div className="px-2 py-3">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] pb-3">Aksiya tahrirlash</h1>
            <Link to="/product-badge">
              <Button
                variant="contained"
                sx={{
                  background: "#000",
                  "&:hover": {
                    backgroundColor: "#333", // Change this to the desired hover color
                  },
                }}
                size="large"
                startIcon={<ArrowBackIcon />}
              >
                Orqaga
              </Button>
            </Link>
          </div>
          <Toaster />
          <div className="flex gap-5">
            <form
              onSubmit={handleSubmitEdit}
              className="w-1/2 m-auto flex mt-4 flex-col gap-4 colorr p-3 create-branch-form"
            >
              <div className="row">
                <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <TextField
                    label="Aksiya matni"
                    variant="outlined"
                    size="large"
                    type="text"
                    required
                    className="w-100"
                    value={text ? text : data?.name_uz ? data?.name_uz : ""}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <TextField
                    label="Aksiya matni (ru) "
                    variant="outlined"
                    size="large"
                    type="text"
                    required
                    className="w-100"
                    value={textRu ? textRu : data?.name_ru ? data?.name_ru : ""}
                    onChange={(e) => {
                      setTextRu(e.target.value);
                    }}
                  />
                </div>
              </div>
              <TextField
                label="Aksiya rangi"
                variant="outlined"
                size="large"
                type="color"
                defaultValue={data?.hex_code}
                onChange={(e) => {
                  setBadge(e.target.value);
                }}
              />

              {/* <Space
                style={{
                  width: "100%",
                  textAlign: "left",
                }}
                direction="vertical"
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  placeholder="Mahsulotlar"
                  onChange={handleChangeProduct}
                  options={productData}
                  defaultValue={data?.products?.map((item) => item)}
                />
              </Space> */}

              <div className="d-flex gap-3">
                <div
                  style={{
                    maxWidth: "100px",
                    width: "80px",
                    backgroundImage: `url(${""})`,
                    backgroundSize: "cover",
                    height: "80px",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    position: "relative",
                  }}
                >
                  <i class="fa-solid fa-file-arrow-down"></i>
                  <input
                    type="file"
                    style={{
                      opacity: "0",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      bottom: "0",
                      right: "0",
                    }}
                    onChange={(e) => ImageChangeAll(e)}
                  />
                </div>
                {mainImageReal && (
                  <div className="d-flex gap-2 align-items-en">
                    <img width={80} src={mainImageReal} alt="photo" />
                    <i
                      onClick={() => (setImage(""), setMainImageReal(""))}
                      class="fa-solid fa-trash"
                    ></i>
                  </div>
                )}
              </div>

              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "#000",
                  "&:hover": {
                    backgroundColor: "#333", // Change this to the desired hover color
                  },
                }}
                type="submit"
                disabled={submiting}
              >
                {submiting ? "Saqlanmoqda" : "Saqlash"}
              </Button>
            </form>
          </div>
        </div>
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
    )
  ) : (
    <div className="px-2 py-3">
      <div className="text-center">
        <h1 className="text-[35px] pb-3">Aksiya qo'shish</h1>
        <Toaster />
        <div className="flex gap-5">
          <Form
            onFinish={(e) => handleSubmitAdd(e)}
            className="w-1/2 m-auto  flex flex-col gap-4 colorr p-3 create-branch-form"
          >
            <div className="row">
              <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                <TextField
                  label="Aksiya nomi"
                  variant="outlined"
                  size="large"
                  type="text"
                  required
                  className="w-100"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </div>
              <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                <TextField
                  label="Aksiya nomi (ru)"
                  variant="outlined"
                  size="large"
                  type="text"
                  required
                  className="w-100 mt-2 m-xxl-0 m-xl-0 m-lg-0 m-md-0 m-sm-0 "
                  value={textRu}
                  onChange={(e) => {
                    setTextRu(e.target.value);
                  }}
                />
              </div>
            </div>
            <TextField
              label="Aksiya rangi"
              variant="outlined"
              size="large"
              type="color"
              value={badge}
              onChange={(e) => {
                setBadge(e.target.value);
              }}
            />
{/* 
            <Space
              style={{
                width: "100%",
                textAlign: "left",
              }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                placeholder="Mahsulotlar"
                onChange={handleChangeProduct}
                options={productData}
              />
            </Space> */}

            <div className="d-flex gap-3">
              <div
                style={{
                  maxWidth: "100px",
                  width: "80px",
                  backgroundImage: `url(${""})`,
                  backgroundSize: "cover",
                  height: "80px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  position: "relative",
                }}
              >
                <i class="fa-solid fa-file-arrow-down"></i>
                <input
                  type="file"
                  style={{
                    opacity: "0",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    bottom: "0",
                    right: "0",
                  }}
                  onChange={(e) => ImageChangeAll(e)}
                />
              </div>
              {mainImageReal && (
                <div className="d-flex gap-2 align-items-en">
                  <img width={80} src={mainImageReal} alt="photo" />
                  <i
                    onClick={() => (setImage(""), setMainImageReal(""))}
                    class="fa-solid fa-trash"
                  ></i>
                </div>
              )}
            </div>

            <Button
              variant="contained"
              sx={{
                background: "#000",
                "&:hover": {
                  backgroundColor: "#333", // Change this to the desired hover color
                },
              }}
              size="large"
              type="submit"
              disabled={submiting}
            >
              {submiting ? "Qo'shilmoqda" : "Qo'shish"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
