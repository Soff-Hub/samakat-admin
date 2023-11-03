import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const query = useParams();
  const [submiting, setSubmiting] = useState(false);
  const [data, setData] = useState(null);
  const [editData, setEditData] = useState(null);
  const location = useLocation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [badge, setBadge] = React.useState([]);
  const [on_sale, setOn_sale] = React.useState(true);
  const [branch, setBranch] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [content, setContent] = React.useState("");
  const [order, setOrder] = React.useState(0);
  const [carbohydrates, setCarbohydrates] = React.useState(0);
  const [ingredients, setingredients] = React.useState(0);
  const [fats, setFats] = React.useState(0);
  const [kilocalories, setKilocalories] = React.useState(0);
  const [manufacturer, setManufacturer] = React.useState("");
  const [protein, setProtein] = React.useState(0);
  const [storageConditions, setStorageConditions] = React.useState("");
  const [specification, setSpecification] = React.useState("");
  const [shelf_life, setShelf_life] = React.useState("");
  const [branchData, setBranchsData] = React.useState([]);
  const [slug, setSlug] = React.useState(null);
  const [imageOrder, setImageOrder] = React.useState(0);
  const [imageFiles, setImageFiles] = React.useState("");

  const [product_categories, setProduct_categories] = React.useState([]);
  const arr = [];

  const [image, setImage] = useState("");
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
  const [filialArray, setFilialArray] = useState("");
  const [filialInput, setFilialInput] = useState([
    {
      id: 1,
      branch: "",
      quantity: 0,
    },
  ]);
  const [atributArray, setAtributArray] = useState("");
  const [atributInput, setAtributInput] = useState([
    {
      id: 1,
      content:'',
      order: 0
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
    findItem.branch = value?.branch;
    findItem.quantity = value?.quantity;

    setFilialInput([...filialInput]);
    console.log("value", value, filialInput, findItem);
  };
  const addProductHighlightInput = (value, id) => {
    let findItem = atributInput.find((elem) => elem.id == id);
    findItem.content = value?.content;
    findItem.order = value?.order;

    setAtributInput([...atributInput]);
    console.log("value", value, atributInput, findItem);
  };



  const addFormInput = (value, id) => {
    setFilialInput([...filialInput, { id, ...value }]);
  };

  const addAtributInput = async ( value , e) => {
    setAtributInput([...atributInput, { id, ...value }]);
  };

  const ImageDelete = async (e) => {
    setImageData(imageData.filter((item) => item.id !== e));
    imageData.pop();
  };

  const DeleteAtributlItem = async (e) => {
    setAtributInput(atributInput.filter((item) => item.id !== e));
  };

  const deleteID = (i) => {
    setFilialInput(filialInput.filter((item) => item.id !== i));
  }
  const deleteIDHighlight = (i) => {
    setFilialInput(filialInput.filter((item) => item.id !== i));
  }

  const setImageUrl = async (e) => {
    setImage([...image, e]);
    console.log(e);
  };

  const handleSubmitAdd = async (e) => {
    console.log("ishladi");

    e.preventDefault();
    setSubmiting(true);
    // const product_branch = filialInput.map((item) => {
    //   const { id, branch, quantity } = item;
    //   return { branch, quantity };
    // });

    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("product_galereya", image[i]);
    }

    const data = {
      name: name,
      price: price,
      description: description,
      discount: discount,
      badge: badge,
      on_sale: on_sale,
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
      // product_count_branch : product_branch,
      // product_highlight: [
      //   {
      //     content: content,
      //     order: order,
      //   },
      // ],
      product_categories: product_categories,
    };

    console.log("data", data);

    await Client.post(API_ENDPOINTS.CREATE_PRODUCT, data)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli qo'shildi");
        console.log("respons", data);
        setSlug(data?.slug);
        setTimeout(() => {
          // navigate("/products");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });

    slug &&
      Client.patch(`${API_ENDPOINTS.PATCH_PRODUCT}${slug}/`, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
        
        setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const getCategory = async (e) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES}?type=${e}`)
      .then((resp) => {
        // setFormVal(resp);
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
        setBranchsData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getItem = async () => {
    await Client.get(
      API_ENDPOINTS.DETAIL_RECIPE + location.search.split("?")[2]
    )
      .then((res) => {
        console.log(res);
        setEditData(res);
        setName(res?.title);
        setDescription(res?.description);
        // setCategory(res.category);
        // setChecked(res?.is_active);
        setImageData(res?.recipe_gallery);
        // setRelatedCategory(res?.related_categories);
      })
      .catch((err) => {
        // console.log(res);
      });
  };

  useEffect(() => {
    // getRecipeData()
    getBranchData();
    getBadgeData();
    if (location.search.split("?")[1] == "edit") {
      getItem();
    }
    if (location.search.split("?")[1] == "bistro") {
      getCategory("bistro");
    } else if (location.search.split("?")[1] == "byuti") {
      getCategory("byuti");
    }
  }, []);

  return location.search.split("?")[1] == "edit" ? (
    editData ? (
      <></>
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
                Belgi
              </InputLabel>
              <Select value={badge} label="Kategoriya" required onChange={handleChange}>
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
                            {/* <TextField
                              label="Tartib raqam"
                              variant="outlined"
                              size="small"
                              style={{
                                height: "10px",
                                marginBottom: "40px",
                                marginTop: "15px",
                                width: "170px",
                              }}
                              type="number"
                              value={imageOrder}
                              onChange={(e) => {
                                setImageOrder(e.target.value);
                              }}
                            /> */}
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
                      {/* <span>Tarkibi</span> */}
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
                    key={i}
                    addFilialInput={addProductHighlightInput}
                    id={i + 1}
                    deleteID={deleteIDHighlight}
                    />
                    // <div
                    //   key={i}
                    //   className="flex gap-5 p-3"
                    //   style={{ width: "570px", backgroundColor: "#ccc" }}
                    // >
                    //   <div className="mx-1">
                    //     <TextField
                    //       label="Asosiy element"
                    //       variant="outlined"
                    //       size="small"
                    //       style={{ marginTop: "10px" }}
                    //       type="text"
                    //       // required
                    //       value={content}
                    //       onChange={(e) => {
                    //         setContent(e.target.value);
                    //       }}
                    //     />
                    //   </div>
                    //   <div className="mx-1">
                    //     <TextField
                    //       label="Tartib raqam"
                    //       variant="outlined"
                    //       size="small"
                    //       style={{ marginTop: "10px" }}
                    //       type="number"
                    //       value={order}
                    //       onChange={(e) => {
                    //         setOrder(e.target.value);
                    //       }}
                    //     />
                    //   </div>
                    //   <div
                    //     style={{
                    //       display: "flex",
                    //       justifyItems: "end",
                    //       alignItems: "center",
                    //     }}
                    //   >
                    //     <button onClick={() => DeleteAtributlItem(i + 1)}>
                    //       <i class="fa-solid fa-trash"></i>
                    //     </button>
                    //   </div>
                    // </div>
                  ))}

                  <div
                    onClick={() =>
                       addAtributInput(
                        { branch: 0, quantity: 0 },
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
                    {" "}
                    <p>
                      {" "}
                      <i class="fa-solid fa-circle-plus"></i> qo'shish{" "}
                    </p>{" "}
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
              {submiting ? "Qo'shilmoqda" : "Qo'shish"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
