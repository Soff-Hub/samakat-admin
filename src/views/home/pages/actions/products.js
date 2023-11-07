import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 700,
    },
  },
};

export default function Products() {
  const [submiting, setSubmiting] = useState(false);
  const [data, setData] = useState(null);
  const [editData, setEditData] = useState(null);
  const location = useLocation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [badge, setBadge] = React.useState([]);
  const [on_sale, setOn_sale] = React.useState(null);
  const [carbohydrates, setCarbohydrates] = React.useState(0);
  const [ingredients, setingredients] = React.useState(0);
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
      quantity: 0,
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
  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setProduct_categories(value);
  };
  const handleChangeActiveShop = (event) => {
    setOn_sale(event.target.checked);
  };

  const handleChange = (event) => {
    setBadge(event.target.value);
  };

  const addImageInput = (e) => {
    setImageData([...imageData, { id: e }]);
  };

  const addFilialInput = (value, id) => {
    let findItem = filialInput.find((elem) => elem.id == id);
    findItem.branch = Number(value?.branch);
    findItem.quantity = value?.quantity;

    setFilialInput([...filialInput]);
  };

  const addProductHighlightInput = (value, id) => {
    let findItem = atributInput.find((elem) => elem.id == id);
    findItem.content = value?.content;
    findItem.order = value?.order;

    setAtributInput([...atributInput]);
  };

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
    setFilialInput(atributInput.filter((item) => item.id !== i));
  };

  const setImageUrl = async (e) => {
    setImage([...image, e]);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const product_branch = filialInput?.map((item) => {
      const { id, branch, quantity } = item;
      return { branch, quantity };
    });
    const product_highlight = atributInput?.map((item) => {
      const { id, content, order } = item;
      return { content, order };
    });

    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("product_galereya", image[i]);
    }

    if (changeBranch === true && changeBranchCount === true) {
    }

    const data = {
      name: name,
      price: price,
      description: description,
      discount: discount,
      badge: badge,
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
      product_count_branch: product_branch,
      product_highlight: product_highlight,
      product_categories: product_categories,
    };

    console.log("hhhhhhhh", product_branch, product_highlight);

    await Client.post(API_ENDPOINTS.CREATE_PRODUCT, data)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli qo'shildi");
        console.log(data);
        setTimeout(() => {
          data?.slug &&
            Client.patch(
              `${API_ENDPOINTS.PATCH_PRODUCT}${data?.slug}/`,
              formData
            )
              .then((res) => {
                console.log(res);
                navigate("/products");
              })
              .catch((err) => {
                console.log(err);
              });
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const product_branch = filialInput?.map((item) => {
      const { id, branch, quantity } = item;
      return { branch, quantity };
    });
    const product_highlight = atributInput?.map((item) => {
      const { id, content, order } = item;
      return { content, order };
    });

    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("product_galereya", image[i]);
    }

    const EDiteddata = {};
    if (name !== "") {
      const addObj = { name: name };
      Object.assign(EDiteddata, addObj);
    }
    if (price !== "") {
      const addObj = { price: price };
      Object.assign(EDiteddata, addObj);
    }
    if (description !== "") {
      const addObj = { description: description };
      Object.assign(EDiteddata, addObj);
    }
    if (discount !== 0) {
      const addObj = { discount: discount };
      Object.assign(EDiteddata, addObj);
    }
    if (badge.length > 0) {
      const addObj = { badge: badge };
      Object.assign(EDiteddata, addObj);
    }
    if (on_sale !== null) {
      const addObj = { on_sale: on_sale };
      Object.assign(EDiteddata, addObj);
    }
    if (carbohydrates !== 0) {
      const addObj = { carbohydrates: carbohydrates };
      Object.assign(EDiteddata, addObj);
    }
    if (ingredients !== 0) {
      const addObj = { ingredients: ingredients };
      Object.assign(EDiteddata, addObj);
    }
    if (fats !== 0) {
      const addObj = { fats: fats };
      Object.assign(EDiteddata, addObj);
    }
    if (kilocalories !== 0) {
      const addObj = { kilocalories: kilocalories };
      Object.assign(EDiteddata, addObj);
    }
    if (manufacturer !== "") {
      const addObj = { manufacturer: manufacturer };
      Object.assign(EDiteddata, addObj);
    }
    if (protein !== 0) {
      const addObj = { protein: protein };
      Object.assign(EDiteddata, addObj);
    }
    if (storageConditions !== "") {
      const addObj = { storageConditions: storageConditions };
      Object.assign(EDiteddata, addObj);
    }
    if (specification !== "") {
      const addObj = { specification: specification };
      Object.assign(EDiteddata, addObj);
    }
    if (shelf_life !== "") {
      const addObj = { shelf_life: shelf_life };
      Object.assign(EDiteddata, addObj);
    }
    if (product_branch) {
      const addObj = { product_count_branch: product_branch };
      Object.assign(EDiteddata, addObj);
    }
    if (product_highlight.length > 0) {
      const addObj = { product_highlight: product_highlight };
      Object.assign(EDiteddata, addObj);
    }
    if (product_categories.length > 0) {
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
                toast.success("Retsep muvaffaqiyatli saqlandi");
                navigate("/products");
                setSubmiting(false);
              })
              .catch((err) => {
                console.log(err);
              });
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });

    document.querySelector(".create-branch-form").reset();
  };

  const getCategory = async (e) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES}?type=${e}`)
      .then((resp) => {
        setData(resp.results);
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
        console.log("branch", res);

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
        setImageData(res?.recipe_gallery ? res?.recipe_gallery : imageData);
        setAtributInput(
          res?.product_highlight ? res?.product_highlight : atributInput
        );
        setFilialInput(
          res?.product_count_branch ? res?.product_count_branch : filialInput
        );
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
    if (location.search.split("?")?.[2] == "edit") {
      getItem();
    }
    if (location.search.split("?")[1] == "bistro") {
      getCategory("bistro");
    } else if (location.search.split("?")[1] == "byuti") {
      getCategory("byuti");
    }
  }, []);
  console.log("jhdfgjshgdfjhdgu", changeBranch, changeBranchCount);

  return location.search.split("?")?.[2] == "edit" ? (
    editData ? (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] pb-3">Mahsulotni tahrirlash</h1>
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
        <Toaster />
        <div className="flex gap-5">
          <form
            onSubmit={handleSubmitEdit}
            className="w-1/3 flex flex-col gap-5 create-branch-form"
          >
            <TextField
              label="Nomi"
              variant="outlined"
              size="large"
              style={{ width: "600px" }}
              type="text"
              defaultValue={editData?.name || name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              label="Narxi"
              variant="outlined"
              size="large"
              style={{ width: "600px" }}
              type="number"
              value={editData?.price || price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Izoh"
              multiline
              value={editData?.description || description}
              rows={4}
              style={{ width: "600px" }}
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              label="Chegirmasi"
              variant="outlined"
              size="large"
              style={{ width: "600px" }}
              type="number"
              value={editData?.discount || discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
            />
            <FormControl
              style={{ width: "600px" }}
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label" placholder="Belgi">
                Belgi
              </InputLabel>
              <Select
                value={editData?.badge || badge}
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
            <div>
              <FormControl sx={{ m: 1, width: 600 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Bog'liq kategoriyalar
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={product_categories}
                  onChange={handleChangeSelect}
                  input={<OutlinedInput label="Bog'liq kategoriyalar" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {data?.map((name) => (
                    <MenuItem key={name} value={name.id}>
                      <Checkbox
                        checked={product_categories.indexOf(name.id) > -1}
                        defaultChecked={product_categories.indexOf(name.id)}
                      />
                      <ListItemText primary={name.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
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
              <Accordion style={{ width: "600px" }}>
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
                      style={{ minWidth: "560px" }}
                    >
                      {imageData?.map((item, i) => {
                        return (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                            key={i}
                          >
                            <Button
                              style={{ width: "170px", height: "170px" }}
                              component="label"
                              variant="outlined"
                            >
                              <i
                                class="fa-regular fa-image"
                                style={{ fontSize: "35px" }}
                              ></i>
                              <input
                                style={{ display: "none" }}
                                onChange={(e) => setImageUrl(e.target.files[0])}
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

              <Accordion style={{ width: "600px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <label className="font-normal font-sans text-lg">
                      Mahsulot atributi :
                    </label>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{ width: "600px", height: "400px" }}
                    className="flex overflow-y-scroll border-5 flex-col"
                  >
                    <div className=" mx-3 mt-3 mb-1 flex items-baseline gap-3">
                      <i class="fa-solid fa-flask"></i>
                      <TextField
                        label="Tarkibi"
                        variant="outlined"
                        multiline
                        maxRows={4}
                        value={
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
                      <i class="fa-solid fa-virus-covid"></i>
                      <TextField
                        label="Uglevod"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="number"
                        value={
                          editData?.product_attribute?.carbohydrates ||
                          carbohydrates
                        }
                        onChange={(e) => {
                          setCarbohydrates(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-vial-virus"></i>
                      <TextField
                        label="Kaloriya"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="number"
                        value={
                          editData?.product_attribute?.kilocalories ||
                          kilocalories
                        }
                        onChange={(e) => {
                          setKilocalories(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-mortar-pestle"></i>
                      <TextField
                        label="Yog' miqdori"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="number"
                        value={editData?.product_attribute?.fats || fats}
                        onChange={(e) => {
                          setFats(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-bandage"></i>
                      <TextField
                        label="Protien"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="number"
                        value={editData?.product_attribute?.protein || protein}
                        onChange={(e) => {
                          setProtein(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-hotel"></i>
                      <TextField
                        label="Ishlab chiqaruvchi"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="text"
                        value={
                          editData?.product_attribute?.manufacturer ||
                          manufacturer
                        }
                        onChange={(e) => {
                          setManufacturer(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-list-ul"></i>
                      <TextField
                        label="Saqlash shartlari"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="text"
                        value={
                          editData?.product_attribute?.storageConditions ||
                          storageConditions
                        }
                        onChange={(e) => {
                          setStorageConditions(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-film"></i>
                      <TextField
                        label="Mahsulot soni yoki hajmi"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="text"
                        value={
                          editData?.product_attribute?.specification ||
                          specification
                        }
                        onChange={(e) => {
                          setSpecification(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-tower-broadcast"></i>
                      <TextField
                        label="Saqlash muddati"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="text"
                        value={
                          editData?.product_attribute?.shelf_life || shelf_life
                        }
                        onChange={(e) => {
                          setShelf_life(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion style={{ width: "600px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <label className="font-normal font-sans text-lg mt-5">
                      Mahsulot asosiy elementlari :
                    </label>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    className="flex gap-x-44 p-3 mt-3"
                    style={{ backgroundColor: "#cccccc", width: "570px" }}
                  >
                    <p>
                      Asosiy element <i class="fa-regular fa-star"></i>
                    </p>
                    <p>
                      Tartib raqami <i class="fa-solid fa-arrow-down-9-1"></i>
                    </p>
                  </div>

                  {atributInput?.map((item, i) => (
                    <AddInput
                      dataH={item}
                      key={i}
                      addFilialInput={addProductHighlightInput}
                      id={i + 1}
                      deleteIDHighlight={deleteIDHighlight}
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
                      <i class="fa-solid fa-circle-plus"></i> qo'shish
                    </p>{" "}
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion style={{ width: "600px" }}>
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
                      Filiallar <i class="fa-solid fa-folder-tree"></i>{" "}
                    </p>
                    <p>
                      Soni <i class="fa-solid fa-arrow-down-9-1"></i>{" "}
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
                      <i class="fa-solid fa-circle-plus"></i> qo'shish
                    </p>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>

            <Button
              style={{ width: "600px" }}
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
    ) : (
      <></>
    )
  ) : (
    <div>
      <div>
        <h1 className="text-[35px] pb-3">Mahsulot qo'shish</h1>
        <Toaster />
        <div className="flex gap-5">
          <form
            onSubmit={handleSubmitAdd}
            className="w-1/3 flex flex-col gap-5 create-branch-form"
          >
            <TextField
              label="Nomi"
              variant="outlined"
              size="large"
              style={{ width: "600px" }}
              type="text"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              label="Narxi"
              variant="outlined"
              size="large"
              style={{ width: "600px" }}
              type="number"
              value={price}
              required
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Izoh"
              required
              multiline
              value={description}
              rows={4}
              style={{ width: "600px" }}
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              label="Chegirmasi"
              variant="outlined"
              size="large"
              style={{ width: "600px" }}
              type="number"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
            />
            <FormControl
              style={{ width: "600px" }}
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label" placholder="Kategoriya">
                Belgi *
              </InputLabel>
              <Select
                value={badge}
                label="Kategoriya"
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
              <FormControl sx={{ m: 1, width: 600 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Bog'liq kategoriyalar
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={product_categories}
                  onChange={handleChangeSelect}
                  input={<OutlinedInput label="Bog'liq kategoriyalar" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {data?.map((name) => (
                    <MenuItem key={name} value={name.id}>
                      <Checkbox
                        checked={product_categories?.indexOf(name.id) > -1}
                      />
                      <ListItemText primary={name.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <label className="font-normal font-sans text-lg">Sotuvda</label>
              <Switch
                checked={on_sale}
                onChange={handleChangeActiveShop}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            <div>
              <Accordion style={{ width: "600px" }}>
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
                      style={{ minWidth: "560px" }}
                    >
                      {imageData.map((item, i) => {
                        return (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                            key={i}
                          >
                            <Button
                              style={{ width: "170px", height: "170px" }}
                              component="label"
                              variant="outlined"
                            >
                              <i
                                class="fa-regular fa-image"
                                style={{ fontSize: "35px" }}
                              ></i>
                              <input
                                style={{ display: "none" }}
                                onChange={(e) => setImageUrl(e.target.files[0])}
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

              <div
                style={{ border: "1px solid #ccc", minWidth: "590px" }}
                className="p-2 my-6"
              >
                <h2 className="text-[18px] pl-3.5 font-normal">
                  Mahsulot atributi :{" "}
                </h2>
                <hr />
                <div
                  style={{ width: "600px", height: "400px" }}
                  className="flex overflow-y-scroll border-5 flex-col"
                >
                  <div className=" mx-3 mt-3 mb-1 flex items-baseline gap-3">
                    <i class="fa-solid fa-flask"></i>
                    <TextField
                      label="Tarkibi"
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
                    <i class="fa-solid fa-virus-covid"></i>
                    <TextField
                      label="Uglevod"
                      variant="outlined"
                      size="small"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="number"
                      value={carbohydrates}
                      onChange={(e) => {
                        setCarbohydrates(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i class="fa-solid fa-vial-virus"></i>
                    <TextField
                      label="Kaloriya"
                      variant="outlined"
                      size="small"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="number"
                      value={kilocalories}
                      onChange={(e) => {
                        setKilocalories(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i class="fa-solid fa-mortar-pestle"></i>
                    <TextField
                      label="Yog' miqdori"
                      variant="outlined"
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
                    <i class="fa-solid fa-bandage"></i>
                    <TextField
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
                    <i class="fa-solid fa-hotel"></i>
                    <TextField
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
                    <i class="fa-solid fa-list-ul"></i>
                    <TextField
                      label="Saqlash shartlari"
                      variant="outlined"
                      size="small"
                      style={{ height: "10px", marginTop: "30px" }}
                      type="text"
                      required
                      value={storageConditions}
                      onChange={(e) => {
                        setStorageConditions(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-3 flex items-baseline gap-3">
                    <i class="fa-solid fa-film"></i>
                    <TextField
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
                    <i class="fa-solid fa-tower-broadcast"></i>
                    <TextField
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
                </div>
              </div>

              {/* <Accordion style={{ width: "600px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <label className="font-normal font-sans text-lg">
                      Mahsulot atributi :
                    </label>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{ width: "600px", height: "400px" }}
                    className="flex overflow-y-scroll border-5 flex-col"
                  >
                    <div className=" mx-3 mt-3 mb-1 flex items-baseline gap-3">
                      <i class="fa-solid fa-flask"></i>
                      <TextField
                        label="Tarkibi"
                        variant="outlined"
                        multiline
                        maxRows={4}
                        
                        value={ingredients}
                        style={{ marginTop: "30px" }}
                        onChange={(e) => {
                          setingredients(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-virus-covid"></i>
                      <TextField
                        label="Uglevod"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="number"
                        value={carbohydrates}
                        onChange={(e) => {
                          setCarbohydrates(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-vial-virus"></i>
                      <TextField
                        label="Kaloriya"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="number"
                        value={kilocalories}
                        onChange={(e) => {
                          setKilocalories(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-mortar-pestle"></i>
                      <TextField
                        label="Yog' miqdori"
                        variant="outlined"
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
                      <i class="fa-solid fa-bandage"></i>
                      <TextField
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
                      <i class="fa-solid fa-hotel"></i>
                      <TextField
                        label="Ishlab chiqaruvchi"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="text"
                        
                        value={manufacturer}
                        onChange={(e) => {
                          setManufacturer(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-list-ul"></i>
                      <TextField
                        label="Saqlash shartlari"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="text"
                        
                        value={storageConditions}
                        onChange={(e) => {
                          setStorageConditions(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-film"></i>
                      <TextField
                        label="Mahsulot soni yoki hajmi"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="text"
                        
                        value={specification}
                        onChange={(e) => {
                          setSpecification(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mx-3 flex items-baseline gap-3">
                      <i class="fa-solid fa-tower-broadcast"></i>
                      <TextField
                        label="Saqlash muddati"
                        variant="outlined"
                        size="small"
                        style={{ height: "10px", marginTop: "30px" }}
                        type="text"
                        
                        value={shelf_life}
                        onChange={(e) => {
                          setShelf_life(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion> */}

              <div
                style={{ border: "1px solid #ccc", minWidth: "590px" }}
                className="p-2 my-4"
              >
                <h2 className="text-[18px] pl-3.5 font-normal">
                  Mahsulot asosiy elementlari :{" "}
                </h2>
                <hr />
                <div
                  className="flex gap-x-44 p-3 mt-3"
                  style={{ backgroundColor: "#cccccc", width: "570px" }}
                >
                  <p>
                    Asosiy element <i class="fa-regular fa-star"></i>
                  </p>
                  <p>
                    Tartib raqami <i class="fa-solid fa-arrow-down-9-1"></i>
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
                    <i class="fa-solid fa-circle-plus"></i> qo'shish
                  </p>{" "}
                </div>
              </div>

              {/* <Accordion style={{ width: "600px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <label className="font-normal font-sans text-lg mt-5">
                      Mahsulot asosiy elementlari :
                    </label>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    className="flex gap-x-44 p-3 mt-3"
                    style={{ backgroundColor: "#cccccc", width: "570px" }}
                  >
                    <p>
                      Asosiy element <i class="fa-regular fa-star"></i>
                    </p>
                    <p>
                      Tartib raqami <i class="fa-solid fa-arrow-down-9-1"></i>
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
                      <i class="fa-solid fa-circle-plus"></i> qo'shish
                    </p>{" "}
                  </div>
                </AccordionDetails>
              </Accordion> */}

              <div
                style={{ border: "1px solid #ccc", minWidth: "590px" }}
                className="p-2 my-4"
              >
                <h2 className="text-[18px] pl-3.5 font-normal">
                  Filiallardagi mahsulot :{" "}
                </h2>
                <hr />
                <div
                  className="flex gap-x-44 p-3 mt-3"
                  style={{ backgroundColor: "#cccccc", width: "570px" }}
                >
                  <p>
                    Filiallar <i class="fa-solid fa-folder-tree"></i>{" "}
                  </p>
                  <p>
                    Soni <i class="fa-solid fa-arrow-down-9-1"></i>{" "}
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
                    <i class="fa-solid fa-circle-plus"></i> qo'shish{" "}
                  </p>
                </div>
              </div>

              {/* <Accordion style={{ width: "600px" }}>
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
                      Filiallar <i class="fa-solid fa-folder-tree"></i>{" "}
                    </p>
                    <p>
                      Soni <i class="fa-solid fa-arrow-down-9-1"></i>{" "}
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
                      <i class="fa-solid fa-circle-plus"></i> qo'shish{" "}
                    </p>
                  </div>
                </AccordionDetails>
              </Accordion> */}
            </div>

            <Button
              style={{ width: "600px" }}
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
    </div>
  );
}
