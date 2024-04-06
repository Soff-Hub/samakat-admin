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
  const [categoryData, setCategoryData] = useState([]);
  const [relatedCategory, setRelatedCategory] = React.useState([]);
  const [lifeImage, setLifeImage] = useState(null);
  const [img, setImage] = useState(null);
  const [discount, setDiscount] = useState(1);
  const [productSelect, setProductSelect] = useState(true);

  const handleChangeRelatedCategory = (event) => {
    setRelatedCategory(event);
    setProductSelect(true);
  };
  const LifeImage = (e) => {
    if (e?.target?.files[0]) {
      let img = window.URL.createObjectURL(e.target.files[0]);
      setLifeImage(img);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (discount >= 1) {
      const formData = new FormData();
      formData.append("text_uz", text);
      formData.append("text_ru", textRu);
      formData.append("textColor", badge);
      formData.append("discount", discount);
      if (!relatedCategory?.[0]?.label) {
        formData.append("products", JSON.stringify(relatedCategory));
      }
      if (img) {
        formData.append("image", img);
      }
      setSubmiting(true);
      await Client.patch(
        API_ENDPOINTS.PATCH_BADGE + `${location.search.split("?")[2]}/`,
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
    } else {
      setProductSelect(false);
    }
  };

  const handleSubmitAdd = async () => {
    if (discount >= 1) {
      const formData = new FormData();
      formData.append("text_uz", text);
      formData.append("text_ru", textRu);
      formData.append("textColor", badge);
      formData.append("discount", discount);
      formData.append("type", location.search.split("?")[1]);
      if (!relatedCategory?.[0]?.name > 0) {
        formData.append("products", JSON.stringify(relatedCategory));
      }
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
          toast.error(err.response.data.map((el, i) => i + 1 + "." + el.msg));
        });

      setSubmiting(false);
      document.querySelector(".create-branch-form").reset();
    } else {
      setProductSelect(false);
    }
  };

  const DiscountPrice = (e) => {
    setDiscount(e.target.value);
    setProductSelect(true);
  };

  const getProducts = async (e) => {
    await Client.get(
      `${API_ENDPOINTS.PRODUCT_MIN_LIST_BADGE}?type=${
        location.search.split("?")[1] !== "edit"
          ? location.search.split("?")[1]
          : ""
      }`
    )
      .then((resp) => {
        setCategoryData(
          resp?.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  const getBadge = async () => {
    await Client.get(
      `${API_ENDPOINTS.DETAIL_BADGE}${location.search.split("?")[2]}`
    )
      .then((res) => {
        setData(res);
        setText(res.text);
        setBadge(res.textColor);
        setDiscount(res.discount);
        // setImage(res.image);
        setLifeImage(res.image);
        setRelatedCategory(
          res.products?.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
    if (location.search.split("?")[1] === "edit") {
      getBadge();
    }
    // eslint-disable-next-line
  }, []);

  return location.search.split("?")[1] === "edit" ? (
    data ? (
      <div className="px-2 py-3">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] pb-3">Aksiya tahrirlash</h1>
            <Link to="/product-badge">
              <Button
                variant="contained"
                color="info"
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
              <div className="row" >
                <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6" >
              <TextField
                label="Aksiya matni"
                variant="outlined"
                size="large"
                type="text"
                required
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
                </div>
                <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6" >
              <TextField
                label="Aksiya matni (ru) "
                variant="outlined"
                size="large"
                type="text"
                required
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
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
                  onChange={handleChangeRelatedCategory}
                  options={categoryData}
                  defaultValue={relatedCategory}
                />
              </Space>

              <div className={!productSelect ? "error-product" : ""}>
                <TextField
                  label="Chegirmasi (%)"
                  variant="outlined"
                  size="large"
                  type="number"
                  style={{ width: "100%" }}
                  defaultValue={discount}
                  onChange={(e) => {
                    DiscountPrice(e);
                  }}
                />
              </div>

              <Button
                variant="outlined"
                size="large"
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
           <div className="row" >
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
              value={text}
              onChange={(e) => {
                setText(e.target.value);
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
                onChange={handleChangeRelatedCategory}
                options={categoryData}
              />
            </Space>
            <div className={!productSelect ? "error-product" : ""}>
              <TextField
                label="Chegirmasi (%)"
                variant="outlined"
                size="large"
                style={{ width: "100%" }}
                type="number"
                defaultValue={discount}
                onChange={(e) => {
                  DiscountPrice(e);
                }}
              />
            </div>

            <Button
              variant="outlined"
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
