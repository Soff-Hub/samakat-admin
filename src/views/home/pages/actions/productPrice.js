import { Input, Select, Space } from "antd";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";


export default function ProductPrice() {
  const [submiting, setSubmiting] = useState(false);
  const [page, setPage] = useState(true);
  const [colorList, setColorList] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [branch, setBranch] = useState([]);
  const [product, setProduct] = useState([]);
  const [dataArray, setDataArray] = useState([
    {
      color: "",
      feature: "",
      price: "",
    },
  ]);
  const [dataArrayFilial, setDataArrayFilial] = useState([
    {
      branch: "",
      product_variant: "",
      quantity: "",
    },
  ]);
  const { search } = useLocation();
  const params = search.split("=")?.[1];

  const handleAddRow = () => {
    setDataArray([
      ...dataArray,
      {
        color: "",
        feature: "",
        price: "",
      },
    ]);
  };
  const handleAddRowBranch = () => {
    setDataArrayFilial([
      ...dataArrayFilial,
      {
        branch: "",
        product_variant: "",
        quantity: ""
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const newArray = [...dataArray];
    newArray[index][field] = value;
    setDataArray(newArray);
  };
  const handleInputChangeFilial = (index, field, value) => {
    const newArray = [...dataArrayFilial];
    newArray[index][field] = value;
    setDataArrayFilial(newArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", dataArray);
    setSubmiting(true);

    const data = {
      product_variants : dataArray
    } 

    await Client.post(`${API_ENDPOINTS.CREATE_PRODUCT_PRICE_POST + params}/`, data)
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        // navigate(`/products/actions/productPrice?id=${data?.id}`);
        setPage(false);
        getProductBranchs()
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const handleSubmitBranch = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", dataArrayFilial);
    setPage(false);

    setSubmiting(true);

    const data = {
      product_quantities : dataArrayFilial
    } 

    await Client.post(`${API_ENDPOINTS.CREATE_PRODUCT_BRANCH_POST + params}/`, data)
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products`);
        setPage(false);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    // document.querySelector(".create-branch-form").reset();
  };

  const getProductFeature = async () => {
    await Client.get(`${API_ENDPOINTS.CREATE_PRODUCT_PRICE + params}/`)
      .then((resp) => {
        console.log("date", resp);
        setColorList(
          resp?.colors?.map((e) => ({
            label: e?.name,
            value: e?.id,
          }))
        );
        setFeatureList(
          resp?.feature_items?.map((e) => ({
            label: e?.value,
            value: e?.id,
          }))
        );
      })
      .catch((err) => console.log(err));
  };
  const getProductBranchs = async () => {
    await Client.get(`${API_ENDPOINTS.CREATE_PRODUCT_BRANCH + params}/`)
      .then((resp) => {
        console.log("date", resp);
        setBranch(
          resp?.branches?.map((e) => ({
            label: e?.name,
            value: e?.id,
          }))
        );
        setProduct(
          resp?.product_variants?.map((e) => ({
            label: <div>
              <span>{e.color}</span> <span>{e.feature}</span>
            </div> ,
            value: e?.id,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductFeature();
    getProductBranchs()
  }, []);

  // console.log("dataArrayFilial", colorList, featureList);

  return (
    <>
      {page ? (
        <div className="bg--color px-2 py-3">
          <h3 className="font-semibold	">Mahsulot narxini qo'shish</h3>
          <form onSubmit={handleSubmit} className="mt-3 create-branch-form ">
            {dataArray?.map((item, index) => (
              <div className="row" key={index} style={{ marginBottom: "10px" }}>
                <div className="col-md-3">
                  <Space
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    direction="vertical"
                  >
                    <Select
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Ranglar"
                      onChange={(value) =>
                        handleInputChange(index, "color", value)
                      }
                      options={colorList}
                    />
                  </Space>
                </div>

                <div className="col-md-3">
                  <Space
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    direction="vertical"
                  >
                    <Select
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="O'lchamlarni kiriting"
                      onChange={(value) =>
                        handleInputChange(index, "feature", value)
                      }
                      options={featureList}
                    />
                  </Space>
                </div>

                <Input
                  size="small"
                  className="col-md-3"
                  placeholder="Narxni kiriting"
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                />
                <div className="col-md-3">
                  <Button
                    variant="contained"
                    sx={{
                      background: "#000",
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                    size="small"
                    style={{ width: "100%" }}
                    startIcon={<AddIcon />}
                    onClick={handleAddRow}
                  >
                    Qo'shish
                  </Button>
                </div>
              </div>
            ))}
            <div className="col-md-4">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "green",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                style={{ width: "100%", marginTop: "10px" }}
              >
                {submiting ? "Qo'shilmoqda" : "Qo'shish"}
              </Button>
            </div>
          </form>
          <Toaster />
        </div>
      ) : (
        <div className="bg--color px-2 py-3">
          <h3 className="font-semibold create-branch-form	">Mahsulot filialini qo'shish</h3>
          <form onSubmit={handleSubmitBranch} className="mt-3">
            {dataArrayFilial.map((item, index) => (
              <div className="row" key={index} style={{ marginBottom: "10px" }}>
                <div className="col-md-3">
                  <Space
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    direction="vertical"
                  >
                    <Select
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Filial"
                      onChange={(value) =>
                        handleInputChangeFilial(index, "branch", value)
                      }
                      options={branch}
                    />
                  </Space>
                </div>

                <div className="col-md-3">
                  <Space
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    direction="vertical"
                  >
                    <Select
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Mahsulot"
                      onChange={(value) =>
                        handleInputChangeFilial(index, "product_variant", value)
                      }
                      options={product}
                    />
                  </Space>
                </div>

                <Input
                  size="small"
                  className="col-md-3"
                  placeholder="Sonini kiriting"
                  onChange={(e) =>
                    handleInputChangeFilial(index, "quantity", e.target.value)
                  }
                />
                <div className="col-md-3">
                  <Button
                    variant="contained"
                    sx={{
                      background: "#000",
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                    size="small"
                    style={{ width: "100%" }}
                    startIcon={<AddIcon />}
                    onClick={handleAddRowBranch}
                  >
                    Qo'shish
                  </Button>
                </div>
              </div>
            ))}
            <div className="col-md-4">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "green",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                style={{ width: "100%", marginTop: "10px" }}
              >
                 {submiting ? "Qo'shilmoqda" : "Qo'shish"}
              </Button>
            </div>
          </form>
          <Toaster />
        </div>
      )}
    </>
  );
}
