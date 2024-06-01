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
import { useTheme } from "contexts/themeContex";

function Employee() {
  const [submit, setSubmit] = useState(false);
  const query = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { reset, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      first_name: "",
      phone: "",
      password_info: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmit(true);
    await Client.post(API_ENDPOINTS.CREATE_EMPLOYEE, data)
      .then((data) => {
        toast.success("Xodim muvaffaqiyatli qo'shildi");
        reset(data);
        setTimeout(() => {
          navigate("/employee");
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

  const employeeDetail = async (id) => {
    await Client.get(API_ENDPOINTS.DETAIL_EMPLOYEE + `${id}/`)
      .then((data) => {
        Object.keys(data).map((key) => setValue(key, data[key]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdate = async (data) => {
    setSubmit(true);
    await Client.patch(API_ENDPOINTS.DETAIL_EMPLOYEE + `${query["*"]}/`, data)
      .then((data) => {
        toast.success("Xodim muvaffaqiyatli yangilandi");
        reset(data);
        setSubmit(false);
        setTimeout(() => {
          navigate("/employee");
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
    employeeDetail(query["*"]);
  }, [query["*"]]);

  return (
    <div className="py-3 px-2">
      <Toaster />
      <div className="flex items-center justify-between">
        <h1 className="text-[35px] pb-3">Xodim qo'shish</h1>
        <Link to="/employee">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBackIcon />}
          >
            Orqaga
          </Button>
        </Link>
      </div>
      {!query["*"] ? (
        <form className={` ${theme.palette.mode === "light" ? "employee_form" : "employee_form-b"} `} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Ism</p>
            <Controller
              name="first_name"
              control={control}
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
              name="password_info"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Parol" required />
              )}
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
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
          className={` ${theme.palette.mode === "light" ? "employee_form" : "employee_form-b"} `}
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
              name="password_info"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Parol" />}
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
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

export default Employee;
