import { Input, InputNumber, Select, Space, Steps } from "antd";
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
  const chekParam = search.split("=")?.[0];
  const [onePrice, setOnePrice] = useState(null);
  const [onePrice1, setOnePrice1] = useState(null);
  const [onePrice2, setOnePrice2] = useState(null);
  const [onePrice3, setOnePrice3] = useState(null);
  const [delayedPriceMessage, setDelayedPriceMessage] = useState('');
  const [delayedPriceMessage1, setDelayedPriceMessage1] = useState('');
  const [delayedPriceMessage2, setDelayedPriceMessage2] = useState('');
  const [delayedPriceMessage3, setDelayedPriceMessage3] = useState('');
  const [dataArray, setDataArray] = useState([
    {
      color: null,
      feature: null,
      price: 0,
      discount: 0,
    },
  ]);

  const [dataArrayDetail, setDataArrayDetail] = useState([]);
  const getProductFeatureDeatil = async () => {
    if (chekParam === "?edit") {
      await Client.get(`${API_ENDPOINTS.PRODUCT_LIST_FOR_CREATE}${params}/`)
        .then((resp) => {
          setDataArrayDetail(resp);
        })
        .catch((err) => console.log(err));
    }
  };
  const getProductFeature = async () => {
    await Client.get(`${API_ENDPOINTS.CREATE_PRODUCT_PRICE}${params}/`)
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
        discount: 0,
      }
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
        toast.error(err?.message || "Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const handleClickOnePrice = async () => {
    setSubmiting(true);

    const data = {
      product_variants: [
        {
          color: null,
          feature: null,
          price: Math.round(Number(onePrice) / 1000) * 1000,
        },
      ],
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
        toast.error(err?.message || "Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
  };


  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const data = {
      new_variants: dataArray,
      // ?.map((e) => (e.color != null ? e : "")),
      old_variants: dataArrayDetail?.map((e) => (e.color != null ? e : {})),
    };

    await Client.post(
      `${API_ENDPOINTS.UPDATE_PRODUCT_PRICE}${params == "true?id" ? search.split("=")?.[2] : params
      }/`,
      data
    )
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products`);
        setPercent(100);
      })
      .catch((err) => {
        toast.error(err?.message || "Xatolik! Qayta urinib ko'ring");

        toast.error(
          `${err.response?.data?.new_variants[0]?.price[0] ||
          err.response?.data?.new_variants[0]?.discount[0] ||
          err.response?.data?.old_variants[0]?.price[0] ||
          err.response?.data?.old_variants[0]?.discount[0]
          || "Xatolik! Qayta urinib ko'ring"
          } `
        );
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const handleClickOnePriceEdit = async () => {
    setSubmiting(true);

    const data = {
      old_variants: [
        {
          id: dataArrayDetail?.[0]?.id,
          color: null,
          feature: null,
          price: onePrice ? +onePrice : dataArrayDetail?.[0]?.price,
        },
      ],
    };

    await Client.post(
      `${API_ENDPOINTS.UPDATE_PRODUCT_PRICE}${params == "true?id" ? search.split("=")?.[2] : params
      }/`,
      data
    )
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products`);
        setPercent(100);
      })
      .catch((err) => {
        toast.error(err.response?.data?.new_variants[0]?.price[0] ||
          err.response?.data?.new_variants[0]?.discount[0] ||
          err.response?.data?.old_variants[0]?.price[0] ||
          err.response?.data?.old_variants[0]?.discount[0] || "Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
        toast.error(err?.message || "Xatolik! Qayta urinib ko'ring");

      });

    setSubmiting(false);
  };

  useEffect(() => {
    getProductFeature();
    getProductFeatureDeatil();
  }, []);

  useEffect(() => {
    if (onePrice !== null) {
      const timer = setTimeout(() => {
        if (onePrice % 1000 !== 0) {
          setDelayedPriceMessage(`Qabul qilinadigan summa ${Math.round(Number(onePrice) / 1000) * 1000} so'm`);
        } else {
          setDelayedPriceMessage('');
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setDelayedPriceMessage('');
    }
  }, [onePrice]);

  useEffect(() => {
    if (onePrice1 !== null) {
      const timer = setTimeout(() => {
        if (onePrice1 % 1000 !== 0) {
          setDelayedPriceMessage1(`Qabul qilinadigan summa ${Math.round(Number(onePrice1) / 1000) * 1000} so'm`);
        } else {
          setDelayedPriceMessage1('');
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setDelayedPriceMessage1('');
    }
  }, [onePrice1]);

  useEffect(() => {
    if (onePrice2 !== null) {
      const timer = setTimeout(() => {
        if (onePrice2 % 1000 !== 0) {
          setDelayedPriceMessage2(`Qabul qilinadigan summa ${Math.round(Number(onePrice2) / 1000) * 1000} so'm`);
        } else {
          setDelayedPriceMessage2('');
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
    else {
      setDelayedPriceMessage2('');
    }
  }, [onePrice2]);

  useEffect(() => {
    if (onePrice3 !== null) {
      const timer = setTimeout(() => {
        if (onePrice3 % 1000 !== 0) {
          setDelayedPriceMessage3(`Qabul qilinadigan summa ${Math.round(Number(onePrice3) / 1000) * 1000} so'm`);
        } else {
          setDelayedPriceMessage3('');
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setDelayedPriceMessage3('');
    }
  }, [onePrice3]);


  return (
    <>
      <>
        <div className="my-4 px-3">
          {chekParam != "?edit" ? (
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
          ) : (
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
              ]}
            />
          )}
        </div>
      </>
      {chekParam != "?edit" ? (
        <>
          <div className="bg--color px-2 py-3">
            <h3 className="font-semibold	">Mahsulot narxini qo'shish</h3>
            {data?.colors?.length > 0 || data?.feature_items?.length > 0 ? (
              <form
                onSubmit={handleSubmit}
                className="mt-3 create-branch-form "
              >
                {dataArray?.map((item, index) => (
                  <div
                    className="row items-start"
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

                    <div className="col-md-3">
                      <InputNumber
                        required
                        placeholder="Narxni kiriting"
                        className='w-100 py-1'
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => (
                          handleInputChange(index, "price", Math.round(Number(e) / 1000) * 1000),
                          setOnePrice1(e)
                        )
                        }
                      />
                      <span className="text-danger text-[14px]">{delayedPriceMessage1}</span>
                    </div>

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
                  <InputNumber
                    required
                    placeholder="Narxni kiriting"
                    className='w-100 py-2'
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) =>
                      setOnePrice(e)
                    }
                  />
                  <span className="text-danger text-[14px]">{delayedPriceMessage}</span>

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
                    style={{ width: "100%", height: "46px" }}
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
          <h3 className="font-semibold	px-[10px]">Mahsulot narxini tahrirlash</h3>
          {data?.colors?.length > 0 || data?.feature_items?.length > 0 ? (
            <form
              onSubmit={handleSubmitEdit}
              className=" mt-3 create-branch-form  "
            >
              {dataArrayDetail?.map((item, index) => (
                <div
                  className="row m-0 p-0 mb-3"
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
                      <p>Mahsulot rangi</p>
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
                      <p>Mahsulot o'lchamlar</p>
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
                  <div className="col-md-3">
                    <p className="mb-2">Mahsulot narxi</p>

                    <InputNumber
                      defaultValue={item.price}

                      placeholder="Narxni kiriting"
                      className='py-1 col-md-12'
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                      (
                        handleInputChangeDetail(index, "price", Math.round(Number(e) / 1000) * 1000),
                        setOnePrice2(e)

                      )
                      }


                    />
                    <span className="text-danger text-[14px]">{delayedPriceMessage2}</span>
                  </div>
                  <div className="col-md-2">
                    <p className="mb-2">Mahsulot chegirmasi(%)</p>

                    <Input
                      type="number"
                      className="col-md-12  h-[38px]"
                      size="small"
                      placeholder="Discountni kiriting"
                      value={item.discount}
                      onChange={(e) =>
                        handleInputChangeDetail(index, "discount", e.target.value)
                      }
                      maxLength={3}
                    />
                  </div>


                </div>
              ))}
              {dataArray?.map((item, index) => (
                <div
                  className="row p-0 m-0 mb-3 items-start"
                  key={index}
                  style={{ marginBottom: "10px" }}
                >
                  <div className="col-md-2">
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

                  <div className="col-md-3">
                    <InputNumber
                      defaultValue={item.price}
                      placeholder="Narxni kiriting"
                      className='py-1 w-100'
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                      (
                        handleInputChange(index, "price", Math.round(Number(e) / 1000) * 1000),
                        setOnePrice3(e)
                      )
                      }
                    />
                    <span className="text-danger text-[14px]">{delayedPriceMessage3}</span>

                  </div>


                  <Input
                    type="number"
                    className="col-md-2 ml-2 h-[40px]"
                    size="small"
                    placeholder="Discountni kiriting"
                    onChange={(e) =>
                      handleInputChange(index, "discount", e.target.value)
                    }
                  />

                  <Button
                    className="col-md-1 ml-2"
                    type="danger"
                    onClick={() => handleRemoveRow(index)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              ))}

              <div className="row p-0 m-0">
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
                    {submiting ? "Saqlash davom etmoqda..." : "Davom etish"}
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
            <div className="row my-3 ">
              <div className="col-md-3">
                {dataArrayDetail?.[0] && (

                  <InputNumber
                    required
                    defaultValue={
                      dataArrayDetail?.[0]?.price && dataArrayDetail?.[0]?.price
                    }
                    placeholder="Narxni kiriting"
                    className='py-2 col-md-3'
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) =>
                      setOnePrice(e)
                    }
                  />
                )}
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
          )}

          <Toaster />
        </div>
      )}
    </>
  );
}
