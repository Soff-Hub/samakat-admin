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

export default function Retsepts() {
  const query = useParams();
  const [submiting, setSubmiting] = useState(false);
  const [category, setCategory] = React.useState("");
  const [image, setImage] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const [relatedCategory, setRelatedCategory] = React.useState([]);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [editData, setEditData] = useState(null);
  const location = useLocation();
  const [optionChecked, setOptionChecked] = useState(false)
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

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setRelatedCategory(value);
    console.log("=>", value);
  };
  const handleChangeActive = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
    setOptionChecked(true)
  };

  const addImageInput = async (e) => {
    setImageData([...imageData, { id: e }]);
  };

  const ImageDelete = async (e) => {
    setImageData(imageData.filter((item) => item.id !== e));
    imageData.pop();
  };

  const setImageUrl = async (e) => {
    setImage([...image, {"image": e}]);
    console.log(e);
  };

  const handleSubmitAddRecipe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("is_active", checked);
    formData.append("related_categories", relatedCategory);
    for (let i = 0; i < image.length; i++) {
      formData.append("uploaded_images", image[i].image);
    }

    setSubmiting(true);

    await Client.post(API_ENDPOINTS.CAREATE_RECIPE, formData)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli qo'shildi");
        setTimeout(() => {
          navigate("/retsepts");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const handleEditItemRecipe = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("is_active", checked);
    formData.append("related_categories", relatedCategory);
    for (let i = 0; i < image.length; i++) {
      formData.append("uploaded_images", image[i].image);
    }
    setSubmiting(true);
    await Client.put(`${API_ENDPOINTS.UPDATE_RECIPE}${location.search.split("?")[2]}/`, formData)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli tahrirlandi");
        setTimeout(() => {
          navigate("/retsepts");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });
    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const getCategory = async (e) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES}?type=${e}`)
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  // const setImageF = (arr) => {
  //   for (let value of arr) {
  //     setImage([...image, {"image": getBase64Image(value) }]);
  //   }
  // }

  const getItem = async () => {
    await Client.get(
      API_ENDPOINTS.DETAIL_RECIPE + location.search.split("?")[2]
    )
      .then((res) => {
        console.log(res);
        if (res?.type == "bistro") {
          getCategory("bistro");
        } else if ( res?.type == "byuti") {
          getCategory("byuti");
        }
        setEditData(res);
        setName(res?.title);
        setDescription(res?.description);
        setCategory("salom");
        setChecked(res?.is_active);
        setImageData(res?.recipe_gallery);
        setImage(res?.recipe_gallery);
        setImage(res?.recipe_gallery);

        setRelatedCategory(res?.related_categories);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("category", imageData);
  };

  useEffect(() => {
    if (location.search.split("?")[1] == "edit") {
      getItem();
    }
    if (location.search.split("?")[1] == "bistro") {
      getCategory("bistro");
    } else if (location.search.split("?")[1] == "byuti") {
      getCategory("byuti");
    }
  }, []);

  console.log("=>", image, imageData);
  return location.search.split("?")[1] == "edit" ? (
    editData ? (
      <div>
        <div>
          <h1 className="text-[35px] pb-3">Retsept tahrirlash</h1>
          <Toaster />
          <div className="flex gap-5">
            <form
              onSubmit={handleEditItemRecipe}
              className="w-1/3 flex flex-col gap-5 create-branch-form"
            >
              <TextField
                label="Nomi"
                variant="outlined"
                size="large"
                style={{ width: "600px" }}
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                id="outlined-multiline-static"
                label="Izoh"
                multiline
                required
                value={description}
                rows={4}
                style={{ width: "600px" }}
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <FormControl
                style={{ width: "600px" }}
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel
                  id="demo-select-small-label"
                  placholder="Kategoriya"
                >
                  Kategoriya
                </InputLabel>
                <Select
                  selected
                  required
                  value={category}
                  label="Kategoriya"
                  onChange={handleChange}
                >
                  {
                 data?.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.name}
                  </MenuItem>
                )) 
                  }
                </Select>
              </FormControl>
              <label className="text-lg  max-w-prose">
                Galleriya uchun rasmlar 
              </label>
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Fab
                    onClick={() => addImageInput(imageData.length + 1)}
                    color="primary"
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                </div>
              </div>
              <div>
                <label className="font-normal font-sans text-lg">Aktiv</label>
                <Switch
                  checked={checked}
                  onChange={handleChangeActive}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div>
                <FormControl sx={{ m: 1, width: 600 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Bog'liq kategoriyalar
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    required
                    value={relatedCategory}
                    onChange={handleChangeSelect}
                    input={<OutlinedInput label="Bog'liq kategoriyalar" />}
                    MenuProps={MenuProps}
                  >
                    {data?.map((name) => (
                      <MenuItem key={name} value={name.id}>
                        <Checkbox
                          checked={relatedCategory.indexOf(name.id) > -1}
                        />
                        <ListItemText primary={name.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
      </div>
    ) : (
      <></>
    )
  ) : (
    <div>
      <div>
        <h1 className="text-[35px] pb-3">Retsept qo'shish</h1>
        <Toaster />
        <div className="flex gap-5">
          <form
            onSubmit={handleSubmitAddRecipe}
            className="w-1/3 flex flex-col gap-5 create-branch-form"
          >
            <TextField
              label="Nomi"
              variant="outlined"
              size="large"
              style={{ width: "600px" }}
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Izoh"
              multiline
              required
              value={description}
              rows={4}
              style={{ width: "600px" }}
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <FormControl
              style={{ width: "600px" }}
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label" placholder="Kategoriya">
                Kategoriya *
              </InputLabel>
              <Select
                required
                value={category}
                label="Kategoriya"
                onChange={handleChange}
              >
                {data?.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <label className="text-lg  max-w-prose">
              Galleriya uchun rasmlar *
            </label>
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <Fab
                  onClick={() => addImageInput(imageData.length + 1)}
                  color="primary"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
            <div>
              <label className="font-normal font-sans text-lg">Aktiv</label>
              <Switch
                checked={checked}
                onChange={handleChangeActive}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            <div>
              <FormControl sx={{ m: 1, width: 600 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Bog'liq kategoriyalar
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  required
                  value={relatedCategory}
                  onChange={handleChangeSelect}
                  input={<OutlinedInput label="Bog'liq kategoriyalar" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {data?.map((name) => (
                    <MenuItem key={name} value={name.id}>
                      <Checkbox
                        checked={relatedCategory.indexOf(name.id) > -1}
                      />
                      <ListItemText primary={name.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
