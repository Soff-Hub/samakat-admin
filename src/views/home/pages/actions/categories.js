import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Categories() {
  const [submiting, setSubmiting] = useState(false);
  const [formVal, setFormVal] = useState({
    name: "",
    order: 0,
    parent: "",
    type: "",
  });
  const [itemData, setItemData] = useState(null);
  const [img, setImage] = useState(null);
  const [parentName, setParentName] = useState(null);
  const [lifeImage, setLifeImage] = useState(null);
  const navigate = useNavigate();
  const loaction = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formVal.name);
    formData.append("order", formVal.order);
    if (img) {
      formData.append("image", img);
    }
    formData.append("type", loaction.search.split("?")[1]);
    setSubmiting(true);

    await Client.post(API_ENDPOINTS.CREATE_CATEGORY, formData)
      .then((data) => {
        toast.success("Kategoriya muvaffaqiyatli qo'shildi");
        setTimeout(() => {
          navigate("/categories");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });
    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const handleCHaildSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formVal.name);
    formData.append("parent", loaction.search.split("?")[2]);
    formData.append("order", formVal.order);
    if (img) {
      formData.append("image", img);
    }
    formData.append("type", loaction.search.split("?")[1]);

    setSubmiting(true);
    await Client.post(API_ENDPOINTS.CREATE_CATEGORY, formData)
      .then((data) => {
        toast.success("Kategoriya muvaffaqiyatli qo'shildi");
        setTimeout(() => {
          navigate("/categories");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });
    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const getItem = async () => {
    await Client.get(
      `${API_ENDPOINTS.CATEGORIES}detail/${loaction.search.split("?")[3]}/`
    )
      .then((resp) => {
        setFormVal(resp);
        setItemData(resp);
        setLifeImage(resp.image);
      })
      .catch((err) => console.log(err));
  };

  const getParentName = async () => {
    await Client.get(
      `${API_ENDPOINTS.CATEGORIES}detail/${loaction.search.split("?")[4]}/`
    )
      .then((resp) => {
        console.log("detail", resp);
        setParentName(resp);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    const formData = new FormData();
    formData.append("name", formVal.name);
    formData.append("order", formVal.order);
    formData.append("type", formVal.type);
    if (img) {
      formData.append("image", img);
    }
    await Client.put(
      `${API_ENDPOINTS.UPDATE_CATEGORY}${loaction.search.split("?")[3]}/`,
      formData
    )
      .then((data) => {
        toast.success("Kategoriya muvaffaqiyatli tahrirlandi");
        setTimeout(() => {
          navigate("/categories");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        console.log(err);
      });
    setSubmiting(false);
  };

  useEffect(() => {
    if (loaction.search.split("?").length === 4) {
      getItem();
    }
    if (loaction.search.split("?").length === 5) {
      getParentName();
    }
    if (loaction.search.split("?").length === 4) {
      setFormVal((c) => ({ ...c, type: loaction.search.split("?")[1] }));
    }
    // eslint-disable-next-line
  }, []);

  const LifeImage = (e) => {
    let img = window.URL.createObjectURL(e.target.files[0]);
    setLifeImage(img);
  };

  console.log("image", lifeImage);

  return loaction.search.split("?").length === 4 ? (
    itemData ? (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] pb-3">Kategoriyani tahrirlash</h1>
          <Link to="/categories">
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
        <div className=" m-auto">
          <Toaster />
          <div className="flex gap-5">
            <form
              onSubmit={handleSubmitEdit}
              className="w-1/2 m-auto mt-6 flex flex-col gap-5 create-branch-form"
            >
              <TextField
                label="Ota kategoriya"
                variant="outlined"
                size="large"
                type="text"
                value={itemData?.parent !== null ? itemData?.parent : "yo'q"}
              />
              <TextField
                label="Kategoriya nomi"
                variant="outlined"
                size="large"
                type="text"
                required
                defaultValue={itemData.name}
                onChange={(e) => {
                  setFormVal((c) => ({ ...c, name: e.target.value }));
                }}
              />

              <TextField
                label="Tartib raqami"
                variant="outlined"
                size="large"
                name="order"
                required
                defaultValue={itemData.order}
                onChange={(e) => {
                  setFormVal((c) => ({ ...c, order: e.target.value }));
                }}
                type="number"
              />
              <Button
                component="label"
                variant="contained"
                startIcon={lifeImage === null ? <CloudUploadIcon /> : ""}
                style={{
                  maxWidth: "550px",
                  width: "100%",
                  backgroundImage: `url(${lifeImage ? lifeImage : ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: `${lifeImage ? "220px" : "40px"}`,
                }}
              >
                {lifeImage === null ? " Rasm yuklash" : ""}
                <input
                  style={{ display: "none" }}
                  onChange={(e) => (setImage(e.target.files[0]), LifeImage(e))}
                  type="file"
                />
              </Button>
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
      <></>
    )
  ) : (
    <div>
      <h1 className="text-[35px] pb-3 text-center">Kategoriya qo'shish</h1>
      <Toaster />
      <div className="flex gap-5">
        <form
          onSubmit={
            loaction.search.split("?").length === 2
              ? handleSubmit
              : loaction.search.split("?").length === 5
              ? handleCHaildSubmit
              : ""
          }
          className="w-1/2 m-auto mt-6 flex flex-col gap-5 create-branch-form"
        >
          {loaction.search.split("?").length === 5 ? (
            <TextField
              label="Ota kategoriya"
              variant="outlined"
              size="large"
              type="text"
              value={parentName ? parentName?.name : ""}
            />
          ) : (
            ""
          )}

          <TextField
            label="Kategoriya nomi"
            variant="outlined"
            size="large"
            type="text"
            required
            value={formVal.name}
            onChange={(e) => {
              setFormVal((c) => ({ ...c, name: e.target.value }));
            }}
          />
          <TextField
            label="Tartib raqami"
            variant="outlined"
            size="large"
            name="order"
            required
            value={formVal.order}
            onChange={(e) => {
              setFormVal((c) => ({ ...c, order: e.target.value }));
            }}
            type="number"
          />
          <Button
            component="label"
            variant="contained"
            startIcon={lifeImage === null ? <CloudUploadIcon /> : ""}
            style={{
              maxWidth: "550px",
              width: "100%",
              backgroundImage: `url(${lifeImage ? lifeImage : ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: `${lifeImage ? "220px" : "40px"}`,
            }}
          >
            {lifeImage === null ? " Rasm yuklash" : ""}
            <input
              style={{ display: "none" }}
              onChange={(e) => (setImage(e.target.files[0]), LifeImage(e))}
              type="file"
            />
          </Button>

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
  );
}

export default Categories;
