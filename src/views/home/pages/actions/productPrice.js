import { Input, Select, Space, Steps } from "antd";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductPrice() {
  const [submiting, setSubmiting] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [data, setData] = useState(null);
  const [percent, setPercent] = useState(10);
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = search.split("=")?.[1];
  const [onePrice, setOnePrice] = useState(null)
  const [dataArray, setDataArray] = useState([
    {
      color: null,
      feature: null,
      price: 0,
    },
  ]);
  const [dataArrayDetail, setDataArrayDetail] = useState([]);
  const getProductFeatureDeatil = async () => {
    if (params === "true?id") {
      await Client.get(
        `${API_ENDPOINTS.PRODUCT_LIST_FOR_CREATE}${search.split("=")?.[2]}/`
      )
        .then((resp) => {
          setDataArrayDetail(resp);
        })
        .catch((err) => console.log(err));
    }
  };
  const getProductFeature = async () => {
    await Client.get(
      `${API_ENDPOINTS.CREATE_PRODUCT_PRICE}${
        params == "true?id" ? search.split("=")?.[2] : params
      }/`
    )
      .then((resp) => {
        setData(resp);
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

  const handleAddRow = () => {
    setDataArray([
      ...dataArray,
      {
        color: null,
        feature: null,
        price: 0,
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const newArray = [...dataArray];
    newArray[index][field] = value;
    setDataArray(newArray);
  };

  const handleInputChangeDetail = (index, field, value) => {
    const newArray = [...dataArrayDetail];
    newArray[index][field] = value;
    setDataArrayDetail(newArray);
  };

  const handleRemoveRow = (index) => {
    const newDataArray = [...dataArray];
    newDataArray.splice(index, 1);
    setDataArray(newDataArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitted Data:", dataArray);
    setSubmiting(true);

   

    const data = {
      product_variants: dataArray,
    };
    

    await Client.post(
      `${API_ENDPOINTS.CREATE_PRODUCT_PRICE_POST + params}/`,
      data
    )
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products/actions/productBranch?branch=${params}`);
        setPercent(100);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const handleClickOnePrice = async () => {
    setSubmiting(true);

    const data ={
      product_variants :  [{
        color: null,
        feature: null,
        price: +onePrice
      }]
    }

    await Client.post(
      `${API_ENDPOINTS.CREATE_PRODUCT_PRICE_POST + params}/`,
      data
    )
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products/actions/productBranch?branch=${params}`);
        setPercent(100);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", dataArray);
    setSubmiting(true);

    const data = {
      new_variants: dataArray,
      old_variants: dataArrayDetail,
    };

    await Client.post(
      `${API_ENDPOINTS.UPDATE_PRODUCT_PRICE}${
        params == "true?id" ? search.split("=")?.[2] : params
      }/`,
      data
    )
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products`);
        setPercent(100);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };
  const handleClickOnePriceEdit = async () => {
    setSubmiting(true);

    const data ={
      product_variants :  [{
        color: null,
        feature: null,
        price: +onePrice
      }]
    }

    await Client.post(
      `${API_ENDPOINTS.UPDATE_PRODUCT_PRICE}${
        params == "true?id" ? search.split("=")?.[2] : params
      }/`,
      data
    )
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products`);
        setPercent(100);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  useEffect(() => {
    getProductFeature();
    getProductFeatureDeatil();
  }, []);

  console.log("dataArray", dataArray);
  console.log("dataArrayDetail", dataArrayDetail);

  return (
    <>
      <>
        <div className="my-4 px-3">
          <Steps
            current={1}
            percent={percent}
            items={[
              {
                title: "Mahsulot qismlari",
                subTitle: "birinchi bosqichni tahrirlash",
              },
              {
                title: "Narx qo'shish",
                subTitle: "ikkinchi bosqichni tahrirlash",
              },
              {
                title: "Filial qo'shish",
                subTitle: "uchinchi bosqichni tahrirlash",
              },
            ]}
          />
        </div>
      </>
      {params != "true?id" ? (
        <>
          <div className="bg--color px-2 py-3">
            <h3 className="font-semibold	">Mahsulot narxini qo'shish</h3>
            {data?.colors?.length && data?.feature_items?.length ? (
              <form
                onSubmit={handleSubmit}
                className="mt-3 create-branch-form "
              >
                {dataArray?.map((item, index) => (
                  <div
                    className="row"
                    key={index}
                    style={{ marginBottom: "10px" }}
                  >
                    <div className="col-md-3">
                      <Space
                        style={{
                          width: "100%",
                          textAlign: "left",
                        }}
                        direction="vertical"
                      >
                        <Select
                          disabled={data?.colors?.length ? false : true}
                          size="large"
                          mode="single"
                          allowClear
                          style={{
                            width: "100%",
                          }}
                          placeholder="Ranglar"
                          onChange={(value) => (
                            handleInputChange(index, "color", value),
                            setPercent(40)
                          )}
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
                          disabled={data?.feature_items?.length ? false : true}
                          size="large"
                          mode="single"
                          allowClear
                          style={{
                            width: "100%",
                          }}
                          placeholder="O'lchamlarni kiriting"
                          onChange={(value) => (
                            handleInputChange(index, "feature", value),
                            setPercent(70)
                          )}
                          options={featureList}
                        />
                      </Space>
                    </div>
                    <Input
                      required
                      size="small"
                      className="col-md-3"
                      placeholder="Narxni kiriting"
                      onChange={(e) =>
                        handleInputChange(index, "price", e.target.value)
                      }
                    />{" "}
                    <Button
                      className="col-md-1 ml-2"
                      type="danger"
                      onClick={() => handleRemoveRow(index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                ))}
                <div className="row">
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
                      style={{ width: "100%" }}
                    >
                      {submiting ? "Davom etmoqda" : "Davom etish"}
                    </Button>
                  </div>
                  <div className="col-md-4">
                    <Button
                      variant="contained"
                      sx={{
                        background: "#000",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                      }}
                      style={{ width: "100%" }}
                      startIcon={<AddIcon />}
                      onClick={handleAddRow}
                    >
                      Qo'shish
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
             <div className="row my-3">
              <div className="col-md-3">
              <Input
                required
                size="large"
                placeholder="Narxni kiriting"
                onChange={(e) =>
                  setOnePrice(e.target.value)
                }
              />
              </div>
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
                      onClick={() => handleClickOnePrice()}
                      style={{ width: "100%" }}
                    >
                      {submiting ? "Davom etmoqda" : "Davom etish"}
                    </Button>
                  </div>
             </div>
            )}
            <Toaster />
          </div>
        </>
      ) : (
        <div className="bg--color px-2 py-3">
          <h3 className="font-semibold	">Mahsulot narxini tahrirlash</h3>
          {
            data?.colors?.length && data?.feature_items?.length ?
            <form
            onSubmit={handleSubmitEdit}
            className="mt-3 create-branch-form "
          >
            {dataArrayDetail?.map((item, index) => (
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
                      disabled
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      value={item.color}
                      placeholder="Ranglar"
                      onChange={(value) => (
                        handleInputChangeDetail(index, "color", value),
                        setPercent(40)
                      )}
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
                      disabled
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="O'lchamlarni kiriting"
                      onChange={(value) => (
                        handleInputChangeDetail(index, "feature", value),
                        setPercent(70)
                      )}
                      value={item.feature}
                      options={featureList}
                    />
                  </Space>
                </div>

                <Input
                  type="number"
                  defaultValue={item.price}
                  size="small"
                  className="col-md-3"
                  placeholder="Narxni kiriting"
                  onChange={(e) =>
                    handleInputChangeDetail(index, "price", e.target.value)
                  }
                />

                <Input
                  type="number"
                  className="col-md-2 ml-2"
                  size="small"
                  placeholder="Discountni kiriting"
                  value={item.discount}
                  onChange={(e) =>
                    handleInputChangeDetail(index, "discount", e.target.value)
                  }
                />
              </div>
            ))}
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
                      onChange={(value) => (
                        handleInputChange(index, "color", value), setPercent(40)
                      )}
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
                      onChange={(value) => (
                        handleInputChange(index, "feature", value),
                        setPercent(70)
                      )}
                      options={featureList}
                    />
                  </Space>
                </div>

                <Input
                  type="number"
                  size="small"
                  className="col-md-3"
                  placeholder="Narxni kiriting"
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                />

                <Input
                  type="number"
                  className="col-md-2 ml-2"
                  size="small"
                  placeholder="Discountni kiriting"
                  onChange={(e) =>
                    handleInputChange(index, "discount", e.target.value)
                  }
                />
              </div>
            ))}
            <div className="row">
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
                  style={{ width: "100%" }}
                >
                  {submiting ? "Saqlash davom etmoqda..." : "Saqlash"}
                </Button>
              </div>
              <div className="col-md-4">
                <Button
                  variant="contained"
                  sx={{
                    background: "#000",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                  style={{ width: "100%" }}
                  startIcon={<AddIcon />}
                  onClick={handleAddRow}
                >
                  Qo'shish
                </Button>
              </div>
            </div>
          </form> :
          <div className="row my-3">
          <div className="col-md-3">
          <Input
            required
            size="large"
            placeholder="Narxni kiriting"
            onChange={(e) =>
              setOnePrice(e.target.value)
            }
            // defaultValue={}
          />
          </div>
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
                  onClick={() => handleClickOnePriceEdit()}
                  style={{ width: "100%" }}
                >
                  {submiting ? "Davom etmoqda" : "Davom etish"}
                </Button>
              </div>
         </div>
          }
         
          <Toaster />
        </div>
      )}
    </>
  );
}
