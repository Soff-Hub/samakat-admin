import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Select, Space, Switch } from "antd";
import { Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation()
  const [submiting, setSubmiting] = useState(false);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
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
  const [categoryList, setCategoryList] = useState(null);
  const [discount, setDiscount] = React.useState(0);
  const [badge, setBadge] = React.useState("");
  const [badgeData, setBadgeData] = useState([]);
  const [product_categories, setProduct_categories] = React.useState([]);
  const [image, setImage] = useState("");
  const [LiveImageArr, setLiveImageArr] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
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
  const [atributInput, setAtributInput] = useState([
    {
      id: 1,
      content: "",
      order: "",
    },
  ]);
  const [obj, setObj] = useState({ order: "", content: "" });

  const handleModalClose = () => {
    console.log('modal ishladi');
    setModal2Open(!modal2Open)
  }

  const handleChangeSelect = (value) => {
    setProduct_categories(value);
  };
  const handleChange = (event) => {
    setBadge(event);
  };
  const handleChangeActiveShop = (event) => {
    setOn_sale(event.target.checked);
  };

  //   Galleriya uchun
  const addImageInput = (e) => {
    setImageData([...imageData, { id: e }]);
  };
  const ImageDelete = async (e) => {
    setImageData(imageData.filter((item) => item.id !== e));
    imageData.pop();
  };
  const setImageUrl = async (e, id) => {
    setImage([...image, e]);
    for (let i = 0; i < imageData.length; i++) {
      if (imageData[i].id === id) {
        Object.assign(imageData[i], { image: window.URL.createObjectURL(e) });
      }
    }
  };
  const lifeImagee = (e) => {
    let img = window.URL.createObjectURL(e.target.files[0]);
    LiveImageArr.push(img);
  };

  //   Atributlar

  const addAtributInput = async (value, id) => {
    setAtributInput([...atributInput, { id, ...value }]);
  };

  const changeValueObj = (e, key, id) => {
    const item = {};
    item[`${key}`] = e;
    for (let i = 0; i < atributInput.length; i++) {
      if (atributInput[i].id === id) {
        // {...atributInput[i], ...item}
        const keys = Object.keys(atributInput[i]);
        if (keys.find((el) => el == key)) {
          atributInput[i].key = e;
        }
      }
    }
    atributInput.concat(atributInput.filter((el) => el.id === id));
  };

  // tanlab yuborish olib kelinayotgan malumotlar

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

  // Qoshish funksiyasi
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    // const product_branch = filialInput?.map((item) => {
    //   const { branch, quantity } = item;
    //   // console.log('qqqqq',item);

    //   return { branch, quantity };
    // });

    // const product_highlight = atributInput?.map((item) => {
    //   const { content, order } = item;
    //   return { content, order };
    // });

    // const formData = new FormData();
    // for (let i = 0; i < image.length; i++) {
    //   formData.append("product_galereya", image[i]);
    // }

    const data = {
      //   name: name,
      //   price: price,
      //   description: description,
      //   discount: discount,
      //   badge: badge,
      //   on_sale: on_sale !== null ? on_sale : false,
      //   product_attribute: {
      //     carbohydrates: carbohydrates,
      //     ingredients: ingredients,
      //     fats: fats,
      //     kilocalories: kilocalories,
      //     manufacturer: manufacturer,
      //     protein: protein,
      //     storageConditions: storageConditions,
      //     specification: specification,
      //     shelf_life: shelf_life,
      //   },
      //   product_categories: product_categories,
      //   type: location.search.split("?")[1],
      // };
      // if (product_highlight?.[0]?.content !== "") {
      //   Object.assign(data, { product_highlight: product_highlight });
      // }
      // if (product_branch?.[0]?.branch !== 0) {
      //   Object.assign(data, { product_count_branch: product_branch });
    };

    const formData = new FormData();
    // for (let i = 0; i < image.length; i++) {
    //   formData.append("product_galereya", image[i]);
    // }

    await Client.post(API_ENDPOINTS.CREATE_PRODUCT, data)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli qo'shildi");
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
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  useEffect(() => {
    if (location?.search.split("?")[1] === "bistro") {
      getCategory("bistro");
    } else if (location?.search.split("?")[1] === "byuti") {
      getCategory("byuti");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // getBranchData();
    getBadgeData();
    // eslint-disable-next-line
  }, []);
console.log('modd', modal2Open);
  return (
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
            <TextField
              inputMode="numeric"
              label="Narxi"
              variant="outlined"
              size="small"
              type="number"
              maxLength="16"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
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

            <Space
              style={{
                width: "100%",
                textAlign: "left",
              }}
              direction="vertical"
            >
              <Select
                style={{
                  width: "100%",
                }}
                value={badge}
                placeholder="Belgi"
                onChange={handleChange}
              >
                {badgeData?.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    <p style={{ color: `${item.textColor}` }}> {item.text}</p>
                  </MenuItem>
                ))}
              </Select>
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
                <AccordionDetails style={{ position: "relative" }}>
                  <div
                    style={{ display: "flex ", gap: "10px", marginTop: "10px" }}
                  >
                    <div
                      className="flex gap-3 flex-wrap"
                      style={{ minWidth: "392px" }}
                    >
                      {imageData.map((item, i) => {
                        return (
                          <div
                            key={i}
                            style={{
                              maxWidth: "150px",
                              width: "120px",
                              backgroundImage: `url(${
                                item?.image ? item?.image : ""
                              })`,
                              backgroundSize: "cover",
                              height: "120px",
                              border: "1px solid #3B82F6",
                              borderRadius:'5px',
                              display:'flex',
                              justifyContent:'center',
                              alignItems:'center'
                            }}
                            onClick={() => setModal2Open(true)}
                          >
                            <i style={{fontSize:"25px"}} class="fa-solid fa-image"></i>
                            {/* <Button
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
                            </Button> */}

                            <Modal
                              title="Mahsulot galleriyasidagi rasm"
                              centered
                              open={modal2Open}
                              onCancel={handleModalClose}
                              okButtonProps={{ style: { display: "none" } }}
                            >
                              <div>
                                <img src="" alt="" />
                                <div>
                                  <Button component="label" variant="outlined">
                                    {item?.image ? (
                                     <i class="fa-solid fa-check"></i>
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
                                   <i class="fa-solid fa-xmark"></i>
                                  </Button>
                                </div>
                              </div>
                            </Modal>
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
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "auto",
                        }}
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
                  //   <AddInput
                  //     key={i}
                  //     addFilialInput={addProductHighlightInput}
                  //     id={i + 1}
                  //     deleteIDHighlight={deleteIDHighlight}
                  //     setChangeBranchCunt={setChangeBranchCunt}
                  //     setChangeBranch={setChangeBranch}
                  //     change={change}
                  //   />
                  <div
                    className="flex  p-3"
                    style={{ backgroundColor: "#EEEEEE" }}
                  >
                    <div className="mx-1">
                      <TextField
                        label="Tartib raqam"
                        variant="outlined"
                        size="small"
                        style={{ marginTop: "10px", width: "150px" }}
                        type="number"
                        //    defaultValue={dataH?.order ? dataH?.order : obj?.order}
                        onChange={(e) => {
                          changeValueObj(e.target.value, "order", item.id);
                        }}
                      />
                    </div>
                    <div className="mx-1 w-full">
                      <TextField
                        id="outlined-multiline-static"
                        label="Asosiy element "
                        variant="outlined"
                        className="w-full"
                        required
                        multiline
                        rows={4}
                        size="small"
                        style={{ marginTop: "10px" }}
                        type="text"
                        //    defaultValue={dataH?.content}
                        //    onChange={(e) => (changeObj(e.target.value, "content"))}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyItems: "end",
                        alignItems: "end",
                        padding: "0 10px",
                      }}
                    >
                      <button type="button"
                      //  onClick={() => DeleteIDHighlight()}
                       >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
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

              {/* <div style={{ border: "1px solid #EEEEEE" }} className="p-2 my-4">
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
              </div> */}
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

            {/* <Button
              variant="outlined"
              size="large"
              type="submit"
              disabled={submiting}
            >
              {submiting ? "Qo'shilmoqda" : "Qo'shish"}
            </Button> */}
          </form>
        </div>
      </div>

      {/* <div className="w-1/3 font-sans">
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
      </div> */}
    </div>
  );
}
