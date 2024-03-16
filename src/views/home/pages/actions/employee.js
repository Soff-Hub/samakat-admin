import { Button } from "@mui/material";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";

function Employee() {
  const [submit, setSubmit] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      nomer: "",
    },
  });
  const onSubmit = (data) => {
    setSubmit(true);

    console.log(data);
  };

  return (
    <div className="py-3 px-2">
      <div className="flex items-center justify-between">
        <h1 className="text-[35px] pb-3">Xodim qo'shish</h1>
        <Link to="/branches">
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
      {true ? (
        <form className="employee_form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Ism familiya</p>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Ism familiya" />
              )}
            />
          </div>
          <div>
            <p>Nomer</p>
            <Controller
              name="nomer"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Nomer" />}
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
        <form className="employee_form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Ism familiya Tah</p>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Ism familiya" />
              )}
            />
          </div>
          <div>
            <p>Nomer</p>
            <Controller
              name="nomer"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Nomer" />}
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
      )}
    </div>
  );
}

export default Employee;
