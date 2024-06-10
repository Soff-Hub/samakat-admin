import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Modal, Select, Space, Tree } from "antd";
import Switch from "@mui/material/Switch";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import AddInputThree from "components/shared/addInputThree";
import CKeditor from "components/shared/skeditor";

export default function Product() {
  const [submiting, setSubmiting] = useState(false);
  const location = useLocation();
  const [name, setName] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [on_sale, setOn_sale] = React.useState(false);
  const [image, setImage] = useState("");
  const [colorListOption, setColorListOption] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [imageColor, setImageColor] = useState([]);
  const [imageColorReal, setImageColorReal] = useState([]);
  const [addHandleImageData, setAddHandleImageData] = useState([
    {
      id: 0,
    },
  ]);
  const [atributInput, setAtributInput] = useState([
    {
      id: 1,
      content_uz: "",
      content_ru: "",
      order: "",
    },
  ]);
  const navigate = useNavigate();
  const [colorImageList, setColorImageList] = useState([]);
  const [colorImageListReal, setColorImageListReal] = useState([]);
  const [sizetype, setsizeType] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [sizechaild, setsizeChaild] = useState([]);
  const [changeSize, setChangeSize] = useState(true);
  const [checkChaild, setCheckChaild] = useState(true);
  const [sizeInputArray, setSizeInputArray] = useState([{ item: 1 }]);
  const [categoryInputArray, setCategoryInputArray] = useState([{ item: 1 }]);
  const [inputValues, setInputValues] = useState([""]);
  const [lastCategory, setLastCategory] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [category4, setCategory4] = useState([]);

  const [checkCategory, setCheckCategory] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [feature, setFeature] = useState("");
  const [featureSelectName, setFeatureSelectName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSizeParent, setIsModalOpenSizeParent] = useState(false);

  const [mainImage, setMainImage] = useState("");
  const [mainImageReal, setMainImageReal] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelSizeParent = () => {
    setIsModalOpenSizeParent(false);
  };

  const handleOkSizeParent = () => {
    setIsModalOpenSizeParent(false);
  };

  const handleChange = async (value) => {
    setColorList(value);
  };

  const handleChangeSizeType = async (value) => {
    console.log("value", value);

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
    console.log("e", e);
    setLastCategory(e);
    await Client.get(`${API_ENDPOINTS.PPRODUCT_CATEGORY_CREATE + e}/`)
      .then((resp) => {
        if (resp === []) {
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

  const addProductHighlightInput = (value, id) => {
    let findItem = atributInput.find((elem) => elem.id === id);
    findItem.content_uz = value?.content_uz;
    findItem.content_ru = value?.content_ru;
    findItem.order = value?.order;
    setAtributInput([...atributInput]);
  };

  const deleteIDHighlight = (i) => {
    setAtributInput(atributInput.filter((item) => item?.id !== i));
  };

  const addAtributInput = async (value, id) => {
    setAtributInput([...atributInput, { id, ...value }]);
  };

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

  const change = () => {
    const product_highlight = atributInput?.map((item) => {
      const { content, order } = item;
      return { content, order };
    });
  };

  const ImageChange = (e, id) => {
    colorImageList.push({
      ["images_" + id]: e.target.files[0],
    });
    colorImageListReal.push({
      ["images_" + id]: window.URL.createObjectURL(e.target.files[0]),
    });
    setImageColor(e.target.files[0]),
      setImageColorReal(window.URL.createObjectURL(e.target.files[0]));
  };
  const ImageChangeAll = (e) => {
    setMainImage(e.target.files[0]);
    setMainImageReal(window.URL.createObjectURL(e.target.files[0]));
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

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const product_highlight = atributInput?.map((item) => {
      const { content_uz, content_ru, order } = item;
      return { content_uz, content_ru, order };
    });

    const formData1 = new FormData();
    formData1.append("name_uz", name);
    formData1.append("name_ru", nameRu);
    formData1.append("description_uz", description);
    formData1.append("description_ru", descriptionRu);
    formData1.append("on_sale", on_sale);
    formData1.append("category", lastCategory);
    formData1.append("colors", JSON.stringify(selectedColors));
    formData1.append("feature", feature);
    formData1.append("feature_items", JSON.stringify(inputValues));
    formData1.append("images", mainImage);
    colorImageList.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        formData1.append(key, value);
      });
    });
    // imageList.forEach((obj) => {
    //   Object.entries(obj).forEach(([key, value]) => {
    //     formData1.append(key, value);
    //   });
    // });

    if (
      product_highlight?.every(
        (el) => el.content_uz !== "" && el.content_uz && el.order
      ) &&
      product_highlight?.every(
        (el) => el.order !== "" && el.content_uz && el.order
      )
    ) {
      formData1.append("product_highlight", JSON.stringify(product_highlight));
    }

    await Client.post(API_ENDPOINTS.CREATE_PRODUCT, formData1)
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products/actions/productPrice?id=${data?.id}`);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  useEffect(() => {
    getColor();
    getSizeType();
    getCategory();
    // eslint-disable-next-line
  }, []);

  const [selectedColors, setSelectedColors] = useState([]);
  const [colorImages, setColorImages] = useState({});
  const [allImages, setAllImages] = useState([]);

  const handleChangee = (value) => {
    setSelectedColors(value);
  };

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

  const getColorNameById = (id) => {
    const color = colorData.find((color) => color.id === id);
    return color ? color.name : null;
  };

  return (
    <div className="flex  gap-1 bg--color px-2 py-3">
      <div className="w-full">
        <h1 className="text-[35px] pb-2">Mahsulot qo'shish!</h1>
        <Toaster />
        {/* <Test/> */}
        <div className="w-full">
          <form
            onSubmit={handleSubmitAdd}
            className="w-full flex flex-col gap-3  create-branch-form border-3"
          >
            <div className="colorr p-4">
              <div className="row gap-3">
                <div className="row">
                  <div className="col-6">
                    <span className="label--name font-bold">Nomi *</span>
                    <Input
                      placeholder="Nomi *"
                      type="text"
                      value={name}
                      required
                      className="py-2"
                      style={{
                        height: "35px",
                      }}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <span className="label--name font-bold">Nomi(ru) *</span>
                    <Input
                      placeholder="Название *"
                      type="text"
                      value={nameRu}
                      required
                      className="py-2"
                      style={{
                        height: "35px",
                      }}
                      onChange={(e) => {
                        setNameRu(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <span className="label--name font-bold">Kategoriyalar</span>
                  <div className="d-flex gap-3  align-items-start">
                    <Space
                      style={{
                        width: "100%",
                        textAlign: "left",
                      }}
                      direction="vertical"
                    >
                      <Select
                        disabled={checkCategory}
                        mode="single"
                        allowClear
                        style={{
                          width: "100%",
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
                          disabled={checkCategory}
                          mode="single"
                          allowClear
                          style={{
                            width: "100%",
                          }}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          placeholder="Kategoriyalar"
                          onChange={(e) => handleChaildCategory(e, 2)}
                          options={category1}
                        />
                      )}
                      {category2?.length > 0 && (
                        <Select
                          disabled={checkCategory}
                          mode="single"
                          allowClear
                          style={{
                            width: "100%",
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
                          disabled={checkCategory}
                          mode="single"
                          allowClear
                          style={{
                            width: "100%",
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
                    </Space>
                    <div
                      size="small"
                      className="btn btn-success"
                      onClick={() => setCheckCategory(!checkCategory)}
                    >
                      Qo'shish
                    </div>
                  </div>
                </div>

                {/* umumiy rasm */}

                <div className="col-md-6">
                  <span className="label--name font-bold">
                    Asosiy rasm qo'shish
                  </span>
                  <div className="d-flex gap-3">
                    <div
                      style={{
                        maxWidth: "100px",
                        width: "80px",
                        backgroundImage: `url(${""})`,
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
                      <i class="fa-solid fa-file-arrow-down"></i>
                      <input
                        type="file"
                        style={{
                          opacity: "0",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          bottom: "0",
                          right: "0",
                        }}
                        onChange={(e) => ImageChangeAll(e)}
                      />
                    </div>
                    {mainImageReal && (
                      <div className="d-flex gap-2 align-items-en">
                        <img width={80} src={mainImageReal} alt="photo" />
                        <i
                          onClick={() => (
                            setMainImage(""), setMainImageReal("")
                          )}
                          class="fa-solid fa-trash"
                        ></i>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <span className="label--name font-bold">Izoh</span>
                  {/* // eslint-disable-next-line */}
                  <CKeditor
                    //  value={description}
                    onChange={(e) => setDescription(e)}
                    editorLoaded={true}
                  />
                </div>
                <div className="col-12">
                  <span className="label--name font-bold">Izoh (ru)</span>
                  <CKeditor
                    //  value={descriptionRu}
                    onChange={(e) => setDescriptionRu(e)}
                    editorLoaded={true}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 colorr">
              <span className="label--name font-bold">Mahsulot ranglari</span>
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

            <div className="p-4 colorr">
              <span className="label--name font-bold">
                Mahsulot xususiyatlari
              </span>
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
                        className="block fw-medium"
                        type="primary"
                        onClick={showModal}
                      >
                        {featureSelectName}
                      </div>
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
            </div>

            <div>
              <div className="px-2 my-4 colorr">
                <h2 className="text-[18px] pl-3.5 pt-3 font-bold">
                  Mahsulot asosiy elementlari
                </h2>
                {/* qoshish */}
                <div className="flex justify-content-between">
                  <div className="flex flex-col">
                    {atributInput?.map((item, i) => (
                      <AddInputThree
                        dataH={item}
                        key={i}
                        addFilialInput={addProductHighlightInput}
                        id={item.id ? item.id : atributInput[i - 1]?.id + 1}
                        deleteIDHighlight={deleteIDHighlight}
                        change={change}
                      />
                    ))}
                  </div>

                  <div
                    onClick={() =>
                      addAtributInput(
                        { content: "", order: "" },
                        atributInput.length + 1
                      )
                    }
                    className="p-2"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      cursor: "pointer",
                    }}
                  >
                    <p>
                      <i className="fa-solid fa-circle-plus"></i> qo'shish
                    </p>{" "}
                  </div>
                </div>
              </div>
              <div>
                <label className="font-bold font-sans text-lg pl-1.5">
                  Sotuvda
                </label>
                <Switch
                  checked={on_sale}
                  onChange={(e) => setOn_sale(event.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>

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
              {submiting ? "Qo'shilmoqda" : "Qo'shish"}
            </Button>
          </form>

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
