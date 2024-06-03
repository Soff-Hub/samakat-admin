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
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

function AddSller() {
  const [submit, setSubmit] = useState(false);
  const query = useParams();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const { reset, control, handleSubmit, setValue,  formState: { errors } } = useForm({
    defaultValues: {
      first_name: "",
      phone: "",
      password_info: "",
      store_name: "",
    },
  });
  const [logoImage, setLogoImage] = useState('')

  const onChange = ({ fileList: newFileList }) => {
    console.log('newFileList', newFileList);
    setLogoImage(newFileList)
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onSubmit = async (data) => {
    setSubmit(true);

    const formData = new FormData()
    formData.append("first_name", data?.first_name)
    formData.append("phone", data?.phone)
    formData.append("password_info", data?.password_info)
    formData.append("store_name", data?.store_name)
    formData.append("logo", logoImage)


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
        <h1 className="text-[35px] pb-3">Sotuvchi qo'shish</h1>
        <Link to="/addSeller">
          <Button
            variant="contained"
            sx={{ 
              background: "#000",
              '&:hover': {
                backgroundColor: "#333", // Change this to the desired hover color
              }
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
              name="password_info"
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

          <ImgCrop rotationSlider>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>

    </ImgCrop>

          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              sx={{ 
                background: "#000",
                '&:hover': {
                  backgroundColor: "#333", // Change this to the desired hover color
                }
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
              name="password_info"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Parol" />}
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              sx={{ 
                background: "#000",
                '&:hover': {
                  backgroundColor: "#333", // Change this to the desired hover color
                }
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
