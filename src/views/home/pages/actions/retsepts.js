import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Select, Space } from "antd";
export default function Retsepts() {
  const [submiting, setSubmiting] = useState(false);
  const [category, setCategory] = React.useState("");
  const [image, setImage] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const [relatedCategory, setRelatedCategory] = React.useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [editData, setEditData] = useState(null);
  const location = useLocation();
  const [categoryData, setCategoryData] = useState([]);
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
  const [errorCategory, setErrorCategory] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [selectImage, setSelectImage] = useState("");

  const handleChangeRelatedCategory = (event) => {
    setRelatedCategory(event);
    console.log(event);
    
  };
  const handleChangeActive = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    setCategory(event);
    setErrorCategory(false);
  };

  const addImageInput = async (e) => {
    setImageData([...imageData, { id: e }]);
  };

  const ImageDelete = async (e) => {
    setImageData(imageData.filter((item) => item.id !== e));
    imageData.pop();
  };

  const setImageUrl = async (e, id) => {
    setSelectImage(e);
    setImage([...image, e]);
    for (let i = 0; i < imageData.length; i++) {
      if (imageData[i].id === id) {
        Object.assign(imageData[i], { image: window.URL.createObjectURL(e) });
      }
    }
  };

  const handleSubmitAddRecipe = async (e) => {
    e.preventDefault();
    if (category !== "" && selectImage !== "") {
      if (category !== "") {
        setErrorCategory(false);
      } else if (selectImage !== "") {
        setErrorImage(false);
      }
      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("is_active", checked);
      if (relatedCategory) {
        formData.append("related_categories", relatedCategory);
      }
      for (let i = 0; i < image.length; i++) {
        formData.append("uploaded_images", image[i]);
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
    } else {
      if (category === "") {
        setErrorCategory(true);
      }
      if (selectImage !== "") {
        setErrorImage(true);
      }
    }
  };

  const handleEditItemRecipe = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("is_active", checked);
    if (relatedCategory?.length > 0) {
      formData.append("related_categories", relatedCategory);
    }
    for (let i = 0; i < image?.length; i++) {
      formData.append("uploaded_images", image[i]);
    }
    setSubmiting(true);
    await Client.patch(
      `${API_ENDPOINTS.UPDATE_RECIPE}${location.search.split("?")[2]}/`,
      formData
    )
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
    await Client.get(`${API_ENDPOINTS.CATEGORIES_CHAILD}?type=${e}`)
      .then((resp) => {
        // setData(resp.results);
        setCategoryData(
          resp.results?.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  const getItem = async () => {
    await Client.get(
      API_ENDPOINTS.DETAIL_RECIPE + location.search.split("?")[2]
    )
      .then((res) => {
        console.log(res);
        if (res?.type === "bistro") {
          getCategory("bistro");
        } else if (res?.type === "byuti") {
          getCategory("byuti");
        }
        setEditData(res);
        setName(res?.title);
        setDescription(res?.description);
        setCategory(res?.category);
        setChecked(res?.is_active);
        setImageData(res?.recipe_gallery);

        setRelatedCategory(res?.related_categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (location.search.split("?")[1] === "edit") {
      getItem();
    }
    if (location.search.split("?")[1] === "bistro") {
      getCategory("bistro");
    } else if (location.search.split("?")[1] === "byuti") {
      getCategory("byuti");
    }
    // eslint-disable-next-line
  }, []);

  return location.search.split("?")[1] === "edit" ? (
    editData ? (
      <div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] pb-3">Retsiptni tahrirlash</h1>
            <Link to="/retsepts">
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
          <div>
            <form
              onSubmit={handleEditItemRecipe}
              className="w-1/2 m-auto flex flex-col gap-5 create-branch-form"
            >
              <TextField
                label="Nomi"
                variant="outlined"
                size="large"
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
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <div align="left">
                <label className="font-normal font-sans text-xl mr-auto">
                  Kategoriyalar
                </label>
                <Select
                  mode="select"
                  placeholder="Kategoriya *"
                  showSearch
                  allowClear
                  required
                  defaultValue={category}
                  style={{
                    width: "100%",
                    height: "47px",
                    marginLeft: "auto",
                  }}
                  onChange={handleChange}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  className={`${
                    errorCategory ? "rounded-md border border-rose-500" : ""
                  }`}
                  options={categoryData}
                />
              </div>

              <Space
                style={{
                  width: "100%",
                  textAlign: "left",
                }}
                direction="vertical"
              >
                <label className="font-normal font-sans text-lg mr-auto">
                  Bog'liq kategoriyalar
                </label>
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
                  onChange={handleChangeRelatedCategory}
                  options={categoryData}
                  defaultValue={relatedCategory}
                />
              </Space>

              <label className="font-normal font-sans text-lg mr-auto">
                Galleriya uchun rasmlar
              </label>
              <div style={{ display: "flex ", gap: "10px" }}>
                <div
                  className="flex gap-3 flex-wrap"
                  style={{ minWidth: "490px" }}
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
                            onChange={(e) => setImageUrl(e.target.files[0], item.id, e)}
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
                <label className="font-normal font-sans text-lg mr-auto">
                  Aktiv
                </label>
                <Switch
                  checked={checked}
                  onChange={handleChangeActive}
                  inputProps={{ "aria-label": "controlled" }}
                />
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
      </div>
    ) : (
      <Box
        sx={{
          display: "flex",
          wdith: "100%",
          justifyContent: "center",
          padding: "150px 0",
        }}
      >
        <CircularProgress />
      </Box>
    )
  ) : (
    <div>
      <div className="text-center">
        <h1 className="text-[35px] pb-3">Retsept qo'shish</h1>
        <Toaster />
        <div className="flex gap-5">
          <form
            onSubmit={handleSubmitAddRecipe}
            className="w-1/2 m-auto flex flex-col gap-5 create-branch-form"
          >
            <TextField
              label="Nomi"
              variant="outlined"
              size="large"
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
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <div align="left">
              <Select
                mode="select"
                placeholder="Kategoriya *"
                showSearch
                allowClear
                required
                style={{
                  width: "100%",
                  height: "47px",
                  marginLeft: "auto",
                }}
                onChange={handleChange}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                className={`${
                  errorCategory ? "rounded-md border border-rose-500" : ""
                }`}
                options={categoryData}
              />
            </div>

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
                onChange={handleChangeRelatedCategory}
                options={categoryData}
              />
            </Space>

            <label className="font-normal font-sans text-lg mr-auto">
              Galleriya uchun rasmlar *
            </label>
            <div style={{ display: "flex ", justifyContent: "start" }}>
              <div
                className="flex gap-3 flex-wrap"
                style={{ minWidth: "490px" }}
              >
                {imageData.map((item, i) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        border: `${errorImage ? "1px solid red" : ""}`,
                        borderRadius: `${errorImage ? "7px" : ""}`,
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
                          onChange={(e) =>
                            setImageUrl(e.target.files[0], item.id, e)
                          }
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
            <div className="mr-auto">
              <label className="font-normal font-sans text-lg">Aktiv</label>
              <Switch
                checked={checked}
                onChange={handleChangeActive}
                inputProps={{ "aria-label": "controlled" }}
              />
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
    </div>
  );
}
