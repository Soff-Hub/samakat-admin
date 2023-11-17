import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Retsepts() {
  const [submiting, setSubmiting] = useState(false);
  const [badge, setBadge] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const data = {
      text: text,
      textColor: badge,
    };

    setSubmiting(true);
    await Client.post(API_ENDPOINTS.CREATE_BADGE, data)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli qo'shildi");
        setTimeout(() => {
          navigate("/product-badge");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const getBadge = async () => {
    await Client.get(
      `${API_ENDPOINTS.DETAIL_BADGE}${location.search.split("?")[2]}`
    )
      .then((res) => {
        setData(res);
        setText(res.text);
        setBadge(res.textColor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (location.search.split("?")[1] === "edit") {
      getBadge();
    }
    // eslint-disable-next-line
  }, []);

  return location.search.split("?")[1] === "edit" ? (
    data ? (
      <div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] pb-3">Mahsulot belgisini tahrirlash</h1>
            <Link to="/product-badge">
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
              onSubmit={handleSubmitAdd}
              className="w-1/2 m-auto flex mt-4 flex-col gap-5 create-branch-form"
            >
              <TextField
                label="Belgi matni"
                variant="outlined"
                size="large"
                type="text"
                required
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <TextField
                label="Belgi rangi"
                variant="outlined"
                size="large"
                type="color"
                value={badge}
                onChange={(e) => {
                  setBadge(e.target.value);
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
        <h1 className="text-[35px] pb-3">Mahsulot belgisini qo'shish</h1>
        <Toaster />
        <div className="flex gap-5">
          <form
            onSubmit={handleSubmitAdd}
            className="w-1/2 m-auto  flex flex-col gap-5 create-branch-form"
          >
            <TextField
              label="Belgi matni"
              variant="outlined"
              size="large"
              type="text"
              required
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <TextField
              label="Belgi rangi"
              variant="outlined"
              size="large"
              type="color"
              value={badge}
              onChange={(e) => {
                setBadge(e.target.value);
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
