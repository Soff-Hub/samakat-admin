import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Select, Space } from "antd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Retsepts() {
  const [submiting, setSubmiting] = useState(false);
  const [badge, setBadge] = useState(" ");
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryData, setCategoryData] = useState([]);
  const [relatedCategory, setRelatedCategory] = React.useState([]);
  const [lifeImage, setLifeImage] = useState(null);
  const [img, setImage] = useState(null);
  const [discount ,setDiscount] = useState(0)

  const handleChangeRelatedCategory = (event) => {
    setRelatedCategory(event);
    console.log(event);
  };
  const LifeImage = (e) => {
    let img = window.URL.createObjectURL(e.target.files[0]);
    setLifeImage(img);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append("text", text);
    formData.append("textColor", badge);
    formData.append("discount", discount);
    if (relatedCategory?.length > 0) {
      formData.append("related_categories", JSON.stringify(relatedCategory));
    }
    if (img) {
      formData.append("image", img);
    }

    setSubmiting(true);
    await Client.post(API_ENDPOINTS.CREATE_BADGE, formData)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli qo'shildi");
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

  const getProducts = async (e) => {
    await Client.get(`${API_ENDPOINTS.PRODUCT}`)
      .then((resp) => {
        setCategoryData(
          resp.results?.map((el) => ({
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
        setDiscount()
        setImage()
        setLifeImage()
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
      <div>
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
              onSubmit={handleSubmitAdd}
              className="w-1/2 m-auto flex mt-4 flex-col gap-5 create-branch-form"
            >
              <TextField
                label="Belgi matni"
                variant="outlined"
                size="large"
                type="text"
                required
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <TextField
                label="Belgi rangi"
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

            <Button
                component="label"
                variant="contained"
                startIcon={lifeImage === null ? <CloudUploadIcon /> : ""}
                style={{
                  // maxWidth: "550px",
                  width: "100%",
                  backgroundImage: `url(${lifeImage ? lifeImage : ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: `${lifeImage ? "220px" : "40px"}`,
                }}
              >
                {lifeImage === null ? " Rasm yuklash" : ""}
                <input
                  style={{ display: "none" }}
                  onChange={(e) => (setImage(e.target.files[0]), LifeImage(e))}
                  type="file"
                />
              </Button>


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
    <div>
      <div className="text-center">
        <h1 className="text-[35px] pb-3">Aksiya qo'shish</h1>
        <Toaster />
        <div className="flex gap-5">
          <form
            onSubmit={handleSubmitAdd}
            className="w-1/2 m-auto  flex flex-col gap-5 create-branch-form"
          >
            <TextField
              label="Aksiya nomi"
              variant="outlined"
              size="large"
              type="text"
              required
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <TextField
              label="Belgi rangi"
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

           <div>
           <Button
                component="label"
                variant="contained"
                startIcon={lifeImage === null ? <CloudUploadIcon /> : ""}
                style={{
                  // width: "50%",
                  backgroundImage: `url(${lifeImage ? lifeImage : ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: `${lifeImage ? "220px" : "40px"}`,
                }}
              >
                {lifeImage === null ? " Rasm yuklash" : ""}
                <input
                  style={{ display: "none" }}
                  onChange={(e) => (setImage(e.target.files[0]), LifeImage(e))}
                  type="file"
                />
              </Button>
              <Button style={{height:'40px', marginLeft:'10px'}} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
              
           </div>
              <TextField
                label="Chegirmasi"
                variant="outlined"
                size="large"
                type="number"
                defaultValue={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
              />

            <Button
              variant="outlined"
              size="large"
              type="submit"
              disabled={submiting}
            >
              {submiting ? "Qo'shilmoqda" : "Qo'shish"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
