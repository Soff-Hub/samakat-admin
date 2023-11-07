import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Retsepts() {
  const [submiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [editData, setEditData] = useState(null);
  const [branchData, setBranchData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [branch, setBranch] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };
  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    const data = {
      branch: branch,
      product: product,
      quantity: +quantity,
    };
    setSubmiting(true);
    await Client.post(API_ENDPOINTS.CREATE_PRODUCT_COUNT_BRANCH, data)
      .then((data) => {
        toast.success("Fillarlardagi mahsulot soni muvaffaqiyatli qo'shildi");
        setTimeout(() => {
          navigate("/branch-products");
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

    const data = {
      branch: branch,
      product: product,
      quantity: +quantity,
    };
    setSubmiting(true);
    await Client.put(
      `${API_ENDPOINTS.UPDATE_PRODUCT_COUNT_BRANCH}${
        location.search.split("?")[2]
      }/`,
      data
    )
      .then((data) => {
        toast.success("Filiallardagi mahsulot muvaffaqiyatli tahrirlandi");
        setTimeout(() => {
          navigate("/branch-products");
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
      API_ENDPOINTS.DETAIL_PRODUCT_COUNT_BRANCH + location.search.split("?")[2]
    )
      .then((res) => {
        console.log("item =>", res);
        setEditData(res);
        setBranch(res.branch);
        setProduct(res.product);
        setQuantity(res.quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBranch = async () => {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((res) => {
        console.log("res", res.results);
        setBranchData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProduct = async () => {
    await Client.get(API_ENDPOINTS.PRODUCT)
      .then((res) => {
        setProductData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBranch();
    getProduct();
    if (location.search.split("?")[1] == "edit") {
      getItem();
    }
  }, []);

  return location.search.split("?")[1] == "edit" ? (
    editData ? (
      <div>
       <div className="flex items-center justify-between">
        <h1 className="text-[28px] pb-3">Filiallardagi mahsulotlarni tahrirlash</h1>
        <Link to="/branch-products">
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
      <div 
      className="w-1/2 m-auto"
      >
        <div>
          <Toaster />
          <div className="flex gap-5">
            <form
              onSubmit={handleSubmitEdit}
              className="w-full flex flex-col gap-5 create-branch-form"
            >
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label" placholder="Filial">
                  Filial *
                </InputLabel>
                <Select
                  required
                  value={editData?.branch}
                  label="Filial"
                  onChange={handleChangeBranch}
                >
                  {branchData?.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label" placholder="Mahsulot">
                  Mahsulot *
                </InputLabel>
                <Select
                  required
                  value={product}
                  label="Mahsulot"
                  onChange={handleChangeProduct}
                >
                  {productData?.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Soni"
                variant="outlined"
                size="small"
                type="number"
                value={quantity}
                sx={{ m: 1, minWidth: 120 }}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />

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
    <div style={{
      display:'flex',
      justifyContent:'content',
      maxWidth:'500px',
      width:'100%',
      margin:'0 auto',

    }}>
      <div>
        <h1 className="text-[35px] pb-3">Filiallardagi mahsulotlar</h1>
        <Toaster />
        <div className="flex gap-5">
          <form
            onSubmit={handleSubmitAdd}
            className="w-full flex flex-col gap-5 create-branch-form"
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label" placholder="Filial">
                Filial *
              </InputLabel>
              <Select
                required
                value={branch}
                label="Filial"
                onChange={handleChangeBranch}
              >
                {branchData?.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label" placholder="Mahsulot">
                Mahsulot *
              </InputLabel>
              <Select
                required
                value={product}
                label="Mahsulot"
                onChange={handleChangeProduct}
              >
                {productData?.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Soni"
              variant="outlined"
              size="small"
              type="number"
              value={quantity}
              sx={{ m: 1, minWidth: 120 }}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />

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
