import React, { useState } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginSuccess } from "store/slice";
import { useNavigate } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Logo from "../../assets/images/logo Alokand.png";
import { notification } from "antd";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errPhone, setErrPhone] = useState(false);
  const [errPass, setErrPass] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.error({
      message: ` Xatolik ! `,
      description: <>{placement ? placement : "Qayta to'ldiring"}</>,
    });
  };

  const handleSubmit = async (values) => {
    // console.log('value', values);

    await Client.post(API_ENDPOINTS.LOGIN, values)
      .then((data) => {
        dispatch(loginSuccess(data));
        console.clear();
        navigate("/");
        setSubmiting(false);
      })
      .catch((err) => {
        openNotification(err?.response?.data?.msg?.[0]);

        setErrPhone(err?.response?.data?.msg?.[0]);
        setErrPass(err?.response?.data?.msg?.[0]);
        setSubmiting(false);
      });
  };

  return (
    <>
      {contextHolder}
      {/* <div className="login-page">
        <Formik
          initialValues={{ phone: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.phone || errPhone) {
              errors.phone = errPhone || "Telefon majburiy";
            }

            if (!values.password || errPass) {
              errors.password = "Parol majburiy";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(true);
            setSubmiting(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <div className="login-form">
              <form
                onSubmit={handleSubmit}
                className="login-form-inner flex flex-col mx-auto xl:1/4 lg:w-1/3 sm:w-1/2 w-full px-5 gap-5"
              >
                <div className="login-title">
                  <img style={{ width: "65%" }} src={Logo} alt="aloqand logo" />
                </div>

                <TextField
                  label="Telefon raqam"
                  // eslint-disable-next-line
                  error={
                    (values.phone && errors.phone) ||
                    (values.phone === "" && errors.phone) ||
                    errPhone
                  }
                  helperText={errors.phone || errPhone}
                  variant="filled"
                  size="small"
                  name="phone"
                  type="phone"
                  onChange={(e) => {
                    handleChange(e);
                    setErrPhone(false);
                    setErrPass(false);
                  }}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <TextField
                  // eslint-disable-next-line
                  error={
                    (values.password && errors.password) ||
                    errors.password ||
                    errPass
                  }
                  helperText={errors.password || errPass}
                  label="Parol"
                  variant="filled"
                  size="small"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    setErrPhone(false);
                    setErrPass(false);
                  }}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                />
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  disabled={submiting}
                >
                  {submiting ? "Kutilmoqda..." : "Kirish"}
                </Button>
              </form>
            </div>
          )}
        </Formik>
      </div> */}
      <div className="d-flex">
        <div className="login-page xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full     ">
           <div className=" lg:w-2/4 flex xl:items-start lg:items-start md:items-start sm:items-start items-center	xl:justify-start lg:justify-start md:justify-start sm:justify-start justify-center	 p-16 ">
                <img src={Logo} alt="aloqand logo" className="xl:w-75 lg:w-75 md:w-75 sm:w-75 w-75 " />
              </div>
              <Formik
          initialValues={{ phone: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.phone || errPhone) {
              errors.phone = errPhone || "Telefon majburiy";
            }

            if (!values.password || errPass) {
              errors.password = "Parol majburiy";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(true);
            setSubmiting(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <div className="  xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full xl:hidden lg:hidden md:hidden sm:hidden block">
              <form
                onSubmit={handleSubmit}
                className="login-form-inner flex flex-col 
                   xl:2/4 lg:w-2/3 sm:w-full
                 w-full mt-28 xl:mt-28 lg:mt-28 sm:mt-8 mt-8 mx-auto
                 
                   px-5 gap-5"
              >
                <div className="login-title lg:w-2/4 font-sans text-3xl font-bold	px-2 text-center	justify-center ">
                  Kirish
                </div>
                <TextField
                  label="Telefon raqam"
                  // eslint-disable-next-line
                  error={
                    (values.phone && errors.phone) ||
                    (values.phone === "" && errors.phone) ||
                    errPhone
                  }
                  helperText={errors.phone || errPhone}
                  variant="filled"
                  size="small"
                  name="phone"
                  type="phone"
                  onChange={(e) => {
                    handleChange(e);
                    setErrPhone(false);
                    setErrPass(false);
                  }}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <TextField
                  // eslint-disable-next-line
                  error={
                    (values.password && errors.password) ||
                    errors.password ||
                    errPass
                  }
                  helperText={errors.password || errPass}
                  label="Parol"
                  variant="filled"
                  size="small"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    setErrPhone(false);
                    setErrPass(false);
                  }}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                />
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={submiting}
                  style={{backgroundColor:'#D7144C'}}
                >
                  {submiting ? "Kutilmoqda..." : "Kirish"}
                </Button>
              </form>
             
            </div>
          )}
        </Formik>
        </div>
        <Formik
          initialValues={{ phone: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.phone || errPhone) {
              errors.phone = errPhone || "Telefon majburiy";
            }

            if (!values.password || errPass) {
              errors.password = "Parol majburiy";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(true);
            setSubmiting(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <div className="  w-1/2 xl:flex lg:flex md:flex sm:flex hidden">
              <form
                onSubmit={handleSubmit}
                className="login-form-inner flex flex-col 
                   xl:2/4 lg:w-2/3 sm:w-full
                 w-full mt-28 xl:mt-28 lg:mt-28 sm:mt-8 mt-8 mx-auto
                 
                   px-5 gap-5"
              >
                <div className="login-title lg:w-2/4 font-sans text-3xl font-bold	px-2	 ">
                  Kirish
                </div>
                <TextField
                  label="Telefon raqam"
                  // eslint-disable-next-line
                  error={
                    (values.phone && errors.phone) ||
                    (values.phone === "" && errors.phone) ||
                    errPhone
                  }
                  helperText={errors.phone || errPhone}
                  variant="filled"
                  size="small"
                  name="phone"
                  type="phone"
                  onChange={(e) => {
                    handleChange(e);
                    setErrPhone(false);
                    setErrPass(false);
                  }}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <TextField
                  // eslint-disable-next-line
                  error={
                    (values.password && errors.password) ||
                    errors.password ||
                    errPass
                  }
                  helperText={errors.password || errPass}
                  label="Parol"
                  variant="filled"
                  size="small"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    setErrPhone(false);
                    setErrPass(false);
                  }}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                />
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={submiting}
                  style={{backgroundColor:'#D7144C'}}
                >
                  {submiting ? "Kutilmoqda..." : "Kirish"}
                </Button>
              </form>
             
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login;
