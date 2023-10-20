import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'store/slice';
import { useNavigate } from 'react-router-dom';
import Client from 'service/Client';
import { API_ENDPOINTS } from 'service/ApiEndpoints';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errPhone, setErrPhone] = useState(false)
  const [errPass, setErrPass] = useState(false)

  const handleSubmit = async (values) => {
    await Client.post
      (API_ENDPOINTS.LOGIN, JSON.parse(values))
      .then(data => {
        dispatch(loginSuccess(data))
      })
      .catch(err => {
        setErrPhone(err.response.data.msg[0])
        setErrPass(err.response.data.msg[0])
      })
    console.clear()
    navigate('/')
  }


  return <div className='login-page'>
    <Formik
      initialValues={{ phone: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.phone || errPhone) {
          errors.phone = errPhone || 'Telefon majburiy';
        }

        if (!values.password || errPass) {
          errors.password = 'Parol majburiy';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleSubmit(JSON.stringify(values, null, 2))
          setSubmitting(false);
        }, 400);
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
        <div className='login-form'>
          <form onSubmit={handleSubmit} className='login-form-inner flex flex-col mx-auto xl:1/4 lg:w-1/3 sm:w-1/2 w-full px-5 gap-5'>
            <h1 className='text-center text-[35px]'>Login</h1>
            <TextField
              label="Telefon raqam"
              // eslint-disable-next-line
              error={values.phone && errors.phone || values.phone === '' && errors.phone || errPhone}
              helperText={errors.phone || errPhone}
              variant="filled"
              size="small"
              name="phone"
              type='phone'
              onChange={(e) => {
                handleChange(e)
                setErrPhone(false)
                setErrPass(false)
              }}
              onBlur={handleBlur}
              value={values.phone}
            />
            <TextField
              // eslint-disable-next-line
              error={values.password && errors.password || errors.password || errPass}
              helperText={errors.password || errPass}
              label="Parol"
              variant="filled"
              size="small"
              name="password"
              onChange={(e) => {
                handleChange(e)
                setErrPhone(false)
                setErrPass(false)
              }}
              onBlur={handleBlur}
              value={values.password}
              type='password'
            />
            <Button variant="outlined" size='large' type='submit' disabled={isSubmitting}>Login</Button>
          </form>
        </div>
      )}
    </Formik>
  </div>
};

export default Login;