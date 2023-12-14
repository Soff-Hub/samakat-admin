import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Select, Space } from "antd";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddInput from "components/shared/addInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [imageLink, setImageLink] = useState({ image: "", id: "" });
  const [addImageLink, setAddImageLink] = useState({ image: "", id: "" });
  const [delID, setDelId] = useState([]);
  const [imageData, setImageData] = useState([]);

  const [submiting, setSubmiting] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const [editData, setEditData] = useState(null);
  const location = useLocation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [on_sale, setOn_sale] = React.useState(false);
  const [carbohydrates, setCarbohydrates] = React.useState(0);
  const [ingredients, setingredients] = React.useState("");
  const [fats, setFats] = React.useState(0);
  const [kilocalories, setKilocalories] = React.useState(0);
  const [manufacturer, setManufacturer] = React.useState("");
  const [protein, setProtein] = React.useState(0);
  const [storageConditions, setStorageConditions] = React.useState("");
  const [specification, setSpecification] = React.useState("");
  const [shelf_life, setShelf_life] = React.useState("");
  const [branchData, setBranchsData] = React.useState(null);
  const [product_categories, setProduct_categories] = React.useState([]);
  const [image, setImage] = useState("");
  const [imageData2, setImageData2] = useState([]);
  const [addHandleImageData, setAddHandleImageData] = useState([
    {
      id: 0,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]);
  const [filialInput, setFilialInput] = useState([
    {
      id: 1,
      branch: "",
      quantity: 1,
    },
  ]);
  const [atributInput, setAtributInput] = useState([
    {
      id: 1,
      content: "",
      order: "",
    },
  ]);
  const navigate = useNavigate();

  const showModalAdd = (url, id) => {
    setIsModalOpenAdd(true);
    setAddImageLink({ image: url, id: id });
  };
  const showModal = (url, id) => {
    setIsModalOpen(true);
    setImageLink({ image: url, id: id });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const setImageUrlAdd = (url, id) => {
    // setSelectImage(url);
    setAddImageLink({ image: window.URL.createObjectURL(url), id: id });

    for (let i = 0; i < addHandleImageData.length; i++) {
      if (addHandleImageData[i].id === id) {
        Object.assign(addHandleImageData[i], {
          image: window.URL.createObjectURL(url),
          imageUrl: url,
        });
      }
    }
  };

  const handleDeleteImageAddApi = (id) => {
    const data = addHandleImageData.filter((el) => el.id !== id);
    setAddHandleImageData(data);
    setIsModalOpenAdd(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleChangeSelect = (value) => {
    setProduct_categories(value);
  };
  const handleChangeActiveShop = (event) => {
    setOn_sale(event.target.checked);
  };

  const addImageInput = (e) => {
    setAddHandleImageData([...addHandleImageData, { id: e }]);
  };
  const addImageInputUpdate = (e) => {
    setImageData2([...imageData2, { id: e }]);
  };

  const addFilialInput = (value, id) => {
    let findItem = filialInput.find((elem) => elem.id === id);
    // console.log(findItem, "sssssssssssssss", filialInput, id);
    findItem.branch = Number(value?.branch);
    findItem.quantity = value?.quantity;
    setFilialInput([...filialInput]);
  };

  const addProductHighlightInput = (value, id) => {
    let findItem = atributInput.find((elem) => elem.id === id);
    findItem.content = value?.content;
    findItem.order = value?.order;
    setAtributInput([...atributInput]);
  };
  // console.log("atribut input", atributInput);
  const addFormInput = (value, id) => {
    setFilialInput([...filialInput, { id, ...value }]);
  };

  const addAtributInput = async (value, id) => {
    setAtributInput([...atributInput, { id, ...value }]);
  };
  const handleDeleteImageApi = (id) => {
    setIsModalOpen(false);
    const data = imageData2.filter((el) => el.id !== id);
    setImageData2(data);
    if (imageData.find((el) => el.id === id)) {
      delID.push(id);
    }
  };

  const setImageUrlUpdate = (url, id) => {
    // setIsModalOpen(false);
    setImageLink({ image: window.URL.createObjectURL(url), id: id });
    for (let i = 0; i < imageData2.length; i++) {
      if (imageData2[i].id === id) {
        Object.assign(imageData2[i], {
          image: window.URL.createObjectURL(url),
          imageUrl: url,
        });
      }
    }
  };

  const deleteID = (i) => {
    setFilialInput(filialInput.filter((item) => item.id !== i));
  };
  const deleteIDHighlight = (i) => {
    setAtributInput(atributInput.filter((item) => item?.id !== i));
    console.log("delete id == ", i, atributInput);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const product_branch = filialInput?.map((item) => {
      const { branch, quantity } = item;

      return { branch, quantity };
    });

    const product_highlight = atributInput?.map((item) => {
      const { content, order } = item;
      return { content, order };
    });

    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("product_galereya", image[i]);
    }

    const formData1 = new FormData();
    formData1.append(
      "product_attribute",
      JSON.stringify({
        carbohydrates: carbohydrates,
        ingredients: ingredients,
        fats: fats,
        kilocalories: kilocalories,
        manufacturer: manufacturer,
        protein: protein,
        storageConditions: storageConditions,
        specification: specification,
        shelf_life: shelf_life,
      })
    );
    formData1.append("name", name);
    formData1.append("price", price);
    formData1.append("description", description);
    formData1.append("discount", discount);
    formData1.append("on_sale", on_sale);
    formData1.append("product_categories", JSON.stringify(product_categories));
    if (product_highlight?.[0]?.content !== "") {
      formData1.append("product_highlight", JSON.stringify(product_highlight));
    }
    if (
      product_branch?.[0]?.branch !== 0 &&
      product_branch?.[0]?.branch !== ""
    ) {
      formData1.append("product_count_branch", JSON.stringify(product_branch));
    }

    formData1.append("type", location.search.split("?")[1]);
    for (let i = 0; i < addHandleImageData?.length; i++) {
      if (addHandleImageData[i].imageUrl) {
        formData1.append("product_galereya", addHandleImageData[i].imageUrl);
      }
    }

    await Client.post(API_ENDPOINTS.CREATE_PRODUCT, formData1)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli qo'shildi");
        navigate("/products");
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const handleSubmitAddVariant = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const product_branch = filialInput?.map((item) => {
      const { branch, quantity } = item;
      return { branch, quantity };
    });

    const product_highlight = atributInput?.map((item) => {
      const { content, order } = item;
      return { content, order };
    });

    const formData1 = new FormData();
    formData1.append(
      "product_attribute",
      JSON.stringify({
        carbohydrates: carbohydrates,
        ingredients: ingredients,
        fats: fats,
        kilocalories: kilocalories,
        manufacturer: manufacturer,
        protein: protein,
        storageConditions: storageConditions,
        specification: specification,
        shelf_life: shelf_life,
      })
    );
    formData1.append("name", name);
    formData1.append("price", price);
    formData1.append("description", description);
    formData1.append("discount", discount);
    formData1.append("on_sale", on_sale);
    formData1.append("variant_id", location.search.split("?")[4]);
    formData1.append("product_categories", JSON.stringify(product_categories));
    if (product_highlight?.[0]?.content !== "") {
      formData1.append("product_highlight", JSON.stringify(product_highlight));
    }
    if (product_branch?.[0]?.branch !== 0) {
      formData1.append("product_count_branch", JSON.stringify(product_branch));
    }

    formData1.append("type", location.search.split("?")[1]);
    for (let i = 0; i < imageData2?.length; i++) {
      if (imageData2[i].imageUrl) {
        formData1.append("product_galereya", imageData2[i].imageUrl);
      }
    }

    await Client.post(`${API_ENDPOINTS.CREATE_PRODUCT}`, formData1)
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    document.querySelector(".create-branch-form").reset();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const product_branch = filialInput?.map((item) => {
      const { branch, quantity } = item;
      return { branch, quantity };
    });
    const product_highlight = atributInput?.map((item) => {
      const { content, order } = item;
      return { content, order };
    });

    const formData1 = new FormData();
    formData1.append(
      "product_attribute",
      JSON.stringify({
        carbohydrates: carbohydrates,
        ingredients: ingredients,
        fats: fats,
        kilocalories: kilocalories,
        manufacturer: manufacturer,
        protein: protein,
        storageConditions: storageConditions,
        specification: specification,
        shelf_life: shelf_life,
      })
    );
    formData1.append("name", name);
    formData1.append("price", price);
    formData1.append("description", description);
    formData1.append("discount", discount);
    formData1.append("on_sale", on_sale);
    formData1.append("product_categories", JSON.stringify(product_categories));
    if (product_highlight?.[0]?.content !== "") {
      formData1.append("product_highlight", JSON.stringify(product_highlight));
    }
    if (product_branch?.[0]?.branch !== 0) {
      formData1.append("product_count_branch", JSON.stringify(product_branch));
    }

    formData1.append("type", location.search.split("?")[1]);
    for (let i = 0; i < imageData2?.length; i++) {
      if (imageData2[i].imageUrl) {
        formData1.append("product_galereya", imageData2[i].imageUrl);
      }
    }
    for (let i = 0; i < delID?.length; i++) {
      formData1.append("deleted_image", delID[i]);
    }

    await Client.patch(
      `${API_ENDPOINTS.PATCH_PRODUCT}${location.search.split("?")[3]}/`,
      formData1
    )
      .then((data) => {
        console.log(data);
        toast.success("Mahsulot muvaffaqiyatli saqlandi");
        navigate("/products");
        setSubmiting(false);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    document.querySelector(".create-branch-form").reset();
  };

  const getCategory = async (e) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES_CHAILD}?type=${e}`)
      .then((resp) => {
        setCategoryList(
          resp.results?.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  const getBranchData = async () => {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((res) => {
        setBranchsData(res?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getItem = async () => {
    await Client.get(
      API_ENDPOINTS.DETAIL_PRODUCT + location.search.split("?")[3]
    )
      .then((res) => {
        // console.log("ress=>", res);
        setEditData(res);
        setImageData(
          res?.product_galereya?.map((el, i) => ({
            image: el.image_url,
            id: i + 1,
          }))
        );
        setImageData2(
          res?.product_galereya?.map((el, i) => ({
            image: el.image_url,
            id: i + 1,
          }))
        );
        setAtributInput(
          res?.product_highlight
            ? res?.product_highlight?.map((el, i) => ({
                content: el?.content,
                order: el?.order,
                id: i + 1,
              }))
            : atributInput
        );

        setFilialInput(
          res?.product_count_branch
            ? res?.product_count_branch?.map((el, i) => ({
                branch: el?.branch,
                quantity: el?.quantity,
                id: i + 1,
              }))
            : filialInput
        );

        setProduct_categories(
          res?.product_categories?.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );

        setName(res?.name);
        setOn_sale(res?.on_sale);
        setDiscount(res?.discount);
        setDescription(res?.description);
        formatPrice(JSON.parse(res?.price));
        setDiscount(res?.discount);
        setCarbohydrates(res?.product_attribute?.carbohydrates);
        setingredients(res?.product_attribute?.ingredients);
        setFats(res?.product_attribute?.fats);
        setKilocalories(res?.product_attribute?.kilocalories);
        setManufacturer(res?.product_attribute?.manufacturer);
        setProtein(res?.product_attribute?.protein);
        setStorageConditions(res?.product_attribute?.storageConditions);
        setSpecification(res?.product_attribute?.specification);
        setShelf_life(res?.product_attribute?.shelf_life);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBranchData();
  }, []);

  useEffect(() => {
    if (
      location.search.split("?")?.[2] === "edit" ||
      location.search.split("?")?.[2] === "addVariant"
    ) {
      getItem();
    }
    if (location.search.split("?")[1] === "bistro") {
      getCategory("bistro");
    } else if (location.search.split("?")[1] === "byuti") {
      getCategory("byuti");
    }
    // eslint-disable-next-line
  }, []);

  const change = () => {
    const product_highlight = atributInput?.map((item) => {
      const { content, order } = item;
      return { content, order };
    });
  };

  // const lifeImagee = (e) => {
  //   let img = window.URL.createObjectURL(e.target.files[0]);
  //   LiveImageArr.push(img);
  // };

  const prosent = (e) => {
    return (price * discount) / 100;
  };

  const formatPrice = (inputValue) => {
    inputValue = inputValue.replace(/\s/g, "");
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    setPrice(inputValue);
  };

  return location.search.split("?")?.[2] === "edit" ? (
    // Mahsulotni tahrirlash
    editData ? (
      <div className="flex">
        <div className="w-2/3">
          <h1 className="text-[28px] pb-3">Mahsulotni tahrirlash</h1>
          <Toaster />
          <div className="flex gap-5">
            <form
              onSubmit={handleSubmitEdit}
              className=" flex flex-col gap-5 create-branch-form"
            >
              <TextField
                label="Nomi"
                variant="outlined"
                size="large"
                type="text"
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {/* <TextField
                label="Narxi"
                variant="outlined"
                size="large"
                type="number"
                defaultValue={JSON.parse(editData?.price) || price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              /> */}
              <label>
                Narx
               <input
                type="text"
                id="priceInput"
                placeholder="Narxi *"
                required
                defaultValue={JSON.parse(editData?.price) || price}
                onChange={(e) => formatPrice(e.target.value)}
              />
              </label>
              <TextField
                id="outlined-multiline-static"
                label="Izoh"
                defaultValue={editData?.description || description}
                multiline
                rows={4}
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <TextField
                label="Chegirmasi"
                variant="outlined"
                size="large"
                type="number"
                defaultValue={editData?.discount || discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
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
                  defaultValue={product_categories}
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  placeholder="Bog'liq kategoriyalar"
                  onChange={handleChangeSelect}
                  options={categoryList}
                />
              </Space>

              <div>
                <label className="font-normal font-sans text-lg">Sotuvda</label>
                <Switch
                  checked={editData?.on_sale || on_sale}
                  defaultChecked={true}
                  onChange={handleChangeActiveShop}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <label className="font-normal font-sans text-lg">
                        Mahsulot galleriyasi
                      </label>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ display: "flex ", gap: "10px" }}>
                      <div
                        className="flex gap-3 flex-wrap"
                        style={{ minWidth: "560px" }}
                      >
                        {imageData2.map((item, i) => {
                          return (
                            <>
                              {item.image ? (
                                <div
                                  onClick={() =>
                                    showModal(item?.image, item.id)
                                  }
                                  style={{
                                    maxWidth: "150px",
                                    width: "150px",
                                    backgroundImage: `url(${
                                      item?.image ? item?.image : ""
                                    })`,
                                    backgroundSize: "cover",
                                    height: "120px",
                                    borderRadius: "5px",
                                  }}
                                ></div>
                              ) : (
                                <div
                                  onClick={() =>
                                    item.image
                                      ? showModal(item?.image, item.id)
                                      : console.log("rasm yoq")
                                  }
                                  style={{
                                    maxWidth: "150px",
                                    width: "150px",
                                    backgroundImage: `url(${
                                      item?.image ? item?.image : ""
                                    })`,
                                    backgroundSize: "cover",
                                    height: "120px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid #ccc",
                                    position: "relative",
                                  }}
                                >
                                  {item.image ? (
                                    ""
                                  ) : (
                                    <i
                                      className="fa-regular fa-image"
                                      style={{ fontSize: "35px" }}
                                    ></i>
                                  )}
                                  {item?.image ? (
                                    " "
                                  ) : (
                                    <input
                                      style={{
                                        opacity: "0",
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        bottom: "0",
                                        right: "0",
                                      }}
                                      onChange={(e) =>
                                        setImageUrlUpdate(
                                          e.target.files[0],
                                          item.id
                                        )
                                      }
                                      type="file"
                                    />
                                  )}
                                </div>
                              )}

                              <Modal
                                title="Retsept Galleriyasi"
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                cancelText="Yopish"
                                okButtonProps={{ style: { display: "none" } }}
                              >
                                <div
                                  style={{
                                    maxWidth: "800px",
                                    width: "100%",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      backgroundImage: `url(${
                                        imageLink?.image ? imageLink?.image : ""
                                      })`,
                                      backgroundSize: "cover",
                                      minHeight: "400px",
                                      height: "100%",
                                      borderRadius: "5px",
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "end",
                                      gap: "10px",
                                    }}
                                  >
                                    <div
                                      onClick={() =>
                                        handleDeleteImageApi(imageLink?.id)
                                      }
                                      className=" cursor-pointer py-1.5 px-2 bg-red-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                    >
                                      O'chirish
                                    </div>
                                    <label className=" cursor-pointer py-1.5 px-2 bg-green-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                                      Qo'shish
                                      <input
                                        style={{
                                          display: "none",
                                        }}
                                        onChange={(e) =>
                                          setImageUrlUpdate(
                                            e.target.files[0],
                                            imageLink.id
                                          )
                                        }
                                        type="file"
                                      />
                                    </label>
                                  </div>
                                </div>
                              </Modal>
                            </>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "end",
                          marginLeft: "-35px",
                        }}
                      >
                        <Fab
                          onClick={() =>
                            addImageInputUpdate(imageData2.length + 1)
                          }
                          color="primary"
                          aria-label="add"
                        >
                          <AddIcon />
                        </Fab>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <label className="font-normal font-sans text-lg">
                        Mahsulot atributi
                      </label>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex overflow-y-scroll border-5 flex-col">
                      <div className=" mx-3 mt-3 mb-1 flex items-baseline gap-3">
                        <i className="fa-solid fa-flask"></i>
                        <TextField
                          label="Tarkibi"
                          variant="outlined"
                          className="w-full"
                          multiline
                          maxRows={4}
                          defaultValue={
                            editData?.product_attribute?.ingredients ||
                            ingredients
                          }
                          style={{ marginTop: "30px" }}
                          onChange={(e) => {
                            setingredients(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mx-3 flex items-baseline gap-3">
                        <i className="fa-solid fa-virus-covid"></i>
                        <TextField
                          label="Uglevod"
                          variant="outlined"
                          size="small"
                          style={{ marginTop: "30px" }}
                          className="w-full"
                          type="number"
                          defaultValue={carbohydrates}
                          onChange={(e) => {
                            setCarbohydrates(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mx-3 flex items-baseline gap-3">
                        <i className="fa-solid fa-vial-virus"></i>
                        <TextField
                          label="Kaloriya"
                          variant="outlined"
                          size="small"
                          style={{ marginTop: "30px" }}
                          className="w-full"
                          type="number"
                          defaultValue={kilocalories}
                          onChange={(e) => {
                            setKilocalories(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mx-3 flex items-baseline gap-3">
                        <i className="fa-solid fa-mortar-pestle"></i>
                        <TextField
                          label="Yog' miqdori"
                          variant="outlined"
                          size="small"
                          style={{ marginTop: "30px" }}
                          className="w-full"
                          type="number"
                          defaultValue={fats}
                          onChange={(e) => {
                            setFats(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mx-3 flex items-baseline gap-3">
                        <i className="fa-solid fa-bandage"></i>
                        <TextField
                          label="Protien"
                          variant="outlined"
                          size="small"
                          style={{ marginTop: "30px" }}
                          className="w-full"
                          type="number"
                          defaultValue={protein}
                          onChange={(e) => {
                            setProtein(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mx-3 flex items-baseline gap-3">
                        <i className="fa-solid fa-hotel"></i>
                        <TextField
                          label="Ishlab chiqaruvchi"
                          variant="outlined"
                          size="small"
                          style={{ marginTop: "30px" }}
                          className="w-full"
                          type="text"
                          defaultValue={manufacturer}
                          onChange={(e) => {
                            setManufacturer(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mx-3 flex items-baseline gap-3">
                        <i className="fa-solid fa-film"></i>
                        <TextField
                          label="Mahsulot soni yoki hajmi"
                          variant="outlined"
                          size="small"
                          style={{ marginTop: "30px" }}
                          className="w-full"
                          type="text"
                          defaultValue={specification}
                          onChange={(e) => {
                            setSpecification(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mx-3 flex items-baseline gap-3">
                        <i className="fa-solid fa-tower-broadcast"></i>
                        <TextField
                          label="Saqlash muddati"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          style={{ marginTop: "30px" }}
                          type="text"
                          defaultValue={shelf_life}
                          onChange={(e) => {
                            setShelf_life(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mx-3 flex items-baseline gap-3">
                        <i className="fa-solid fa-list-ul"></i>
                        <TextField
                          label="Saqlash shartlari"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          style={{ marginTop: "30px" }}
                          type="text"
                          defaultValue={storageConditions}
                          onChange={(e) => {
                            setStorageConditions(e.target.value);
                          }}
                          multiline
                          rows={4}
                        />
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <label className="font-normal font-sans text-lg mt-5">
                        Mahsulot asosiy elementlari
                      </label>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      className="flex gap-x-12 p-3 mt-3"
                      style={{ backgroundColor: "#EEEEEE" }}
                    >
                      <p>
                        <i className="fa-solid fa-arrow-down-9-1"></i> Tartib
                        raqami
                      </p>
                      <p>
                        <i className="fa-regular fa-star"></i> Asosiy element
                      </p>
                    </div>

                    {atributInput?.map((item, i) => (
                      <AddInput
                        dataH={item}
                        key={i}
                        addFilialInput={addProductHighlightInput}
                        id={item.id ? item.id : addFilialInput[i - 1]?.id + 1}
                        deleteIDHighlight={deleteIDHighlight}
                        change={change}
                      />
                    ))}

                    <div
                      onClick={() =>
                        addAtributInput(
                          { content: 0, order: 0 },
                          filialInput?.length === 0
                            ? 1
                            : filialInput[filialInput.length - 1].id + 1
                        )
                      }
                      className="p-3"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <p>
                        <i className="fa-solid fa-circle-plus"></i> qo'shish
                      </p>{" "}
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <label className="font-normal font-sans text-lg mt-5">
                        Filiallardagi mahsulot
                      </label>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      className="flex gap-x-48 p-3 px-3 mt-3"
                      style={{ backgroundColor: "#EEEEEE" }}
                    >
                      <p>
                        <i className="fa-solid fa-folder-tree"></i> Filiallar
                      </p>
                      <p>
                        <i className="fa-solid fa-arrow-down-9-1"></i> Soni
                      </p>
                    </div>
                    {filialInput?.map((item, i) => (
                      <AddInput
                        dataF={item}
                        selectData={branchData}
                        key={i}
                        addFilialInput={addFilialInput}
                        id={item.id ? item.id : addFilialInput[i - 1]?.id + 1}
                        deleteID={deleteID}
                        change={change}
                        // setChangeBranchCunt={setChangeBranchCunt}
                        // setChangeBranch={setChangeBranch}
                      />
                    ))}
                    <div
                      onClick={() =>
                        addFormInput(
                          { branch: "", quantity: "" },
                          filialInput?.length === 0
                            ? 1
                            : filialInput[filialInput.length - 1].id + 1
                        )
                      }
                      className="p-3"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <p>
                        <i className="fa-solid fa-circle-plus"></i> qo'shish
                      </p>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>

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

        <div className="w-1/3 font-sans">
          <div className="text-end mb-3">
            <Link to="/products">
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
          <h1 className="text-[20px] pb-5">Mahsulotning saytda ko'rinishi</h1>
          <div className="border rounded p-2.5">
            <div className="text-center w-full flex justify-center">
              <img
                className="rounded border"
                src={`${
                  imageData2?.[0]?.image
                    ? imageData2?.[0]?.image
                    : "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
                }`}
                alt="samokat"
              />
            </div>

            <h3
              style={{
                maxWidth: "320px",
                width: "100%",
                fontFamily: "inter",
              }}
              className="text-[18px] text-[#404040] font-serif font-bold text-slate-600"
            >
              {name ? name : editData?.name}{" "}
              <span className=" font-bold text-slate-400">
                {specification ? `${specification}` : ""}
              </span>
            </h3>

            {atributInput?.content !== "" ? (
              <ul>
                {atributInput?.map((item, i) => (
                  <li
                    key={i + 1}
                    className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                  >
                    {" "}
                    <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {editData?.product_highlight?.map((item, i) => (
                  <li
                    key={i + 1}
                    className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                  >
                    {" "}
                    <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            )}

            {description || editData?.description ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Izoh
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {description ? description : editData?.description}
                </p>
              </>
            ) : (
              ""
            )}

            <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
              100 gr uchun :
            </p>
            <div
              className="flex flex-wrap"
              style={{
                maxWidth: "330px",
                width: "100%",
              }}
            >
              {carbohydrates || editData?.product_attribute?.carbohydrates ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {carbohydrates
                      ? carbohydrates
                      : editData?.product_attribute?.carbohydrates}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    uglevod
                  </p>
                </div>
              ) : (
                ""
              )}
              {kilocalories || editData?.product_attribute?.kilocalories ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {kilocalories
                      ? kilocalories
                      : editData?.product_attribute?.kilocalories}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    kaloriya
                  </p>
                </div>
              ) : (
                ""
              )}
              {fats || editData?.product_attribute?.fats ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {fats ? fats : editData?.product_attribute?.fats}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    yog'
                  </p>
                </div>
              ) : (
                ""
              )}

              {protein || editData?.product_attribute?.protein ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {protein ? protein : editData?.product_attribute?.protein}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    protien
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            {ingredients || editData?.product_attribute?.ingredients ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-3 max-w-xs">
                  Tarkibi :
                </p>
                <p
                  style={{
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {ingredients
                    ? ingredients
                    : editData?.product_attribute?.ingredients}
                </p>
              </>
            ) : (
              ""
            )}
            {manufacturer || editData?.product_attribute?.manufacturer ? (
              <>
                <p className="text-[13px] mt-2  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Ishlab chiqaruvchi :
                </p>
                <p
                  style={{
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {manufacturer
                    ? manufacturer
                    : editData?.product_attribute?.manufacturer}
                </p>
              </>
            ) : (
              ""
            )}

            {storageConditions ||
            editData?.product_attribute?.storageConditions ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Saqlash shartlari :
                </p>
                <p
                  style={{
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {storageConditions
                    ? storageConditions
                    : editData?.product_attribute?.storageConditions}
                </p>
              </>
            ) : (
              ""
            )}
            {shelf_life || editData?.product_attribute?.shelf_life ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Saqlash muddati :
                </p>
                <p
                  style={{
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {shelf_life
                    ? shelf_life
                    : editData?.product_attribute?.shelf_life}
                </p>
              </>
            ) : (
              ""
            )}
            {/* {atributInput?.[0].content !== "" ||
            atributInput?.[0].order !== "" ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Mahsulot elementlari :
                </p>
                {atributInput?.map((el) => {
                  return (
                    <div
                      key={el.id}
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "baseline",
                      }}
                    >
                      <span style={{ fontWeight: "600", paddingRight: "8px" }}>
                        {el.order}
                      </span>
                      <p className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs">
                        {el.content}
                      </p>
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )} */}
            {discount || price ? (
              <div className="bg-[#3B82F6] my-2 rounded p-2 text-center text-white ">
                {discount ? (
                  <p>
                    {price - prosent(discount)} <del>{price}</del> so'm
                  </p>
                ) : (
                  <>{price} so'm</>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    ) : (
      <></>
    )
  ) : // Mahsulotga variant qoshish
  location.search.split("?")?.[2] === "addVariant" ? (
    editData ? (
      <div className="flex">
        <div className="w-2/3">
          <h1 className="text-[28px] pb-3">
            {" "}
            <u>
              {editData.name +
                " " +
                (editData?.product_attribute?.specification
                  ? editData?.product_attribute?.specification
                  : "")}
            </u>{" "}
            uchun variant yaratish
          </h1>
          <Toaster />
          <div className="flex gap-5">
            <form
              onSubmit={handleSubmitAddVariant}
              className=" flex flex-col gap-5 create-branch-form"
            >
              <TextField
                label="Nomi"
                variant="outlined"
                size="large"
                type="text"
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {/* <TextField
                label="Narxi"
                variant="outlined"
                size="large"
                type="number"
                defaultValue={JSON.parse(editData?.price) || price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              /> */}
              <label>
              Narx
              <input
                type="text"
                id="priceInput"
                placeholder="Narxi *"
                required
                defaultValue={JSON.parse(editData.price) || price}
                onChange={(e) => formatPrice(e.target.value)}
              />
              </label>
              <TextField
                id="outlined-multiline-static"
                label="Izoh"
                defaultValue={editData?.description || description}
                multiline
                rows={4}
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <TextField
                label="Chegirmasi"
                variant="outlined"
                size="large"
                type="number"
                defaultValue={editData?.discount || discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
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
                  defaultValue={product_categories}
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  placeholder="Bog'liq kategoriyalar"
                  onChange={handleChangeSelect}
                  options={categoryList}
                />
              </Space>

              <div>
                <label className="font-normal font-sans text-lg">Sotuvda</label>
                <Switch
                  checked={editData?.on_sale || on_sale}
                  defaultChecked={true}
                  onChange={handleChangeActiveShop}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <label className="font-normal font-sans text-lg">
                        Mahsulot galleriyasi
                      </label>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ display: "flex ", gap: "10px" }}>
                      <div
                        className="flex gap-3 flex-wrap"
                        style={{ minWidth: "560px" }}
                      >
                        {imageData2.map((item, i) => {
                          return (
                            <>
                              {item.image ? (
                                <div
                                  onClick={() =>
                                    showModal(item?.image, item.id)
                                  }
                                  style={{
                                    maxWidth: "150px",
                                    width: "150px",
                                    backgroundImage: `url(${
                                      item?.image ? item?.image : ""
                                    })`,
                                    backgroundSize: "cover",
                                    height: "120px",
                                    borderRadius: "5px",
                                  }}
                                ></div>
                              ) : (
                                <div
                                  onClick={() =>
                                    item.image
                                      ? showModal(item?.image, item.id)
                                      : console.log("rasm yoq")
                                  }
                                  style={{
                                    maxWidth: "150px",
                                    width: "150px",
                                    backgroundImage: `url(${
                                      item?.image ? item?.image : ""
                                    })`,
                                    backgroundSize: "cover",
                                    height: "120px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid #ccc",
                                    position: "relative",
                                  }}
                                >
                                  {item.image ? (
                                    ""
                                  ) : (
                                    <i
                                      className="fa-regular fa-image"
                                      style={{ fontSize: "35px" }}
                                    ></i>
                                  )}
                                  {item?.image ? (
                                    " "
                                  ) : (
                                    <input
                                      style={{
                                        opacity: "0",
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        bottom: "0",
                                        right: "0",
                                      }}
                                      onChange={(e) =>
                                        setImageUrlUpdate(
                                          e.target.files[0],
                                          item.id
                                        )
                                      }
                                      type="file"
                                    />
                                  )}
                                </div>
                              )}

                              <Modal
                                title="Retsept Galleriyasi"
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                cancelText="Yopish"
                                okButtonProps={{ style: { display: "none" } }}
                              >
                                <div
                                  style={{
                                    maxWidth: "800px",
                                    width: "100%",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      backgroundImage: `url(${
                                        imageLink?.image ? imageLink?.image : ""
                                      })`,
                                      backgroundSize: "cover",
                                      minHeight: "400px",
                                      height: "100%",
                                      borderRadius: "5px",
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "end",
                                      gap: "10px",
                                    }}
                                  >
                                    <div
                                      onClick={() =>
                                        handleDeleteImageApi(imageLink?.id)
                                      }
                                      className=" cursor-pointer py-1.5 px-2 bg-red-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                    >
                                      O'chirish
                                    </div>
                                    <label className=" cursor-pointer py-1.5 px-2 bg-green-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                                      Qo'shish
                                      <input
                                        style={{
                                          display: "none",
                                        }}
                                        onChange={(e) =>
                                          setImageUrlUpdate(
                                            e.target.files[0],
                                            imageLink.id
                                          )
                                        }
                                        type="file"
                                      />
                                    </label>
                                  </div>
                                </div>
                              </Modal>
                            </>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "end",
                          marginLeft: "-35px",
                        }}
                      >
                        <Fab
                          onClick={() =>
                            addImageInputUpdate(imageData2.length + 1)
                          }
                          color="primary"
                          aria-label="add"
                        >
                          <AddIcon />
                        </Fab>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <label
                  className="font-normal font-sans text-lg mt-2"
                  style={{ marginTop: "15px", display: "block" }}
                >
                  Mahsulot atributi
                </label>
                <div className="flex overflow-y-scroll border-5 flex-col">
                  <div className=" mx-3 mt-3 mb-1 flex items-baseline gap-3">
                    <i className="fa-solid fa-flask"></i>
                    <TextField
                      label="Tarkibi"
                      variant="outlined"
                      className="w-full"
                      multiline
                      required
                      maxRows={4}
                      defaultValue={
                        editData?.product_attribute?.ingredients || ingredients
                      }
                      style={{ marginTop: "30px" }}
                      onChange={(e) => {
                        setingredients(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-virus-covid"></i>
                    <TextField
                      label="Uglevod"
                      variant="outlined"
                      size="small"
                      style={{ marginTop: "30px" }}
                      className="w-full"
                      type="number"
                      defaultValue={carbohydrates}
                      onChange={(e) => {
                        setCarbohydrates(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-vial-virus"></i>
                    <TextField
                      label="Kaloriya"
                      variant="outlined"
                      size="small"
                      style={{ marginTop: "30px" }}
                      className="w-full"
                      type="number"
                      defaultValue={kilocalories}
                      onChange={(e) => {
                        setKilocalories(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-mortar-pestle"></i>
                    <TextField
                      label="Yog' miqdori"
                      variant="outlined"
                      size="small"
                      style={{ marginTop: "30px" }}
                      className="w-full"
                      type="number"
                      defaultValue={fats}
                      onChange={(e) => {
                        setFats(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-bandage"></i>
                    <TextField
                      label="Protien"
                      variant="outlined"
                      size="small"
                      style={{ marginTop: "30px" }}
                      className="w-full"
                      type="number"
                      defaultValue={protein}
                      onChange={(e) => {
                        setProtein(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-hotel"></i>
                    <TextField
                      label="Ishlab chiqaruvchi"
                      variant="outlined"
                      size="small"
                      style={{ marginTop: "30px" }}
                      className="w-full"
                      type="text"
                      required
                      defaultValue={manufacturer}
                      onChange={(e) => {
                        setManufacturer(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-film"></i>
                    <TextField
                      label="Mahsulot soni yoki hajmi"
                      variant="outlined"
                      size="small"
                      style={{ marginTop: "30px" }}
                      className="w-full"
                      type="text"
                      required
                      defaultValue={specification}
                      onChange={(e) => {
                        setSpecification(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-tower-broadcast"></i>
                    <TextField
                      label="Saqlash muddati"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      style={{ marginTop: "30px" }}
                      type="text"
                      required
                      defaultValue={shelf_life}
                      onChange={(e) => {
                        setShelf_life(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-list-ul"></i>
                    <TextField
                      label="Saqlash shartlari"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      style={{ marginTop: "30px" }}
                      type="text"
                      required
                      defaultValue={storageConditions}
                      onChange={(e) => {
                        setStorageConditions(e.target.value);
                      }}
                      multiline
                      rows={4}
                    />
                  </div>
                </div>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <label className="font-normal font-sans text-lg mt-5">
                        Mahsulot asosiy elementlari
                      </label>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      className="flex gap-x-12 p-3 mt-3"
                      style={{ backgroundColor: "#EEEEEE" }}
                    >
                      <p>
                        <i className="fa-solid fa-arrow-down-9-1"></i> Tartib
                        raqami
                      </p>
                      <p>
                        <i className="fa-regular fa-star"></i> Asosiy element
                      </p>
                    </div>

                    {atributInput?.map((item, i) => (
                      <AddInput
                        dataH={item}
                        key={i}
                        addFilialInput={addProductHighlightInput}
                        id={i + 1}
                        deleteIDHighlight={deleteIDHighlight}
                        change={change}
                      />
                    ))}

                    <div
                      onClick={() =>
                        addAtributInput(
                          { content: 0, order: 0 },
                          atributInput.length + 1
                        )
                      }
                      className="p-3"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <p>
                        <i className="fa-solid fa-circle-plus"></i> qo'shish
                      </p>{" "}
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <label className="font-normal font-sans text-lg mt-5">
                        Filiallardagi mahsulot
                      </label>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      className="flex gap-x-48 p-3 px-3 mt-3"
                      style={{ backgroundColor: "#EEEEEE" }}
                    >
                      <p>
                        <i className="fa-solid fa-folder-tree"></i> Filiallar
                      </p>
                      <p>
                        <i className="fa-solid fa-arrow-down-9-1"></i> Soni
                      </p>
                    </div>
                    {filialInput?.map((item, i) => (
                      <AddInput
                        dataF={item}
                        selectData={branchData}
                        key={i}
                        addFilialInput={addFilialInput}
                        id={i + 1}
                        deleteID={deleteID}
                        change={change}
                        // setChangeBranchCunt={setChangeBranchCunt}
                        // setChangeBranch={setChangeBranch}
                      />
                    ))}
                    <div
                      onClick={() =>
                        addFormInput(
                          { branch: 0, quantity: 0 },
                          filialInput.length + 1
                        )
                      }
                      className="p-3"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <p>
                        <i className="fa-solid fa-circle-plus"></i> qo'shish
                      </p>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>

              <Button
                variant="outlined"
                size="large"
                type="submit"
                disabled={submiting}
                color="success"
              >
                {submiting ? "Qo'shilmoqda" : "Variant qo'shish"}
              </Button>
            </form>
          </div>
        </div>

        <div className="w-1/3 font-sans">
          <div className="text-end mb-3">
            <Link to="/products">
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
          <h1 className="text-[20px] pb-5">Mahsulotning saytda ko'rinishi</h1>
          <div className="border rounded p-2.5">
            <div className="text-center w-full flex justify-center">
              <img
                className="rounded border"
                src={`${
                  imageData2?.[0]?.image
                    ? imageData2?.[0]?.image
                    : "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
                }`}
                alt="samokat"
              />
            </div>

            <h3
              style={{
                maxWidth: "320px",
                width: "100%",
                fontFamily: "inter",
              }}
              className="text-[18px] text-[#404040] font-serif font-bold text-slate-600"
            >
              {name ? name : editData?.name}{" "}
              <span className=" font-bold text-slate-400">
                {specification ? specification : ""}{" "}
              </span>
            </h3>

            {atributInput?.content !== "" ? (
              <ul>
                {atributInput?.map((item, i) => (
                  <li
                    key={i + 1}
                    className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                  >
                    {" "}
                    <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {editData?.product_highlight?.map((item, i) => (
                  <li
                    key={i + 1}
                    className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                  >
                    {" "}
                    <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            )}

            {description || editData?.description ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Izoh
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {description ? description : editData?.description}
                </p>
              </>
            ) : (
              ""
            )}

            <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
              100 gr uchun :
            </p>
            <div
              className="flex flex-wrap"
              style={{
                maxWidth: "330px",
                width: "100%",
              }}
            >
              {carbohydrates || editData?.product_attribute?.carbohydrates ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {carbohydrates
                      ? carbohydrates
                      : editData?.product_attribute?.carbohydrates}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    uglevod
                  </p>
                </div>
              ) : (
                ""
              )}
              {kilocalories || editData?.product_attribute?.kilocalories ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {kilocalories
                      ? kilocalories
                      : editData?.product_attribute?.kilocalories}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    kaloriya
                  </p>
                </div>
              ) : (
                ""
              )}
              {fats || editData?.product_attribute?.fats ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {fats ? fats : editData?.product_attribute?.fats}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    yog'
                  </p>
                </div>
              ) : (
                ""
              )}

              {protein || editData?.product_attribute?.protein ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {protein ? protein : editData?.product_attribute?.protein}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    protien
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            {ingredients || editData?.product_attribute?.ingredients ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-3 max-w-xs">
                  Tarkibi :
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {ingredients
                    ? ingredients
                    : editData?.product_attribute?.ingredients}
                </p>
              </>
            ) : (
              ""
            )}
            {manufacturer || editData?.product_attribute?.manufacturer ? (
              <>
                <p className="text-[13px] mt-2  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Ishlab chiqaruvchi :
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {manufacturer
                    ? manufacturer
                    : editData?.product_attribute?.manufacturer}
                </p>
              </>
            ) : (
              ""
            )}

            {storageConditions ||
            editData?.product_attribute?.storageConditions ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Saqlash shartlari :
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {storageConditions
                    ? storageConditions
                    : editData?.product_attribute?.storageConditions}
                </p>
              </>
            ) : (
              ""
            )}
            {shelf_life || editData?.product_attribute?.shelf_life ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Saqlash muddati :
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {shelf_life
                    ? shelf_life
                    : editData?.product_attribute?.shelf_life}
                </p>
              </>
            ) : (
              ""
            )}
            {atributInput?.[0].content !== "" ||
            atributInput?.[0].order !== "" ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Mahsulot elementlari :
                </p>
                {atributInput?.map((el) => {
                  return (
                    <div
                      key={el.id}
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "baseline",
                      }}
                    >
                      <span style={{ fontWeight: "600", paddingRight: "8px" }}>
                        {el.order}
                      </span>
                      <p className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs">
                        {el.content}
                      </p>
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}
            {discount || price ? (
              <div className="bg-[#3B82F6] my-2 rounded p-2 text-center text-white ">
                {discount ? (
                  <p>
                    {parseInt(price - prosent(discount))}{" "}
                    <del>{parseInt(price)}</del> so'm
                  </p>
                ) : (
                  <>{parseInt(price)} so'm</>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    ) : (
      <></>
    )
  ) : (
    // Mahsulot qoshish
    <div className="flex gap-5">
      <div className="w-2/3">
        <h1 className="text-[35px] pb-3">Mahsulot qo'shish</h1>
        <Toaster />
        <div className="w-full">
          <form
            onSubmit={handleSubmitAdd}
            className="w-full flex flex-col gap-5 create-branch-form"
          >
            <TextField
              label="Nomi"
              variant="outlined"
              size="small"
              type="text"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {/* <TextField
              inputMode="numeric"
              label="Narxi"
              variant="outlined"
              size="small"
              type="number"
              maxLength="16"
              value={price}
              required
              onChange={ChangePrice}
            /> */}

            <TextField
              label="Chegirmasi"
              variant="outlined"
              size="small"
              type="number"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
            />

            <input
              type="text"
              id="priceInput"
              placeholder="Narxi *"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              id="outlined-multiline-static"
              label="Izoh"
              multiline
              value={description}
              rows={4}
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
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
                placeholder="Bog'liq kategoriyalar"
                onChange={handleChangeSelect}
                options={categoryList}
              />
            </Space>

            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <label className="font-normal font-sans text-lg">
                      Mahsulot galleriyasi :
                    </label>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      display: "flex ",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="flex gap-3 flex-wrap"
                      style={{ minWidth: "490px" }}
                    >
                      {addHandleImageData?.map((item, i) => {
                        return (
                          <>
                            <div
                              key={item.id}
                              onClick={() =>
                                item.image
                                  ? showModalAdd(item?.image, item.id)
                                  : console.log("rasm yoq")
                              }
                              style={{
                                maxWidth: "150px",
                                width: "150px",
                                backgroundImage: `url(${
                                  item?.image ? item?.image : ""
                                })`,
                                backgroundSize: "cover",
                                height: "120px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                // border: "1px solid #ccc",
                                border: `${
                                  false ? "1px solid red" : "1px solid #ccc"
                                }`,
                                borderRadius: "5px",
                                position: "relative",
                              }}
                            >
                              {item.image ? (
                                ""
                              ) : (
                                <i
                                  className="fa-regular fa-image"
                                  style={{ fontSize: "35px" }}
                                ></i>
                              )}
                              {item?.image ? (
                                " "
                              ) : (
                                <input
                                  style={{
                                    opacity: "0",
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                    bottom: "0",
                                    right: "0",
                                  }}
                                  onChange={(e) =>
                                    setImageUrlAdd(e.target.files[0], item.id)
                                  }
                                  type="file"
                                />
                              )}
                            </div>

                            <Modal
                              title="Mahsulot Galleriyasi"
                              open={isModalOpenAdd}
                              // onOk={handleOk}
                              onCancel={handleCancelAdd}
                              cancelText="Yopish"
                              okButtonProps={{ style: { display: "none" } }}
                            >
                              <div
                                style={{
                                  maxWidth: "800px",
                                  width: "100%",
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    backgroundImage: `url(${
                                      addImageLink?.image
                                        ? addImageLink?.image
                                        : ""
                                    })`,
                                    backgroundSize: "cover",
                                    minHeight: "400px",
                                    height: "100%",
                                    borderRadius: "5px",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    onClick={() =>
                                      handleDeleteImageAddApi(addImageLink?.id)
                                    }
                                    className=" cursor-pointer py-1.5 px-2 bg-red-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                  >
                                    O'chirish
                                  </div>
                                  <label className=" cursor-pointer py-1.5 px-2 bg-green-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                                    Qo'shish
                                    <input
                                      style={{
                                        display: "none",
                                      }}
                                      onChange={(e) =>
                                        setImageUrlAdd(
                                          e.target.files[0],
                                          addImageLink.id
                                        )
                                      }
                                      type="file"
                                    />
                                  </label>
                                </div>
                              </div>
                            </Modal>
                          </>
                        );
                      })}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Fab
                        onClick={() =>
                          addImageInput(addHandleImageData.length + 1)
                        }
                        color="primary"
                        aria-label="add"
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              <div style={{ border: "1px solid #EEEEEE" }} className="p-2 my-6">
                <h2 className="text-[18px] pl-3.5 font-normal">
                  Mahsulot atributi :{" "}
                </h2>
                <hr />
                <div
                  style={{ height: "400px" }}
                  className="flex overflow-y-scroll border-5 flex-col"
                >
                  <div className=" mx-3 mt-3 mb-1 flex items-baseline gap-3">
                    <i className="fa-solid fa-flask"></i>
                    <TextField
                      label="Tarkibi"
                      className="w-full"
                      variant="outlined"
                      multiline
                      maxRows={4}
                      required
                      value={ingredients}
                      style={{ marginTop: "30px" }}
                      onChange={(e) => {
                        setingredients(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-virus-covid"></i>
                    <TextField
                      label="Uglevod"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="number"
                      value={carbohydrates}
                      onChange={(e) => {
                        setCarbohydrates(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-vial-virus"></i>
                    <TextField
                      label="Kaloriya"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="number"
                      value={kilocalories}
                      onChange={(e) => {
                        setKilocalories(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-mortar-pestle"></i>
                    <TextField
                      label="Yog' miqdori"
                      variant="outlined"
                      className="w-full"
                      size="small"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="number"
                      value={fats}
                      onChange={(e) => {
                        setFats(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-bandage"></i>
                    <TextField
                      className="w-full"
                      label="Protien"
                      variant="outlined"
                      size="small"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="number"
                      value={protein}
                      onChange={(e) => {
                        setProtein(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-hotel"></i>
                    <TextField
                      className="w-full"
                      label="Ishlab chiqaruvchi"
                      variant="outlined"
                      size="small"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="text"
                      required
                      value={manufacturer}
                      onChange={(e) => {
                        setManufacturer(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-film"></i>
                    <TextField
                      className="w-full"
                      label="Mahsulot soni yoki hajmi"
                      variant="outlined"
                      size="small"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="text"
                      required
                      value={specification}
                      onChange={(e) => {
                        setSpecification(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-tower-broadcast"></i>
                    <TextField
                      className="w-full"
                      label="Saqlash muddati"
                      variant="outlined"
                      size="small"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="text"
                      required
                      value={shelf_life}
                      onChange={(e) => {
                        setShelf_life(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i className="fa-solid fa-list-ul"></i>
                    <TextField
                      className="w-full"
                      label="Saqlash shartlari"
                      variant="outlined"
                      size="small"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="text"
                      required
                      multiline
                      rows={4}
                      value={storageConditions}
                      onChange={(e) => {
                        setStorageConditions(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ border: "1px solid #EEEEEE" }} className="p-2 my-4">
                <h2 className="text-[18px] pl-3.5 font-normal">
                  Mahsulot asosiy elementlari :
                </h2>
                <hr />
                <div
                  className="flex gap-x-12 p-3 mt-3"
                  style={{ backgroundColor: "#EEEEEE" }}
                >
                  <p>
                    <i className="fa-solid fa-arrow-down-9-1"></i> Tartib raqami
                  </p>
                  <p>
                    <i className="fa-regular fa-star"></i> Asosiy element
                  </p>
                </div>

                {atributInput?.map((item, i) => (
                  <AddInput
                    key={i}
                    addFilialInput={addProductHighlightInput}
                    id={i + 1}
                    deleteIDHighlight={deleteIDHighlight}
                    // setChangeBranchCunt={setChangeBranchCunt}
                    // setChangeBranch={setChangeBranch}
                    change={change}
                  />
                ))}

                <div
                  onClick={() =>
                    addAtributInput(
                      { content: 0, order: 0 },
                      atributInput.length + 1
                    )
                  }
                  className="p-3"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                  }}
                >
                  <p>
                    <i className="fa-solid fa-circle-plus"></i> qo'shish
                  </p>{" "}
                </div>
              </div>

              <div style={{ border: "1px solid #EEEEEE" }} className="p-2 my-4">
                <h2 className="text-[18px] pl-3.5 font-normal">
                  Filiallardagi mahsulot :{" "}
                </h2>
                <hr />
                <div
                  className="flex gap-x-48 p-3 px-3 mt-3"
                  style={{ backgroundColor: "#EEEEEE" }}
                >
                  <p>
                    <i className="fa-solid fa-folder-tree"></i> Filiallar
                  </p>
                  <p>
                    <i className="fa-solid fa-arrow-down-9-1"></i> Soni
                  </p>
                </div>
                {filialInput?.map((item, i) => (
                  <AddInput
                    selectData={branchData}
                    key={i}
                    addFilialInput={addFilialInput}
                    id={i + 1}
                    deleteID={deleteID}
                    // setChangeBranchCunt={setChangeBranchCunt}
                    // setChangeBranch={setChangeBranch}
                  />
                ))}
                <div
                  onClick={() =>
                    addFormInput(
                      { branch: 0, quantity: 0 },
                      filialInput.length + 1
                    )
                  }
                  className="p-3"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                  }}
                >
                  <p>
                    <i className="fa-solid fa-circle-plus"></i> qo'shish{" "}
                  </p>
                </div>
              </div>
              <div>
                <label className="font-normal font-sans text-lg pl-1.5">
                  Sotuvda
                </label>
                <Switch
                  checked={on_sale}
                  onChange={handleChangeActiveShop}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>

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

      <div className="w-1/3 font-sans">
        <h1 className="text-[22px] pb-5">Mahsulotning saytda ko'rinishi</h1>
        <div className="border rounded p-2.5">
          <div className="text-center w-full flex justify-center">
            <img
              className="rounded border"
              src={`${
                addHandleImageData?.[0]?.image
                  ? addHandleImageData?.[0]?.image
                  : "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
              }`}
              alt="samokat"
            />
          </div>
          <h3
            style={{
              maxWidth: "320px",
              width: "100%",
              fontFamily: "inter",
            }}
            className="text-[18px] text-[#404040] font-serif font-bold text-slate-600"
          >
            {name ? name : "Mahsulot nomi" + " "}

            <span className=" font-bold text-slate-400 ml-2">
              {specification ? `${specification}` : ""}
            </span>
          </h3>

          {atributInput?.content !== "" ? (
            <ul>
              {atributInput?.map((item, i) => (
                <li
                  key={i + 1}
                  className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                >
                  {" "}
                  <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                  {item.content}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}

          {description ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Izoh
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "320px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {description ? description : ""}
              </p>
            </>
          ) : (
            <></>
          )}
          <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
            100 gr uchun :
          </p>
          <div
            className="flex flex-wrap"
            style={{
              maxWidth: "330px",
              width: "100%",
            }}
          >
            {carbohydrates ? (
              <div className="w-1/5 flex flex-col justify-center">
                <span className="text-[18px] leading-[22px]  text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                  {carbohydrates ? carbohydrates : "..."}
                </span>
                <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                  uglevod
                </p>
              </div>
            ) : (
              ""
            )}
            {kilocalories ? (
              <div className="w-1/5 flex flex-col justify-center">
                <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                  {kilocalories ? kilocalories : "..."}
                </span>
                <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                  kaloriya
                </p>
              </div>
            ) : (
              ""
            )}
            {fats ? (
              <div className="w-1/5 flex flex-col justify-center">
                <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                  {fats ? fats : "..."}
                </span>
                <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                  yog'
                </p>
              </div>
            ) : (
              ""
            )}
            {protein ? (
              <div className="w-1/5 flex flex-col justify-center">
                <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                  {protein ? protein : "..."}
                </span>
                <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                  protien
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          {ingredients ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Tarkibi :
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "350px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {ingredients ? ingredients : "..."}{" "}
              </p>
            </>
          ) : (
            <></>
          )}
          {manufacturer ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Ishlab chiqaruvchi :
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "320px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {manufacturer ? manufacturer : "..."}{" "}
              </p>
            </>
          ) : (
            <></>
          )}
          {storageConditions ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Saqlash shartlari :
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "320px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {storageConditions ? storageConditions : "..."}{" "}
              </p>
            </>
          ) : (
            <></>
          )}

          {shelf_life ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Saqlash muddati :
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "320px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {shelf_life ? shelf_life : "..."}{" "}
              </p>
            </>
          ) : (
            <></>
          )}

          {atributInput?.[0].content !== "" ||
          atributInput?.[0].order !== "" ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Mahsulot elementlari :
              </p>
              {atributInput?.map((el) => {
                return (
                  <div
                    key={el.id}
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "baseline",
                    }}
                  >
                    <span style={{ fontWeight: "600", paddingRight: "8px" }}>
                      {el.order}
                    </span>
                    <p className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs">
                      {el.content}
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )}

          {price ? (
            <div className="bg-[#3B82F6] my-2 rounded p-2 text-center text-white ">
              {discount ? (
                <p>
                  {price - prosent(discount)} <del>{price}</del> so'm{" "}
                </p>
              ) : (
                `${price} so'm`
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
