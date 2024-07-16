import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Image, Input, Modal, Select, Space, Tree, Button } from "antd";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import CKeditor from "components/shared/skeditor";
import { Steps } from "antd";
const { TextArea } = Input;

export default function Product() {
  const [submiting, setSubmiting] = useState(false);
  const [percent, setPercent] = useState(10);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [imageURLs, setImageURLs] = useState([]); // asosiy rasm uchun map un
  const [imageFiles, setImageFiles] = useState([]); // asosiy rasm file un
  const [colorListOption, setColorListOption] = useState([]); //rang render un
  const [colorImageList, setColorImageList] = useState([]); // yuborish uchun rang rasmlari
  const [short_desc_uz, setShort_desc_uz] = useState(""); // qisqa tavsif un post
  const [short_desc_ru, setShort_desc_ru] = useState(""); // qisqa tavsif un post
  const [sizetype, setsizeType] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [changeSize, setChangeSize] = useState(true);
  const [checkChaild, setCheckChaild] = useState(true);
  const [sizeInputArray, setSizeInputArray] = useState([{ item: 1 }]);
  const [inputValues, setInputValues] = useState([]);
  const [lastCategory, setLastCategory] = useState("");
  const [form] = Form.useForm();

  const [categoryList, setCategoryList] = useState([]); //kategoriyalar listi uchun
  const [category1, setCategory1] = useState([]); // kategoriyalar ni faqat 4 tagacha ichma ich kira oladi
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);

  const [treeData, setTreeData] = useState([]); // xususiyat nomini tanlagandan so'ng uning chaildlarini chhiqaruvchi state
  const [feature, setFeature] = useState(""); // tanlagan xususiyat nomi , yuborish uchun / modalda yozganda
  const [featureSelectName, setFeatureSelectName] = useState(""); // tanlagan xususiyat nomi , yuborish uchun / selectdan tanlaganda

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSizeParent, setIsModalOpenSizeParent] = useState(false);

  const [selectedColors, setSelectedColors] = useState([]); //rang id lari
  const [colorImages, setColorImages] = useState({}); //rang rasmlari map
  const [allImages, setAllImages] = useState([]);

  const [chekColor, setChekColor] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
          {
            label: "Boshqa o'lcham qo'shish",
            value: 0,
          },
        ]);
      })
      .catch((err) => console.log(err));
  };

  // asosiy rasmlarni yig'ib berish uchun
  const handleImageChangeI = (e) => {
    const files = Array.from(e.target.files);
    const newImageURLs = files.map((file) => URL.createObjectURL(file));
    setImageURLs((prevImageURLs) => [...prevImageURLs, ...newImageURLs]);
    setImageFiles((prevImageFiles) => [...prevImageFiles, ...files]);
  };

  // asosiy rasmlarni o'chirish
  const handleRemoveImage = (index) => {
    setImageURLs((prevImageURLs) =>
      prevImageURLs.filter((_, i) => i !== index)
    );
    setImageFiles((prevImageFiles) =>
      prevImageFiles.filter((_, i) => i !== index)
    );
  };

  // ranglarni id larini yig'ib berish
  const handleChangee = (value) => {
    setSelectedColors(value);
    setPercent(70);
  };

  // ranglar uchun rasm qo'shish
  const handleImageChange = (e, color) => {
    const file = e.target.files[0];
    setChekColor([...chekColor, color]);
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

  const handleChangeSizeType = async (value) => {
    setPercent(70);
    setFeature(value);
    for (let i = 0; i < sizetype.length; i++) {
      if (sizetype[i].value == value) {
        setFeatureSelectName(sizetype[i]?.label);
      }
    }
    if (value === 0) {
      setChangeSize(false);
      setIsModalOpenSizeParent(true);
    } else {
      await Client.get(`${API_ENDPOINTS.SIZE_CHAILD + value}/`)
        .then((resp) => {
          setCheckChaild(false);

          setTreeData(
            resp?.map((el) => ({
              title: el?.value,
              key: el.id,
            }))
          );
        })
        .catch((err) => console.log(err));
    }
  };


  const handleChaildCategory = async (e, index) => {
    setLastCategory(e);
    await Client.get(`${API_ENDPOINTS.PPRODUCT_CATEGORY_CREATE + e}/`)
      .then((resp) => {
        if (resp.length === 0) {
          setLastCategory(e);
        } else if (index === 1) {
          setCategory1(
            resp?.map((el) => ({
              label: el?.name,
              value: el.id,
            }))
          );
        } else if (index === 2) {
          setCategory2(
            resp?.map((el) => ({
              label: el?.name,
              value: el.id,
            }))
          );
        } else if (index === 3) {
          setCategory3(
            resp?.map((el) => ({
              label: el?.name,
              value: el.id,
            }))
          );
        }
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

  // qo'shish
  const handleSubmitAdd = async () => {
    form.resetFields();
    setSubmiting(true);

    const formData1 = new FormData();
    formData1.append("on_sale", true);
    formData1.append("name_uz", name);
    formData1.append("name_ru", nameRu);
    formData1.append("description_uz", description);
    formData1.append("description_ru", descriptionRu);
    formData1.append("short_description_uz", short_desc_uz);
    formData1.append("short_description_ru", short_desc_ru);
    formData1.append("category", lastCategory);
    formData1.append("colors", JSON.stringify([...new Set(chekColor)]));
    if (inputValues) {
      formData1.append("feature", feature);
    }
    formData1.append("feature_items", JSON.stringify(inputValues));
    colorImageList.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        formData1.append(key, value);
      });
    });
    imageFiles.forEach((obj) => {
      formData1.append("images", obj);
    });

    await Client.post(API_ENDPOINTS.CREATE_PRODUCT, formData1)
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products/actions/productPrice?id=${data?.id}`);
        document.querySelector(".create-branch-form").reset();
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
  };

  useEffect(() => {
    getColor();
    getSizeType();
    getCategory();
    imageFiles.forEach((obj) => {
      Object.entries(obj).forEach(([value]) => {
        console.log("images", value);
      });
    });
    // eslint-disable-next-line
  }, []);



  
  return (
    <div className="flex  gap-1 bg--color px-2 py-3">
      <div className="w-full">
        <h1 className="text-[35px] pb-2">Mahsulot qo'shish!</h1>
        <Toaster />

        <Steps
          current={0}
          percent={percent}
          items={[
            {
              title: "Mahsulot qismlari",
              subTitle: "birinchi bosqich",
            },
            {
              title: "Narx qo'shish",
              subTitle: "ikkinchi bosqich",
            },
            {
              title: "Filial biriktirish",
              subTitle: "uchinchi bosqich",
            },
          ]}
        />


        <div className="w-full mt-3">
          <Form
            form={form}
            onFinish={handleSubmitAdd}
            layout='vertical'
            className="w-full flex flex-col gap-3  create-branch-form border-3"
          >
            <div className="colorr p-4">
              <div className="row ">
                <div className="row">

                  <Form.Item

                    label="Mahsulot nomi"
                    className="col-md-6  mb-3"
                    name="name_uz"

                    rules={[
                      {
                        required: true,
                        message:
                          'Mahsulot nomini kirtish majburiy',
                      },
                    ]}>
                    <Input


                      placeholder="Mahsulot nomi"
                      style={{
                        height: "45.4px",
                      }}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Mahsulot nomi (ru)"
                    className="col-md-6  mb-3"
                    name="name_ru"
                    rules={[
                      {
                        required: true,
                        message:
                          'Mahsulot nomini kirtish majburiy',
                      },
                    ]}>
                    <Input
                      placeholder="Mahsulot nomi (ru)"
                      style={{
                        height: "45.4px",
                      }}
                      onChange={(e) => {
                        setNameRu(e.target.value);
                      }}
                    />
                  </Form.Item>

                </div>
                {/* kategoriyalar */}
                <Form.Item
                  label="Kategoriyalar"
                  className=" mb-3 col-md-12"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message:
                        'Kategoriyalarni nomini kirtish majburiy',
                    },
                  ]}>
                  <Select
                    mode="single"
                    allowClear
                    style={{
                      width: "100%",
                      height: "45.4px"
                    }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    placeholder="Kategoriyalar"
                    onChange={(e) => handleChaildCategory(e, 1)}
                    options={categoryList}
                  />


                  {category1?.length > 0 && (
                    <Select
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                        height: "45.4px"
                      }}
                      className="mt-2"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      placeholder="Kategoriyalar"
                      onChange={(e) => (
                        handleChaildCategory(e, 2), setPercent(30)
                      )}
                      options={category1}
                    />
                  )}
                  {category2?.length > 0 && (
                    <Select
                      mode="single"
                      allowClear
                      className="mt-2"
                      style={{
                        width: "100%",
                        height: "45.4px"
                      }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      placeholder="Kategoriyalar"
                      onChange={(e) => handleChaildCategory(e, 3)}
                      options={category2}
                    />
                  )}
                  {category3?.length > 0 && (
                    <Select
                      mode="single"
                      allowClear
                      className="mt-2"
                      style={{
                        width: "100%",
                        height: "45.4px"
                      }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      placeholder="Kategoriyalar"
                      onChange={(e) => setLastCategory(e)}
                      options={category3}
                    />
                  )}
                </Form.Item>



                {/* umumiy rasm */}

                <Form.Item
                  label="Asosiy rasmlarni qo'shish"
                  className=" mb-3 col-md-12"
                  name="images"
                  rules={[
                    {
                      required: true,
                      message:
                        "Asosiy rasmlarni qo'shish nomini kirtish majburiy",
                    },
                  ]}>
                  <div className="d-flex gap-3 flex-wrap">
                    <div
                      style={{
                        maxWidth: "100px",
                        width: "80px",
                        height: "80px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        position: "relative",
                        cursor: "pointer",
                        backgroundColor: "#f8f8f8",
                      }}
                    >
                      <i className="fa-solid fa-file-arrow-down"></i>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        style={{
                          opacity: "0",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          bottom: "0",
                          right: "0",
                          cursor: "pointer",
                        }}
                        onChange={handleImageChangeI}
                      />
                    </div>
                    {imageURLs.map((image, index) => (
                      <div
                        key={index}
                        className="d-flex gap-2  position-relative"
                      >

                        <Image.PreviewGroup >
                          <Image
                            width={80}
                            height={80}
                            style={{ borderRadius: "3px", objectFit: "cover" }}
                            src={image}
                            alt={`Uploaded ${index}`}
                          />

                        </Image.PreviewGroup>

                        <i
                          onClick={() => handleRemoveImage(index)}
                          className="fa-solid fa-trash text-danger shadow"
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            padding: "2px",
                          }}
                        ></i>
                      </div>
                    ))}
                  </div>

                </Form.Item>


                {/* qisqa izoh uchun */}

                <div className="row">

                  <Form.Item
                    label=" Qisqa izoh (uz)"
                    className=" mb-3 col-md-12"
                    name="short_description_uz"
                    rules={[
                      {
                        required: true,
                        message:
                          " Qisqa izoh (uz) kirtish majburiy",
                      },
                    ]}>
                    <TextArea
                      placeholder="Qisqa tavsif "
                      rows={4}
                      height="auto"
                      onChange={(e) => setShort_desc_uz(e.target.value)}
                    />

                  </Form.Item>

                  <Form.Item
                    label=" Qisqa izoh (ru)"
                    className=" mb-3 col-md-12"
                    name="short_description_ru"
                    rules={[
                      {
                        required: true,
                        message:
                          " Qisqa izoh (ru) kirtish majburiy",
                      },
                    ]}>
                    <TextArea
                      placeholder="Qisqa tavsif(ru) "
                      rows={4}
                      height="auto"
                      onChange={(e) => setShort_desc_ru(e.target.value)}
                    />

                  </Form.Item>

                </div>
                {/* skedetor izohlar uchun */}

                <Form.Item
                  label=" Izoh (uz)"
                  className=" mb-3 col-md-12"
                  name="description_uz">
                  <CKeditor
                    onChange={(e) => setDescription(e)}
                    editorLoaded={true}

                  />

                </Form.Item>

                <Form.Item
                  label=" Izoh (ru)"
                  className=" mb-3 col-md-12"
                  name="description_ru">
                  <CKeditor
                    onChange={(e) => setDescriptionRu(e)}
                    editorLoaded={true}
                  />

                </Form.Item>

              </div>
            </div>

            {/* ranglar rasmlar bilan */}
            <Form.Item
              label=" Mahsulot ranglari"
              className=" m-0 col-md-12 colorr p-4"
              name="colors">

              <Space
                style={{ width: "100%" }}
                direction="vertical"
                className="mb-4"
              >
                <Select
                  mode="tags"
                  allowClear
                  style={{ width: "100%", height: "45.4px" }}
                  placeholder="Ranglarni tanlang"
                  onChange={handleChangee}
                  options={colorListOption}
                />
              </Space>

              {selectedColors.map((color) => (
                <div key={color}>
                  <span className="label--name font-bold d-block mb-3">
                    {getColorNameById(color)}
                    {/* {color} */}
                  </span>
                  <div className="d-flex flex-wrap gap-3 my-2">
                    {colorImages[color]?.map((image, index) => (
                      <div key={index} className="d-flex gap-2">
                        <Image.PreviewGroup >
                          <Image
                            width={80}
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
                        height: "80px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        position: "relative",
                      }}
                    >
                      <span style={{ fontSize: '12px' }} > <i className="fa-regular fa-plus"></i> yuklash</span>
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
            </Form.Item>



            {/* xususiyatlar */}
            <Form.Item
              label=" Mahsulot xususiyatlari"
              className="m-0 col-md-12 colorr p-4"
              name="feature">

              {changeSize ? (
                <>
                  {checkChaild ? (
                    <Space
                      style={{
                        width: "100%",
                      }}
                      direction="vertical"
                    >
                      <Select
                        mode={"single"}
                        style={{
                          width: "100%",
                          height: "45.4px"
                        }}
                        placeholder="Ranglarni tanlang"
                        onChange={handleChangeSizeType}
                        options={sizetype}
                      />
                    </Space>
                  ) : (
                    <>
                      <br />
                      <div
                        className="block fw-medium text-bold"
                      >
                        {featureSelectName}
                      </div>

                      <Tree
                        required={true}
                        checkable
                        // defaultExpandedKeys={["0-0-0", "0-0-1"]}
                        // defaultSelectedKeys={["0-0-0", "0-0-1"]}
                        // defaultCheckedKeys={["0-0-0", "0-0-1"]}
                        // onSelect={onSelect}
                        onCheck={onCheck}
                        treeData={treeData}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  {feature !== "" ? (
                    <div className="d-flex flex-column gap-3">
                      {feature}
                      {sizeInputArray?.map((input, index) => (
                        <Input
                          key={input.item}
                          placeholder="O'lcham kiriting"
                          className="col-md-7"
                          value={inputValues[index] || ""}
                          onChange={(e) => addHandleChangeSizeInput(index, e)}
                        />
                      ))}
                    </div>
                  ) : (
                    " "
                  )}
                </>
              )}
            </Form.Item>



            <Form.Item className="w-full my-2">
              <Button
                loading={submiting}
                htmlType="submit"
                style={{
                  width: '100%',
                  height: '45px',
                  padding: "1px 30px"
                }}
                className="bg-black">
                <span
                  style={{
                    color: '#fff',
                    fontSize:
                      '16px',
                  }}>
                  Davom etish
                </span>
              </Button>
            </Form.Item>

          </Form>



          <Modal
            width={250}
            title="Basic Modal"
            open={isModalOpen}
            onCancel={handleCancel}
            okButtonProps={{
              style: {
                display: "none",
              },
            }}
            cancelText="✔️"
          >
            <Tree
              checkable
              // defaultExpandedKeys={["0-0-0", "0-0-1"]}
              // defaultSelectedKeys={["0-0-0", "0-0-1"]}
              // defaultCheckedKeys={["0-0-0", "0-0-1"]}
              // onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeData}
            />
          </Modal>

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
              onChange={(e) => (
                setFeature(e.target.value), setFeatureSelectName(e.target.value)
              )}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}
