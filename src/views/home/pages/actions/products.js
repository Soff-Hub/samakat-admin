import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, Space } from "antd";
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
  const [submiting, setSubmiting] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const [editData, setEditData] = useState(null);
  const location = useLocation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [badge, setBadge] = React.useState([]);
  const [on_sale, setOn_sale] = React.useState(null);
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
  const [changeBranch, setChangeBranch] = useState(false);
  const [changeBranchCount, setChangeBranchCunt] = useState(false);
  const [elements, setElements] = useState("");
  const [editedCategory, setEditedCtegory] = useState("");
  const [LiveImageArr, setLiveImageArr] = useState([]);
  const [formattedPrice, setFormattedPrice] = useState("");
  const [imageData, setImageData] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ]);
  const [filialInput, setFilialInput] = useState([
    {
      id: 1,
      branch: 0,
      quantity: 1,
    },
  ]);
  const [atributInput, setAtributInput] = useState([
    {
      id: 1,
      content: "",
      order: 0,
    },
  ]);
  const navigate = useNavigate();
  const [badgeData, setBadgeData] = useState([]);
  const handleChangeSelect = (value) => {
    setProduct_categories(value);
  };
  const handleChangeActiveShop = (event) => {
    setOn_sale(event.target.checked);
  };

  const handleChange = (event) => {
    setBadge(event);
  };

  const addImageInput = (e) => {
    setImageData([...imageData, { id: e }]);
  };

  const addFilialInput = (value, id) => {
    let findItem = filialInput.find((elem) => elem.id === id);
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
  console.log("atribut input", atributInput);
  const addFormInput = (value, id) => {
    setFilialInput([...filialInput, { id, ...value }]);
  };

  const addAtributInput = async (value, id) => {
    setAtributInput([...atributInput, { id, ...value }]);
  };

  const ImageDelete = async (e) => {
    setImageData(imageData.filter((item) => item.id !== e));
    imageData.pop();
  };

  const deleteID = (i) => {
    setFilialInput(filialInput.filter((item) => item.id !== i));
  };
  const deleteIDHighlight = (i) => {
    setAtributInput(atributInput.filter((item) => item.id !== i));
  };

  const setImageUrl = async (e, id) => {
    setImage([...image, e]);
    for (let i = 0; i < imageData.length; i++) {
      if (imageData[i].id === id) {
        Object.assign(imageData[i], { image: window.URL.createObjectURL(e) });
      }
    }
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

    const data = {
      name: name,
      price: price,
      description: description,
      discount: discount,
      badge: badge?.length > 0 ? badge : "",
      on_sale: on_sale !== null ? on_sale : false,
      product_attribute: {
        carbohydrates: carbohydrates,
        ingredients: ingredients,
        fats: fats,
        kilocalories: kilocalories,
        manufacturer: manufacturer,
        protein: protein,
        storageConditions: storageConditions,
        specification: specification,
        shelf_life: shelf_life,
      },
      product_categories: product_categories,
      type: location.search.split("?")[1],
    };

    if (product_highlight?.[0]?.content !== "") {
      Object.assign(data, { product_highlight: product_highlight });
    }
    if (product_branch?.[0]?.branch !== 0) {
      Object.assign(data, { product_count_branch: product_branch });
    }

    await Client.post(API_ENDPOINTS.CREATE_PRODUCT, data)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli qo'shildi");
        // setTimeout(() => {
        data?.slug &&
          Client.patch(`${API_ENDPOINTS.PATCH_PRODUCT}${data?.slug}/`, formData)
            .then((res) => {
              console.log(res);
              navigate("/products");
            })
            .catch((err) => {
              console.log(err);
            });
        navigate("/products");
        // }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
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

    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("product_galereya", image[i]);
    }

    const EDiteddata = {
      name: name,
      carbohydrates: carbohydrates,
      ingredients: ingredients,
      fats: fats,
      kilocalories: kilocalories,
      manufacturer: manufacturer,
      protein: protein,
      storageConditions: storageConditions,
      specification: specification,
      shelf_life: shelf_life,
      on_sale: on_sale,
      badge: badge,
      discount: discount,
      description: description,
      price: price,
    };

    // if (price !== "") {
    //   const addObj = { price: price };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (description !== "") {
    //   const addObj = { description: description };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (discount !== 0) {
    //   const addObj = { discount: discount };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (badge.length > 0) {
    //   const addObj = { badge: badge };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (on_sale !== null) {
    //   const addObj = { on_sale: on_sale };
    //   Object.assign(EDiteddata, addObj);
    // }
    // atributlar

    // if (carbohydrates !== 0) {
    //   const addObj = { carbohydrates: carbohydrates };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (ingredients !== "") {
    //   const addObj = { ingredients: ingredients };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (fats !== 0) {
    //   const addObj = { fats: fats };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (kilocalories !== 0) {
    //   const addObj = { kilocalories: kilocalories };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (manufacturer !== "") {
    //   const addObj = { manufacturer: manufacturer };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (protein !== 0) {
    //   const addObj = { protein: protein };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (storageConditions !== "") {
    //   const addObj = { storageConditions: storageConditions };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (specification !== "") {
    //   const addObj = { specification: specification };
    //   Object.assign(EDiteddata, addObj);
    // }
    // if (shelf_life !== "") {
    //   const addObj = { shelf_life: shelf_life };
    //   Object.assign(EDiteddata, addObj);
    // }

    // atribut finish

    if (product_branch) {
      const addObj = { product_count_branch: product_branch };
      Object.assign(EDiteddata, addObj);
    }
    if (product_highlight.length > 0) {
      const addObj = { product_highlight: product_highlight };
      Object.assign(EDiteddata, addObj);
    }
    if (product_categories?.[0]?.label) {
      const addObj = {
        product_categories: product_categories?.map((el) => el.value),
      };
      Object.assign(EDiteddata, addObj);
    } else {
      const addObj = { product_categories: product_categories };
      Object.assign(EDiteddata, addObj);
    }

    await Client.patch(
      `${API_ENDPOINTS.PATCH_PRODUCT}${location.search.split("?")[3]}/`,
      EDiteddata
    )
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          data &&
            Client.patch(
              `${API_ENDPOINTS.PATCH_PRODUCT}${location.search.split("?")[3]}/`,
              formData
            )
              .then((res) => {
                toast.success("Mahsulot muvaffaqiyatli saqlandi");
                navigate("/products");
                setSubmiting(false);
              })
              .catch((err) => {
                console.log(err);
                setSubmiting(false);
              });
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    document.querySelector(".create-branch-form").reset();
  };
  console.log("categoriya", product_categories);
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

  const getBadgeData = async () => {
    await Client.get(API_ENDPOINTS.BADGE)
      .then((res) => {
        setBadgeData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
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
        console.log("ress=>", res);
        setEditData(res);
        setImageData(
          res?.product_galereya?.map((el, i) => ({
            image: el.image_url,
            id: i + 1,
          }))
        );
        setAtributInput(
          res?.product_highlight ? res?.product_highlight : atributInput
        );
        setFilialInput(
          res?.product_count_branch ? res?.product_count_branch : filialInput
        );
        setProduct_categories(
          res?.product_categories?.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );
        setName(res?.name);
        setOn_sale(res?.on_sale);
        setBadge(res?.badge);
        setDiscount(res?.discount);
        setDescription(res?.description);
        setPrice(JSON.parse(res?.price));
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
    getBadgeData();
  }, []);

  useEffect(() => {
    if (location.search.split("?")?.[2] === "edit") {
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
    setElements(product_highlight);
  };

  const lifeImagee = (e) => {
    let img = window.URL.createObjectURL(e.target.files[0]);
    LiveImageArr.push(img);
  };

  const prosent = (e) => {
    return (price * discount) / 100;
  };


  const ChangePrice = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    if (inputValue?.length <= 16) {
      for (let i = 0; i < inputValue.length; i++) {
        if (i > 0 && i % 3 === 1) {
          formattedValue += " "; // Raqamlarni probil bilan ajratish
        }
        formattedValue += inputValue[i];
      }
    }

    setPrice(formattedValue);
  };

  return location.search.split("?")?.[2] === "edit" ? (
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
              <TextField
                label="Narxi"
                variant="outlined"
                size="large"
                type="number"
                defaultValue={JSON.parse(editData?.price) || price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
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

              <FormControl sx={{ m: 0, minWidth: 220 }} size="small">
                <Select
                  defaultValue={editData?.badge || badge}
                  label="Belgi"
                  onChange={handleChange}
                >
                  {badgeData?.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                      <p style={{ color: `${item.textColor}` }}> {item.text}</p>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                        {imageData?.map((item, i) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              key={i}
                            >
                              <Button
                                component="label"
                                variant="outlined"
                                style={{
                                  maxWidth: "150px",
                                  width: "150px",
                                  backgroundImage: `url(${
                                    item?.image ? item?.image : ""
                                  })`,
                                  backgroundSize: "cover",
                                  height: "120px",
                                }}
                              >
                                {item?.image ? (
                                  ""
                                ) : (
                                  <i
                                    className="fa-regular fa-image"
                                    style={{ fontSize: "35px" }}
                                  ></i>
                                )}

                                <input
                                  style={{ display: "none" }}
                                  onChange={(e) => (
                                    setImageUrl(e.target.files[0], item.id),
                                    lifeImagee(e)
                                  )}
                                  type="file"
                                />
                              </Button>
                              <Button
                                onClick={() => ImageDelete(item.id)}
                                component="label"
                                color="error"
                                variant="outlined"
                                className="mt-3"
                              >
                                Delete
                              </Button>
                            </div>
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
                          onClick={() => addImageInput(imageData.length + 1)}
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
                        setChangeBranchCunt={setChangeBranchCunt}
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
                  LiveImageArr?.length > 0
                    ? LiveImageArr?.[0]
                    : editData?.product_galereya?.[0]?.image_url
                    ? editData?.product_galereya?.[0]?.image_url
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
              {name ? name : editData?.name }  {" "}
              <span className=" font-bold text-slate-400">
                {specification ? `${specification} gr` : ""}{" "}
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
  ) : (
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
            {/* <input
              type="tel"
              className="form-control rounded-3 "
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              id="ccn"
              autoComplete="cc-number"
              maxLength="19"
              placeholder="xxxx xxxx xxxx xxxx"
              value={formattedCardNumber}
              onChange={handleCardNumberChange}
            /> */}
            <TextField
               autoComplete="cc-number"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              id="ccn"
              label="Narxi"
              variant="outlined"
              size="small"
              type="number"
              maxLength="19"
              defaultValue={price}
              required
              onChange={ChangePrice}
            />
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

            <TextField
              id="outlined-multiline-static"
              label="Izoh"
              required
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

            <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
              <Select
                value={badge}
                placeholder="Belgi"
                required
                onChange={handleChange}
              >
                {badgeData?.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    <p style={{ color: `${item.textColor}` }}> {item.text}</p>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                  <div style={{ display: "flex ", gap: "10px" }}>
                    <div
                      className="flex gap-3 flex-wrap"
                      style={{ minWidth: "392px" }}
                    >
                      {imageData.map((item, i) => {
                        return (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                            key={i}
                          >
                            <Button
                              component="label"
                              variant="outlined"
                              style={{
                                maxWidth: "150px",
                                width: "120px",
                                backgroundImage: `url(${
                                  item?.image ? item?.image : ""
                                })`,
                                backgroundSize: "cover",
                                height: "120px",
                              }}
                            >
                              {item?.image ? (
                                ""
                              ) : (
                                <i
                                  className="fa-regular fa-image"
                                  style={{ fontSize: "35px" }}
                                ></i>
                              )}
                              <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => (
                                  setImageUrl(e.target.files[0], item.id),
                                  lifeImagee(e)
                                )}
                              />
                            </Button>
                            <Button
                              onClick={() => ImageDelete(item.id)}
                              component="label"
                              color="error"
                              variant="outlined"
                              className="mt-3"
                            >
                              Delete
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                      }}
                    >
                      <Fab
                        onClick={() => addImageInput(imageData.length + 1)}
                        color="primary"
                        aria-label="add"
                        size="small"
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
                    setChangeBranchCunt={setChangeBranchCunt}
                    setChangeBranch={setChangeBranch}
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
                    setChangeBranchCunt={setChangeBranchCunt}
                    setChangeBranch={setChangeBranch}
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

              {/* <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <label className="font-normal font-sans text-lg mt-5">
                      Filiallardagi mahsulot :
                    </label>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    className="flex gap-x-44 p-3 mt-3"
                    style={{ backgroundColor: "#cccccc", width: "570px" }}
                  >
                    <p>
                      Filiallar <i className="fa-solid fa-folder-tree"></i>{" "}
                    </p>
                    <p>
                      Soni <i className="fa-solid fa-arrow-down-9-1"></i>{" "}
                    </p>
                  </div>
                  {filialInput?.map((item, i) => (
                    <AddInput
                      selectData={branchData}
                      key={i}
                      addFilialInput={addFilialInput}
                      id={i + 1}
                      deleteID={deleteID}
                      setChangeBranchCunt={setChangeBranchCunt}
                      setChangeBranch={setChangeBranch}
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
                </AccordionDetails>
              </Accordion> */}
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
                LiveImageArr?.length > 0
                  ? LiveImageArr?.[0]
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
            {name ? name : "Mahsulot nomi"  + " " }{ + " "}
           
            <span className=" font-bold text-slate-400 ml-2">
              {specification ? `${specification} gr` : ""}{" "}
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
