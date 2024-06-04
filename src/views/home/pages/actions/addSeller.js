import { Button } from "@mui/material";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import Client from "service/Client";
import toast, { Toaster } from "react-hot-toast";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import { useEffect } from "react";

function AddSller() {
  const [submit, setSubmit] = useState(false);
  const query = useParams();
  const navigate = useNavigate();
  const { reset, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      first_name: "",
      phone: "",
      password: "",
      store_name: "",
    },
  });
  const [logoImage, setLogoImage] = useState("");
  const [logoImageReal, setLogoImageReal] = useState("");

  const onSubmit = async (data) => {
    setSubmit(true);

    const formData = new FormData();
    formData.append("first_name", data?.first_name);
    formData.append("phone", data?.phone);
    formData.append("password", data?.password);
    formData.append("store_name", data?.store_name);
    formData.append("logo", logoImage);

    await Client.post(API_ENDPOINTS.CREATE_SELLER, formData)
      .then((data) => {
        toast.success("Xodim muvaffaqiyatli qo'shildi");
        reset(data);
        setTimeout(() => {
          navigate("/addSeller");
        }, 300);
        setSubmit(false);
      })
      .catch((err) => {
        if (err?.response?.data?.msg) {
          toast.error(err?.response?.data?.msg);
        } else {
          toast.error("Xatolik! Qayta urinib ko'ring");
        }
        setSubmit(false);
      });
  };

  const sellerDetail = async (id) => {
    await Client.get(API_ENDPOINTS.DETAIL_SELLER + `${id}/`)
      .then((data) => {
        console.log('data', data);
        Object.keys(data).map((key) => setValue(key, data[key]));
        setLogoImageReal(data?.logo)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdate = async (data) => {
    setSubmit(true);

    const formData = new FormData();
    formData.append("first_name", data?.first_name);
    formData.append("phone", data?.phone);
    formData.append("password", data?.password);
    formData.append("store_name", data?.store_name);
    formData.append("logo", logoImage);

    await Client.patch(API_ENDPOINTS.DETAIL_SELLER + `${query["*"]}/`, formData)
      .then((data) => {
        toast.success("Xodim muvaffaqiyatli yangilandi");
        reset(data);
        setSubmit(false);
        setTimeout(() => {
          navigate("/addSeller");
        }, 300);
      })
      .catch((err) => {
        if (err?.response?.data?.msg) {
          toast.error(err?.response?.data?.msg);
        } else {
          toast.error("Xatolik! Qayta urinib ko'ring");
        }
        setSubmit(false);
      });
  };

  useEffect(() => {
    sellerDetail(query["*"]);
  }, [query["*"]]);

  return (
    <div className="py-3 px-2">
      <Toaster />
      <div className="flex items-center justify-between">
        <h1 className="text-[35px] pb-3">Sotuvchi qo'shish</h1>
        <Link to="/addSeller">
          <Button
            variant="contained"
            sx={{
              background: "#000",
              "&:hover": {
                backgroundColor: "#333", // Change this to the desired hover color
              },
            }}
            size="large"
            startIcon={<ArrowBackIcon />}
          >
            Orqaga
          </Button>
        </Link>
      </div>
      {!query["*"] ? (
        <form className="employee_form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Ism</p>
            <Controller
              name="first_name"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Ism" required />
              )}
            />
          </div>
          <div>
            <p>Nomer</p>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Nomer" required />
              )}
            />
          </div>
          <div>
            <p>Parol</p>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Parol" required />
              )}
            />
          </div>

          <div>
            <p>Do'kon nomi</p>
            <Controller
              name="store_name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Parol" />}
            />
          </div>

          <div>
            <p>Logo</p>
            <div className="d-flex gap-3">
              <div
                className="w-25 border border-3 rounded rounded-3  relative"
                style={{ backgroundColor: "#ccc" }}
                width={80}
                height={100}
              >
                <i class="fa-solid fa-download absolute	left-1/3 bottom-2	"></i>
                <input
                  type="file"
                  className="d-block opacity-0 "
                  onChange={(e) => (
                    setLogoImage(e.target.files[0]),
                    setLogoImageReal(
                      window.URL.createObjectURL(e.target.files[0])
                    )
                  )}
                />
              </div>
              {logoImageReal && (
                <div className="d-flex align-items-end gap-2">
                  <img
                    width={80}
                    height={80}
                    src={`${logoImageReal}`}
                    className="rounded rounded-3"
                    alt="seller's logo"
                  />
                  <i class="fa-solid fa-trash" onClick={() => (setLogoImage(""), setLogoImageReal(""))} ></i>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#000",
                "&:hover": {
                  backgroundColor: "#333", // Change this to the desired hover color
                },
              }}
              size="large"
              style={{ width: "100%", marginTop: "10px" }}
              startIcon={<SaveIcon />}
              disabled={submit}
            >
              {submit ? "Qo'shilmoqda" : "Qo'shish"}
            </Button>
          </div>
        </form>
      ) : (
        <form
          id="create-form"
          className="employee_form"
          onSubmit={handleSubmit(onUpdate)}
        >
          <div>
            <p>Ism</p>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Ism" />}
            />
          </div>
          <div>
            <p>Nomer</p>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Nomer" />}
            />
          </div>
          <div>
            <p>Parol</p>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Parol" />}
            />
          </div>

          <div>
            <p>Do'kon nomi</p>
            <Controller
              name="store_name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Parol" />}
            />
          </div>

          <div>
            <p>Logo</p>
            <div className="d-flex gap-3">
              <div
                className="w-25 border border-3 rounded rounded-3  relative"
                style={{ backgroundColor: "#ccc" }}
                width={80}
                height={100}
              >
                <i class="fa-solid fa-download absolute	left-1/3 bottom-1/3	"></i>
                <input
                  type="file"
                  className="d-block opacity-0"
                  onChange={(e) => (
                    setLogoImage(e.target.files[0]),
                    setLogoImageReal(
                      window.URL.createObjectURL(e.target.files[0])
                    )
                  )}
                />
              </div>
              {logoImageReal && (
                <div className="d-flex align-items-end gap-2">
                  <img
                    width={80}
                    height={80}
                    src={`${logoImageReal}`}
                    className="rounded rounded-3"
                    alt="seller's logo"
                  />
                  <i class="fa-solid fa-trash" onClick={() => (setLogoImage(""), setLogoImageReal(""))} ></i>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#000",
                "&:hover": {
                  backgroundColor: "#333", // Change this to the desired hover color
                },
              }}
              size="large"
              style={{ width: "100%", marginTop: "10px" }}
              startIcon={<SaveIcon />}
              disabled={submit}
            >
              {submit ? "Saqlanmoqda" : "Saqlash"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddSller;
