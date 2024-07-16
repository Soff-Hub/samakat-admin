import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Image, Input, Modal, Select, Space, Tree, Button } from "antd";
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
  const [form] = Form.useForm();

  const [colorListOption, setColorListOption] = useState([]); //rang render un
  const [sizetype, setsizeType] = useState([]);
  const [colorImageList, setColorImageList] = useState([]); // yuborish uchun rang rasmlari
  const [colorData, setColorData] = useState([]);
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
  const [desReason, setDesReason] = useState(null);

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
  const handleSubmitEdit = async (values) => {

    setSubmiting(true);
    form.resetFields();
    const formData1 = new FormData();
    formData1.append("on_sale", true);
    if (selectedColors?.length > 0) {
      formData1.append(
        "colors",
        selectedColors && JSON.stringify(selectedColors)
      );
    }
    if (desReason) {
      formData1.append("rejected_reason", desReason);

    }

    formData1.append(
      "feature_items",
      inputValues && JSON.stringify(inputValues)
    );
    formData1.append('name_uz', values?.name_uz);
    formData1.append('name_ru', values?.name_ru);
    formData1.append('short_description_uz', values?.short_description_uz);
    formData1.append('short_description_ru', values?.short_description_ru);
    formData1.append('description_ru', values?.description_ru);
    formData1.append('description_uz', values?.description_uz);

    colorImageList.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        formData1.append(key, value);
      });
    });

    const data = {
      status: status ? status : detailProduct?.status,
      rejected_reason: desReason ? desReason : detailProduct?.rejected_reason
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


  const lastCategory = detailProduct?.category_data?.length > 0
    ? detailProduct.category_data[detailProduct.category_data.length - 1].name
    : '';

  useEffect(() => {

    if (detailProduct?.id) {
      form.setFieldsValue({
        name_uz: detailProduct?.name_uz,
        name_ru: detailProduct?.name_ru,
        short_description_uz: detailProduct?.short_description_uz,
        short_description_ru: detailProduct?.short_description_ru,
        description_uz: detailProduct?.description_uz || '',
        description_ru: detailProduct?.description_ru || '',
      })
    }
  }, [detailProduct, form]);



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
              <Form
                form={form}
                layout='vertical'
                onFinish={handleSubmitEdit}
                className="w-full flex flex-col gap-3  create-branch-form border-3"
              >
                <div className="colorr p-4">
                  <div className="row ">

                    <div className="row">

                      <Form.Item

                        label="Mahsulot nomi (uz)"
                        className="col-md-6  mb-3"
                        name="name_uz"
                      >
                        <Input
                          type="text"
                          className="py-2"
                          style={{
                            height: "45.4px",
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="Mahsulot nomi (ru)"
                        className="col-md-6  mb-3"
                        name="name_ru"
                      >
                        <Input
                          type="text"
                          className="py-2"
                          style={{
                            height: "45.4px",
                          }}
                        />
                      </Form.Item>

                    </div>

                    <Form.Item
                      label={detailProduct?.category_data?.length > 0 &&
                        detailProduct.category_data?.map((item, index) => (
                          <span key={index}>
                            {item.name}
                            {index < detailProduct.category_data.length - 1 ? '  > ' : ''}
                          </span>
                        ))
                      }
                      className="col-md-12"
                    >
                      <Select
                        disabled={true}
                        style={{
                          width: "100%",
                          height: "45.5px"
                        }}

                        options={categoryList}
                        value={lastCategory}
                      />

                    </Form.Item>

                    {/* umumiy rasm */}
                    <Form.Item
                      label=" Asosiy rasmlar"
                      className="col-md-12  mb-2"
                      name="images"
                    >
                      <div className="d-flex gap-3 flex-wrap">
                        {detailProduct?.images &&
                          detailProduct?.images.map(
                            (e) =>
                              e.color === null && (
                                <Image.PreviewGroup >
                                  <Image
                                    width={80}
                                    style={{
                                      borderRadius: "3px",
                                      objectFit: "cover",
                                    }}
                                    src={e.image}
                                    alt="images"
                                  />

                                </Image.PreviewGroup>
                              )
                          )}
                      </div>
                    </Form.Item>



                    {/* qisqa tavsif */}

                    <div className="row">
                      <Form.Item
                        label="Qisqa tavsif (uz)"
                        className="col-md-6  mb-2"
                        name="short_description_uz"
                      >
                        <TextArea
                          rows={4}

                        />
                      </Form.Item>

                      <Form.Item
                        label="Qisqa tavsif (ru)"
                        className="col-md-6  mb-2"
                        name="short_description_ru"
                      >
                        <TextArea
                          rows={4}

                        />
                      </Form.Item>


                    </div>


                    {/* skedetor izohlar uchun */}

                    <Form.Item
                      label="Izoh (uz)"
                      className="col-md-12  mb-2"
                      name="description_uz"
                    >

                      <CKeditor

                        editorLoaded={true}
                        onChange={() => setCategoryList}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Izoh (ru)"
                      className="col-md-12  mb-2"
                      name="description_ru"
                    >

                      <CKeditor


                        editorLoaded={true}
                        onChange={() => setCategoryList}
                      />
                    </Form.Item>


                  </div>
                </div>

                {/* ranglar rasmlar bilan */}
                {detailProduct?.colors?.length > 0 && (
                  <div className="p-4 colorr">

                    {role === "seller" && (
                      <Form.Item
                        label="Mahsulot ranglari"
                        className="col-md-12  mb-2"
                        name="colors"
                      >
                        <Select
                          mode="tags"
                          allowClear
                          style={{ width: "100%", height: "45.4px" }}
                          placeholder="Ranglarni tanlang"
                          onChange={handleChangee}
                          options={colorListOption}
                        />
                      </Form.Item>
                    )}



                    <div className="label--name font-medium mb-3 flex gap-4 items-end">
                      {detailProduct?.colors &&
                        detailProduct?.colors.map((e) => (
                          detailProduct?.images.map(
                            (el) =>
                              el.color === e.id && (
                                <div className="flex flex-col">
                                  <p className="py-1">{e.name}</p>
                                  <Image.PreviewGroup >
                                    <Image
                                      style={{
                                        borderRadius: "3px",
                                        objectFit: "cover",
                                      }}
                                      width={80}
                                      height={80}
                                      src={el?.image}
                                      alt="photo"
                                    />

                                  </Image.PreviewGroup>
                                </div>

                              )
                          )
                        ))}

                      {selectedColors.map((color) => (
                        <div key={color}>
                          <div className="d-flex  gap-3 my-2">
                            {colorImages[color]?.map((image, index) => (
                              <div key={index} className="d-flex gap-2">
                                <span className="label--name font-bold d-block mb-3">
                                  {getColorNameById(color)}
                                  {color}
                                </span>
                                <Image.PreviewGroup >
                                  <Image
                                    width={80}
                                    height={80}
                                    src={image}
                                    alt={`Uploaded ${index}`}
                                  />

                                </Image.PreviewGroup>
                              </div>
                            ))}

                            <div
                              style={{
                                maxWidth: "100px",
                                width: "80px",
                                backgroundSize: "cover",
                                height: "100px",
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


                  </div>
                )}

                {/* xususiyatlar */}

                <div className={detailProduct?.feature_items?.length > 0 && "p-4 colorr"}>
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
                </div>

                {/* admin va employee uchun status o'zgartirish */}
                {role !== "seller" && detailProduct?.status && (
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
                    {
                      (status === "cancelled" || detailProduct?.status) &&
                      <div className="col-md-12">
                        <span className="label--name font-bold">
                          Sabab *
                        </span>
                        <TextArea
                          onChange={(e) => setDesReason(e.target.value)}
                          defaultValue={
                            detailProduct?.rejected_reason ?
                              detailProduct?.rejected_reason : ''
                          }
                          placeholder="Sabab *"
                          rows={4}
                        />
                      </div>

                    }
                  </div>
                )}


                <Button
                  htmlType="submit"
                  type="primary"
                  className="bg-blue-500 h-[45.5px] mb-4"
                  disabled={submiting}
                >
                  {submiting ? "Saqlanmoqda..." : "Davom etish"}
                </Button>
              </Form>

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
