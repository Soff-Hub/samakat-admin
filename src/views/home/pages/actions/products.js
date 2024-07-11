import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Modal, Select, Space, Tree } from "antd";
import Switch from "@mui/material/Switch";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import CKeditor from "components/shared/skeditor";
import { Steps } from "antd";
import { useSelector } from "react-redux";
const { TextArea } = Input;
// var parse = require("html-react-parser");

export default function Product() {
  const [submiting, setSubmiting] = useState(false);
  const [percent, setPercent] = useState(10);
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = search.split("?")?.[2];
  const [detailProduct, setDetailProduct] = useState({});

  const [on_sale, setOn_sale] = React.useState(null);
  const [colorListOption, setColorListOption] = useState([]); //rang render un
  const [sizetype, setsizeType] = useState([]);
  const [colorImageList, setColorImageList] = useState([]); // yuborish uchun rang rasmlari
  const [colorData, setColorData] = useState([]);
  const [changeSize, setChangeSize] = useState(true);
  const [sizeInputArray, setSizeInputArray] = useState([{ item: 1 }]);
  const [inputValues, setInputValues] = useState([""]);

  const [categoryList, setCategoryList] = useState([]); //kategoriyalar listi uchun

  const [treeData, setTreeData] = useState([]); // xususiyat nomini tanlagandan so'ng uning chaildlarini chhiqaruvchi state
  const [feature, setFeature] = useState(""); // tanlagan xususiyat nomi , yuborish uchun / modalda yozganda

  const [isModalOpenSizeParent, setIsModalOpenSizeParent] = useState(false);

  const [selectedColors, setSelectedColors] = useState([]); //rang id lari
  const [colorImages, setColorImages] = useState({}); //rang rasmlari map
  const [allImages, setAllImages] = useState([]);

  const { role } = useSelector((state) => state.admin);
  const [dataArrayDetail, setDataArrayDetail] = useState([]); //price uchun
  const [colorList, setColorList] = useState([]); // price va filialni default qiymatlari uchun
  const [featureList, setFeatureList] = useState([]);
  const [status, setStatus] = useState("");

  // qo'shimcha xususiyat kiritayotgandagi modalni yopish => cancel
  const handleCancelSizeParent = () => {
    setIsModalOpenSizeParent(false);
  };
  // // qo'shimcha xususiyat kiritayotgandagi modalni yopish => ok
  const handleOkSizeParent = () => {
    setIsModalOpenSizeParent(false);
  };

  // kategoriyalarni otalari
  const getCategory = async () => {
    await Client.get(`${API_ENDPOINTS.PPRODUCT_CATEGORY_CREATE}`)
      .then((resp) => {
        setCategoryList(
          resp?.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  // ranglar get
  const getColor = async () => {
    await Client.get(`${API_ENDPOINTS.COLOR}`)
      .then((resp) => {
        setColorData(resp);
        setColorListOption(
          resp?.map((el) => ({
            label: (
              <div>
                <i
                  class="fa-solid fa-circle"
                  style={{ color: el?.hex_code }}
                ></i>{" "}
                {el?.name}
              </div>
            ),
            value: el.id,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  // xususiyatlar get
  const getSizeType = async () => {
    await Client.get(`${API_ENDPOINTS.SIZE}`)
      .then((resp) => {
        setsizeType([
          ...resp?.map((el) => ({
            label: el?.name,
            value: el.id,
          })),
        ]);
      })
      .catch((err) => console.log(err));
  };

  // ranglarni id larini yig'ib berish
  const handleChangee = (value) => {
    setSelectedColors(value);
    setPercent(70);
  };

  // ranglar uchun rasm qo'shish
  const handleImageChange = (e, color) => {
    const file = e.target.files[0];
    if (file) {
      colorImageList.push({
        ["images_" + color]: file,
      });
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = reader.result;
        const updatedColorImages = {
          ...colorImages,
          [color]: colorImages[color]
            ? [...colorImages[color], newImage]
            : [newImage],
        };
        setColorImages(updatedColorImages);
        setAllImages([...allImages, { color, image: newImage }]);
      };
      reader.readAsDataURL(file);
    }
  };

  // ranglarni belgilagandan keyin chiqadigan nomi
  const getColorNameById = (id) => {
    const color = colorData.find((color) => color.id === id);
    return color ? color.name : null;
  };

  const SizeType = async (value) => {
    await Client.get(`${API_ENDPOINTS.SIZE_CHAILD + value}/`)
      .then((resp) => {
        setTreeData(resp);
      })
      .catch((err) => console.log(err));
  };

  const addHandleChangeSizeInput = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);

    if (index === sizeInputArray.length - 1) {
      setSizeInputArray([
        ...sizeInputArray,
        { item: sizeInputArray.length + 1 },
      ]);
      setInputValues([...inputValues, ""]);
    }
  };

  // biror razmer turini tanlagandan so'ng modal ichidagi razmerlarni check qilish funksiyasi
  const onCheck = (checkedKeys, info) => {
    setInputValues(checkedKeys);
  };

  // tahrirlash
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const formData1 = new FormData();
    formData1.append("on_sale", on_sale || detailProduct?.on_sale);
    if (selectedColors?.length > 0) {
      formData1.append(
        "colors",
        selectedColors && JSON.stringify(selectedColors)
      );
    }
    // formData1.append("feature",feature || sizetype);
    formData1.append(
      "feature_items",
      inputValues && JSON.stringify(inputValues)
    );
    colorImageList.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        formData1.append(key, value);
      });
    });

    const data = {
      status: status,
    };

    await Client.patch(
      `${API_ENDPOINTS.CREATE_PRODUCT + params}/`,
      role === "seller" ? formData1 : data
    )
      .then((data) => {
        if (role === "seller") {
          toast.success("Mahsulot muvaffaqiyatli qo'shildi");
          navigate(`/products/actions/productPrice?edit=${data?.id}`);
        } else {
          toast.success("Mahsulot statusi muvaffaqiyatli o'zgartirildi");
          navigate(`/products`);
        }
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const getProductDetail = async () => {
    await Client.get(`${API_ENDPOINTS.DETAIL_PRODUCT + params}/`)
      .then((resp) => {
        setDetailProduct(resp);
        SizeType(resp?.feature?.id);
      })
      .catch((err) => console.log(err));
  };

  const getProductPrice = async () => {
    await Client.get(`${API_ENDPOINTS.PRODUCT_LIST_FOR_CREATE}${params}/`)
      .then((resp) => {
        setDataArrayDetail(resp);
      })
      .catch((err) => console.log(err));
  };

  const getProductFeature = async () => {
    await Client.get(`${API_ENDPOINTS.CREATE_PRODUCT_PRICE}${params}/`)
      .then((resp) => {
        // setData(resp);
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

  useEffect(() => {
    getColor();
    getCategory();
    if (params) {
      getProductDetail();
      getProductPrice();
      getProductFeature();
    }
    getSizeType();
    // eslint-disable-next-line
  }, []);

  const result = treeData?.filter(
    (item1) =>
      !detailProduct?.feature_items?.some((item2) => item2.id === item1.id)
  );
  // console.log("result", result);

  return (
    <>
      {detailProduct && (
        <div className="flex  gap-1 bg--color px-2 py-3">
          <div className="w-full">
            <h1 className="text-[35px] pb-2">Mahsulot tahrirlash</h1>
            <Toaster />
            {role === "seller" && (
              <Steps
                current={0}
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

            <div className="w-full mt-3">
              <form
                onSubmit={handleSubmitEdit}
                className="w-full flex flex-col gap-3  create-branch-form border-3"
              >
                <div className="colorr p-4">
                  <div className="row gap-3">
                    <div className="row">
                      <div className="col-6">
                        <span className="label--name font-bold">Nomi(uz)*</span>
                        <Input
                          placeholder="Nomi *"
                          type="text"
                          value={
                            detailProduct?.name_uz && detailProduct?.name_uz
                          }
                          className="py-2"
                          disabled={true}
                          style={{
                            height: "35px",
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <span className="label--name font-bold">
                          Nomi(ru) *
                        </span>
                        <Input
                          placeholder="Название *"
                          type="text"
                          value={
                            detailProduct?.name_uz && detailProduct?.name_uz
                          }
                          disabled={true}
                          className="py-2"
                          style={{
                            height: "35px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <span className="label--name font-bold">
                        Kategoriyalar
                      </span>
                      <div className="d-flex gap-3  align-items-start">
                        <Space
                          style={{
                            width: "100%",
                            textAlign: "left",
                          }}
                          direction="vertical"
                        >
                          <Select
                            disabled={true}
                            style={{
                              width: "100%",
                            }}
                            placeholder="Kategoriyalar"
                            options={categoryList}
                            value={
                              detailProduct?.category_data &&
                              detailProduct?.category_data?.name
                            }
                          />
                        </Space>
                      </div>
                    </div>

                    {/* umumiy rasm */}

                    <div className="col-md-6">
                      <span className="label--name font-bold">
                        Asosiy rasm(lar)
                      </span>
                      <div className="d-flex gap-3 flex-wrap">
                        {detailProduct?.images &&
                          detailProduct?.images.map(
                            (e) =>
                              e.color === null && (
                                <img
                                  width={80}
                                  style={{
                                    borderRadius: "3px",
                                    objectFit: "cover",
                                  }}
                                  src={e.image}
                                  alt="images"
                                />
                              )
                          )}
                      </div>
                    </div>

                    {/* qisqa tavsif */}

                    <div className="row">
                      <div className="col-md-6">
                        <span className="label--name font-bold">
                          Qisqa izoh (uz){" "}
                        </span>
                        <TextArea
                          value={
                            detailProduct?.short_description_uz ?
                            detailProduct?.short_description_uz : ''
                          }
                          placeholder="Qisqa tavsif "
                          rows={4}
                          disabled={true}
                        />
                      </div>
                      <div className="col-md-6">
                        <span className="label--name font-bold">
                          Qisqa izoh (ru){" "}
                        </span>
                        <TextArea
                          value={
                            detailProduct?.short_description_ru ?
                            detailProduct?.short_description_ru : ''
                          }
                          placeholder="Qisqa tavsif "
                          rows={4}
                          disabled={true}
                        />
                      </div>
                    </div>

                    {/* skedetor izohlar uchun */}

                    <div className="col-12">
                      <span className="label--name font-bold">Izoh</span>
                      {/* // eslint-disable-next-line */}
                      <CKeditor
                        value={
                          detailProduct?.description_uz ?
                          detailProduct?.description_uz : ''
                        }
                        disabled={true}
                        editorLoaded={true}
                        onChange={() => setCategoryList}
                      />
                    </div>
                    <div className="col-12">
                      <span className="label--name font-bold">Izoh (ru)</span>
                      <CKeditor
                        value={
                          detailProduct?.description_ru ?
                          detailProduct?.description_ru : ''
                        }
                        disabled={true}
                        editorLoaded={true}
                        onChange={() => setCategoryList}
                      />
                    </div>
                  </div>
                </div>

                {/* ranglar rasmlar bilan */}
                {detailProduct?.colors?.length > 0 && (
                  <div className="p-4 colorr">
                    <span className="label--name font-bold">
                      Mahsulot ranglari
                    </span>

                    <div className="label--name font-bold mb-3">
                      {detailProduct?.colors &&
                        detailProduct?.colors.map((e) => (
                          <div>
                            <p className="py-1">{e.name}</p>
                            <div className="d-flex gap-2">
                              {detailProduct?.images.map(
                                (el) =>
                                  el.color === e.id && (
                                    <img
                                      width={80}
                                      src={el?.image}
                                      alt="photo"
                                    />
                                  )
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    {role === "seller" && (
                      <Space
                        style={{ width: "100%" }}
                        direction="vertical"
                        className="mb-4"
                      >
                        <Select
                          mode="tags"
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Ranglarni tanlang"
                          onChange={handleChangee}
                          options={colorListOption}
                        />
                      </Space>
                    )}

                    {selectedColors.map((color) => (
                      <div key={color}>
                        <span className="label--name font-bold d-block mb-3">
                          {getColorNameById(color)}
                          {color}
                        </span>
                        <div className="d-flex flex-wrap gap-3 my-2">
                          {colorImages[color]?.map((image, index) => (
                            <div key={index} className="d-flex gap-2">
                              <img width={80} src={image} alt="photo" />
                            </div>
                          ))}

                          <div
                            style={{
                              maxWidth: "100px",
                              width: "80px",
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
                            <i className="fa-regular fa-plus"></i> yuklash
                            <input
                              type="file"
                              accept="image/*"
                              style={{
                                opacity: "0",
                                position: "absolute",
                                top: "0",
                                left: "0",
                                bottom: "0",
                                right: "0",
                              }}
                              onChange={(e) => handleImageChange(e, color)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* xususiyatlar */}

                <div className="p-4 colorr">
                  {detailProduct?.feature_items?.length > 0 && (
                    <>
                      <span className="label--name font-bold">
                        Mahsulot xususiyatlari
                      </span>

                      <div className="label--name font-bold my-2">
                        <p>{detailProduct?.feature?.name}</p>
                        <div>
                          {detailProduct?.feature_items &&
                            detailProduct?.feature_items?.map((el) => (
                              <p>{el?.value}</p>
                            ))}
                        </div>
                      </div>

                      {role === "seller" && (
                        <>
                          {detailProduct?.is_owner_future ? (
                            <div className="d-flex flex-column gap-3">
                              {feature}
                              {sizeInputArray?.map((input, index) => (
                                <Input
                                  key={input.item}
                                  placeholder="O'lcham kiriting"
                                  className="col-md-7"
                                  value={inputValues[index] || ""}
                                  onChange={(e) =>
                                    addHandleChangeSizeInput(index, e)
                                  }
                                />
                              ))}
                            </div>
                          ) : (
                            <Tree
                              checkable
                              onCheck={onCheck}
                              treeData={result?.map((el) => ({
                                title: el?.value,
                                key: el.id,
                              }))}
                            />
                          )}
                        </>
                      )}

                      {role != "seller" && (
                        <div>
                          <div className="label--name font-bold my-3">
                            Mahsulot narxlari
                          </div>

                          {dataArrayDetail &&
                            dataArrayDetail?.map((item, index) => (
                              <div
                                className="row mt-2"
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
                                      disabled={true}
                                      size="large"
                                      mode="single"
                                      allowClear
                                      style={{
                                        width: "100%",
                                      }}
                                      value={item?.color}
                                      placeholder="Ranglar"
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
                                      value={item?.feature}
                                      options={featureList}
                                    />
                                  </Space>
                                </div>

                                <Input
                                  disabled
                                  type="number"
                                  defaultValue={item?.price}
                                  size="small"
                                  className="col-md-3"
                                  placeholder="Narxni kiriting"
                                />

                                <Input
                                  disabled
                                  type="number"
                                  className="col-md-2 ml-2"
                                  size="small"
                                  placeholder="Discountni kiriting"
                                  value={item?.discount}
                                />
                              </div>
                            ))}
                        </div>
                      )}
                    </>
                  )}
                  <div className="mt-4">
                    <label className="font-bold font-sans text-lg pl-1.5">
                      Sotuvda
                    </label>
                    <Switch
                      disabled={role === "seller" ? false : true}
                      checked={on_sale || detailProduct?.on_sale}
                      inputProps={{ "aria-label": "controlled" }}
                      onChange={(e) => setOn_sale(e.target.checked)}
                    />
                  </div>
                </div>

                {/* admin va employee uchun status o'zgartirish */}
                {role != "seller" && detailProduct?.status && (
                  <div className="p-4 colorr">
                    <div className="font-sans text-md font-bold my-3">
                      Mahsulot statusini o'zgartirish
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
                          style={{
                            width: "100%",
                          }}
                          defaultValue={detailProduct?.status}
                          onChange={(e) => setStatus(e)}
                          placeholder="status"
                          options={[
                            {
                              label: (
                                <div className="text-[#50C878]">
                                  Tasdiqlangan
                                </div>
                              ),
                              value: "approved",
                            },
                            {
                              label: (
                                <div className="text-[#F4CA16]">Kutilmoqda</div>
                              ),
                              value: "pending",
                            },
                            {
                              label: (
                                <div className="text-[red]">Bekor qilingan</div>
                              ),
                              value: "cancelled",
                            },
                          ]}
                        />
                      </Space>
                    </div>
                  </div>
                )}

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
                  {submiting ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
              </form>

              <Modal
                width={300}
                title="Xususiyat nomini qo'shing"
                open={isModalOpenSizeParent}
                onCancel={handleCancelSizeParent}
                onOk={handleOkSizeParent}
                cancelButtonProps={{
                  style: {
                    display: "none",
                  },
                }}
                okButtonProps={{
                  style: {
                    backgroundColor: "green",
                  },
                }}
                okText="Qo'shish"
              >
                <Input
                  placeholder="Nomini kiriting"
                  onChange={(e) => setFeature(e.target.value)}
                />
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
