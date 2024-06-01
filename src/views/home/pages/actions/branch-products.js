import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Input, Select } from "antd";
import { useTheme } from "contexts/themeContex";

export default function Retsepts() {
  const [submiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const [editData, setEditData] = useState(null);
  const [branchData, setBranchData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [branch, setBranch] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(false);
  const [errorProduct, setErrorProduct] = useState(false);
  const [productOption, setProductOption] = useState([]);

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if (branch !== "" && product !== "") {
      if (branch !== "") {
        setError(false);
      } else if (product !== "") {
        setErrorProduct(false);
      }
      const data = {
        branch: branch,
        product: product,
        quantity: +quantity,
        type: location.search.split("?")[1],
      };
      setSubmiting(true);
      await Client.post(API_ENDPOINTS.CREATE_PRODUCT_COUNT_BRANCH, data)
        .then((data) => {
          toast.success("Fillarlardagi mahsulot soni muvaffaqiyatli qo'shildi");
          setTimeout(() => {
            navigate("/branch-products");
          }, 300);
        })
        .catch((err) => {
          toast.error(`${err?.response?.data?.msg}`);
        });

      setSubmiting(false);
      document.querySelector(".create-branch-form").reset();
    } else {
      if (branch === "") {
        setError(true);
      } else if (product === "") {
        setErrorProduct(true);
      }
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const data = {};

    if (branch !== "") {
      Object.assign(data, { branch: branch });
    }
    if (product !== "") {
      Object.assign(data, { product: product });
    }
    if (quantity !== "") {
      Object.assign(data, { quantity: +quantity });
    }

    setSubmiting(true);
    await Client.patch(
      `${API_ENDPOINTS.UPDATE_PRODUCT_COUNT_BRANCH}${
        location.search.split("?")[2]
      }/`,
      data
    )
      .then((data) => {
        toast.success("Filiallardagi mahsulot muvaffaqiyatli tahrirlandi");
        setTimeout(() => {
          navigate("/branch-products");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const getItem = async () => {
    await Client.get(
      API_ENDPOINTS.DETAIL_PRODUCT_COUNT_BRANCH + location.search.split("?")[2]
    )
      .then((res) => {
        setEditData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBranch = async () => {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((res) => {
        setBranchData(
          res.results.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProduct = async () => {
    await Client.get(
      API_ENDPOINTS.PRODUCT_MIN_LIST +
        `/?type=${
          location.search.split("?")[1] !== "edit"
            ? location.search.split("?")[1]
            : ""
        }`
    )
      .then((res) => {
        setProductOption(
          res?.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );

        setProductData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBranch();
    getProduct();
    if (location.search.split("?")[1] === "edit") {
      getItem();
    }
    // eslint-disable-next-line
  }, []);

  const onChangeProduct = (e) => {
    setProduct(e);
    setErrorProduct(false);
  };
  const onChangeBranch = (e) => {
    setBranch(e);
    setError(false);
  };

  return location.search.split("?")[1] === "edit" ? (
    editData ? (
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] pb-3">
            Filiallardagi mahsulotlarni tahrirlash
          </h1>
          <Link to="/branch-products">
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ArrowBackIcon />}
            >
              Orqaga
            </Button>
          </Link>
        </div>
        <div className="w-1/2 m-auto">
          <div>
            <Toaster />
            <div className="flex gap-5">
              <form
                onSubmit={handleSubmitEdit}
                className={`w-full flex flex-col gap-4 colorr p-3 create-branch-form ${
                  theme.palette.mode === "light" ? "colorr" : "colorr-b"
                } `}
              >
                <div>
                  <label className="text-slate-400">Filial :</label>
                  <Select
                    mode="select"
                    placeholder="Filial *"
                    required
                    defaultValue={editData?.branch}
                    style={{
                      width: "100%",
                      height: "47px",
                      // marginTop: "25px",
                    }}
                    className={`${
                      error ? "rounded-md border border-rose-500" : ""
                    }`}
                    onChange={onChangeBranch}
                    options={branchData}
                  ></Select>
                </div>
                <div>
                  <label className="text-slate-400">Mahsulot :</label>
                  <Select
                    mode="select"
                    placeholder="Mahsulot"
                    showSearch
                    allowClear
                    defaultValue={editData?.product}
                    style={{
                      width: "100%",
                      height: "47px",
                    }}
                    onChange={onChangeProduct}
                    className={`${
                      errorProduct ? "rounded-md border border-rose-500" : ""
                    }`}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    options={productOption}
                  ></Select>
                </div>
                <div>
                  <label className="text-slate-400">Soni :</label>
                  <Input
                    size="large"
                    type="number"
                    defaultValue={editData?.quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    placeholder="Soni"
                  />
                </div>

                <Button
                  variant="contained"
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
    <div
      style={{
        display: "flex",
        justifyContent: "content",
        maxWidth: "500px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <div>
        <h1 className="text-[35px] py-3">Filiallardagi mahsulotlar</h1>
        <Toaster />
        <div className="flex gap-5">
          <form
            onSubmit={handleSubmitAdd}
            className={`w-full flex flex-col gap-4 create-branch-form p-3 ${
              theme.palette.mode === "light" ? "colorr" : "colorr-b"
            } `}
          >
            <Select
              mode="select"
              placeholder="Filial *"
              required
              style={{
                width: "100%",
                height: "47px",
              }}
              className={`${error ? "rounded-md border border-rose-500" : ""}`}
              onChange={onChangeBranch}
              options={branchData}
            ></Select>
            <Select
              mode="select"
              placeholder="Mahsulot"
              showSearch
              allowClear
              style={{
                width: "100%",
                height: "47px",
              }}
              onChange={onChangeProduct}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              className={`${
                errorProduct ? "rounded-md border border-rose-500" : ""
              }`}
              options={productOption}
            ></Select>
            <Input
              value={quantity}
              size="large"
              type="number"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder="Soni"
            />
            <Button
              variant="contained"
              color="primary"
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
