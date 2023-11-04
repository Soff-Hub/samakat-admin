import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik } from 'formik';


export default function Users() {

  const [expanded, setExpanded] = React.useState(false);
  const [errPhone, setErrPhone] = React.useState(false)

  const handleChangeAcc = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const handleSubmit = (e) => {
  //   console.log(e);
  // };

  const [loading, setLoading] = React.useState(true);
  function handleClick() {
    setLoading(true);
  }


  return (
    <div>
      <h1 className="text-[35px] pb-3">Foydalanuvchi qo'shish</h1>
      <Formik
        initialValues={{ phone: '', first_name: '' }}
        validate={values => {
          const errors = {};
          if (!values.phone || errPhone) {
            errors.phone = errPhone || 'Telefon majburiy';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          // handleSubmit(values)
          // setSubmitting(true);
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className='flex gap-[40px]'>
            <div className='w-4/5'>
              <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAcc('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Asosiy
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className='flex gap-3'>
                    <TextField
                      label="Telefon raqam"
                      // eslint-disable-next-line
                      error={values.phone && errors.phone || values.phone === '' && errors.phone || errPhone}
                      helperText={errors.phone || errPhone}
                      variant="outlined"
                      size="small"
                      name="phone"
                      onChange={(e) => {
                        handleChange(e)
                        setErrPhone(false)
                      }}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    <TextField
                      label="Ism"
                      variant="outlined"
                      size="small"
                      name="first_name"
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      value={values.first_name}
                    />
                    <FormControl sx={{ minWidth: 200 }} size="small">
                      <InputLabel id="role">Age</InputLabel>
                      <Select
                        labelId="role"
                        id="demo-select-small"
                        value={values.first_name}
                        label="Age"
                        name="first_name"
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      >
                        <MenuItem value={'first_name'}>Customer</MenuItem>
                        <MenuItem value={'first_name'}>Admin</MenuItem>
                        <MenuItem value={'first_name'}>Kuryer</MenuItem>
                        <MenuItem value={'first_name'}>Superadmin</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAcc('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>Foydalanuvchi Manzillari</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                    varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                    laoreet.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAcc('panel3')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Tasdiqlash kodi
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className='w-1/5 flex flex-col gap-4'>
              {/* <Button
            onClick={handleClick}
            endIcon={<DeleteIcon />}
            loading={loading}
            loadingPosition="end"
            variant="outlined"
            className='w-full'
            color='error'
          >
            <span>O'chirish </span>
          </Button>
          <Button
            onClick={handleClick}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="outlined"
            className='w-full'
            color='success'
          >
            <span>Saqlash va davom etish </span>
          </Button> */}
              <Button
                onClick={handleClick}
                endIcon={<SaveIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                className='w-full'
                type='submit'
              >
                <span>Saqlash </span>
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
