import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, Select, Space } from "antd";

export default function AksiyaSeller() {
  const [submiting, setSubmiting] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryData, setCategoryData] = useState([]);
  const [relatedCategory, setRelatedCategory] = React.useState([]);
  const [img, setImage] = useState(null);
  const [productSelect, setProductSelect] = useState(true);

  const handleChangeRelatedCategory = (event) => {
    setRelatedCategory(event);
    setProductSelect(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const data = {
      products: relatedCategory,
    };

    setSubmiting(true);
    await Client.post(
      API_ENDPOINTS.BADGE_ADD_SELLER + `${location.search.split("?")[2]}/`,
      data
    )
      .then((data) => {
        toast.success("Aksiya muvaffaqiyatli tahrirlandi");
        setTimeout(() => {
          navigate("/aksiya");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const Aksiya = async () => {
    await Client.get(`${API_ENDPOINTS.BADGE}${location.search.split("?")[2]}`)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = async (e) => {
    await Client.get(`${API_ENDPOINTS.PRODUCT_BADGE_PRODUCT}`)
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
    await Client.get(`${API_ENDPOINTS.BADGE}${location.search.split("?")[2]}`)
      .then((res) => {
        setData(res);
        setRelatedCategory(res.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
    Aksiya();
    // eslint-disable-next-line
  }, []);

  console.log("data", data);

  return (
    <div className="px-2 py-3">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] pb-3">Aksiyaga mahsulot qo'shish</h1>
          <Link to="/aksiya">
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
                  value={data?.name_uz ? data?.name_uz : ""}
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
                  value={data?.name_ru ? data?.name_ru : ""}
                />
              </div>
            </div>
            <TextField
              label="Aksiya rangi"
              variant="outlined"
              size="large"
              type="color"
              value={data?.hex_code ? data?.hex_code : ""}
            />

            <Space
              style={{
                width: "100%",
                textAlign: "left",
              }}
              direction="vertical"
            >
              {
                // data?.products?.length > 0 &&

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
                defaultValue={
                  data?.products?.map((item) => item)
                }
              />
              }
            </Space>

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
  );
}
