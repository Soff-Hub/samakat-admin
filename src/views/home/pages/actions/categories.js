import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, Space } from "antd";


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
  const [product, setProduct] = useState([])
  const [productApi, setProductApi] = useState(null)
  const [defaultData, setDefaultData] = useState([])

  const handleChangeRelatedCategory = (event) => {
    setProduct(event);
    console.log(event);
  };

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
    formData.append("products", JSON.stringify(product));

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
        setDefaultData(resp.products?.map((el) => ({
          value : el.id,
          label:el.name
        })))
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
    
    formData.append("products", JSON.stringify(product));
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

  const getProduct = async () => {
    await Client.get(`${API_ENDPOINTS.PRODUCT_MIN_LIST}`)
    .then((res) => {
      console.log(res);
      setProductApi(res?.map((el) => ({
        value : el.id,
        label:el.name
      })))
    })
    .catch((err) => {
      console.log(err);
    })
  }

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
    if (e?.target?.files[0]) {
      let img = window.URL.createObjectURL(e?.target?.files[0]);
      setLifeImage(img);
    }
  };

  useEffect(() => {
    getProduct()
  }, [])


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
              {
                !itemData.child_is_available ? 
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
                  placeholder="Mahsulotlar"
                  onChange={handleChangeRelatedCategory}
                  defaultValue={defaultData}
                  options={productApi}
                />
              </Space> : ''
              }

              <div className="image-conatiner">
                <div
                  style={{
                    width: ` ${lifeImage ? "250px" : "140px"}`,
                    backgroundImage: `url(${lifeImage})`,
                    height: `${lifeImage ? "250px" : "120px"}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    position: "relative",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize:'contain',
                  }}
                >
                  {lifeImage ? (
                    ""
                  ) : (
                    <i
                      className="fa-regular fa-image"
                      style={{ fontSize: "35px" }}
                    ></i>
                  )}
                  <input
                    style={{
                      opacity: "0",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      bottom: "0",
                      right: "0",
                    }}
                    onChange={(e) => (
                      setImage(e?.target?.files[0]), LifeImage(e)
                    )}
                    type="file"
                  />
                </div>
                <Button
                  onClick={() => (setLifeImage(""), setImage(""))}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
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

            
          {
             loaction.search.split("?").length === 5
             ? 
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
               placeholder="Mahsulotlar"
               onChange={handleChangeRelatedCategory}
               options={productApi}
             />
           </Space>
             : ""
          }

          <div className="image-conatiner">
            <div
              style={{
                width: ` ${lifeImage ? "250px" : "140px"}`,
                backgroundImage: `url(${lifeImage})`,
                height: `${lifeImage ? "250px" : "120px"}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "5px",
                position: "relative",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                textAlign: "center",
                backgroundSize:'contain'
              }}
            >
              {lifeImage ? (
                ""
              ) : (
                <i
                  className="fa-regular fa-image"
                  style={{ fontSize: "35px" }}
                ></i>
              )}
              <input
                style={{
                  opacity: "0",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  bottom: "0",
                  right: "0",
                }}
                onChange={(e) => (setImage(e?.target?.files[0]), LifeImage(e))}
                type="file"
              />
            </div>
            <Button
              onClick={() => (setLifeImage(""), setImage(""))}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
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
  );
}

export default Categories;
