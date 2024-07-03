import { Input, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Switch } from "@mui/material";

export default function Settings() {
  const params = useParams();
  const [submit, setSubmit] = useState(false);
  const id = params["*"];
  const navigate = useNavigate();
  const { reset, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      day_of_week: "",
      start_time: "",
      end_time: "",
      not_working_day: "",
    },
  });
  const workName = {
    1: "Dushanba",
    2: "Seshanba",
    3: "Chorshanba",
    4: "Payshanba",
    5: "Juma",
    6: "Shanba",
    7: "Yakshanba",
  };

  const workTimeDetail = async (id) => {
    await Client.get(API_ENDPOINTS.WORKTIME + `/${id}/`)
      .then((data) => {
        console.log("data", data);
        Object.keys(data).map((key) => {
          if (key === "day_of_week") {
            setValue(key, workName[data[key]]);
          } else {
            setValue(key, data[key]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdate = async (data) => {
    setSubmit(true);

    const formData = new FormData();
    formData.append("start_time", data?.start_time);
    formData.append("end_time", data?.end_time);
    formData.append("not_working_day", data?.not_working_day);

    await Client.patch(API_ENDPOINTS.WORKTIME + `/${id}/`, formData)
      .then((data) => {
        toast.success("Ish kuni muvaffaqiyatli yangilandi");
        reset(data);
        setSubmit(false);
        setTimeout(() => {
          navigate("/settings");
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
    if (id) {
      workTimeDetail(id);
    }
  }, []);

  return (
    <div className="p-2">
      <Toaster />
      <div className="mb-4">
        <h1 className="text-2xl">Sozlamalarni tahrirlash</h1>
      </div>
      <form
        id="create-form"
        className="employee_form"
        onSubmit={handleSubmit(onUpdate)}
      >
        <div>
          <p>Hafta kuni</p>
          <Controller
            name="day_of_week"
            control={control}
            render={({ field }) => <Input disabled={true} {...field} placeholder="Ism" />}
          />
        </div>

        <div>
          <p>Ish boshlanish vaqti</p>
          <Controller
            name="start_time"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Ish boshlanish vaqti" />
            )}
            // render={({ field }) => <TimePicker width='100%' {...field} placeholder="Boshlanish vaqti" />}
          />
        </div>

        <div>
          <p>Ish tugash vaqti</p>
          <Controller
            name="end_time"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Ish tugash vaqti" />
            )}
          />
        </div>
        <div>
          <p>Dam olish kunini belgilash</p>
          <Controller
            name="not_working_day"
            control={control}
            render={({ field }) => <Switch {...field} />}
          />
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
    </div>
  );
}
