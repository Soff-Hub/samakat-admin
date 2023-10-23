import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Client from 'service/Client';
import { API_ENDPOINTS } from 'service/ApiEndpoints';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SelectLabels from 'components/shared/select';


function Categories() {
  const [submiting, setSubmiting] = useState(false)
  const [formVal, setFormVal] = useState({ name: '', parent: null, order: 0, })
  const [itemData, setItemData] = useState(null)
  const query = useParams()
  const navigate = useNavigate()
  const [openDelete, setOpen] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmiting(true)
    await Client.post(API_ENDPOINTS.CREATE_CATEGORY, formVal)
      .then(data => {
        toast.success("Kategoriya muvaffaqiyatli qo'shildi");
        setTimeout(() => {
          navigate('/categories')
        }, 300);
      })
      .catch(err => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      })
    setSubmiting(false)
    document.querySelector('.create-branch-form').reset()
  }


  const getItem = async () => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES}detail/${query['*']}/`)
      .then(resp => {
        setFormVal(resp)
        setItemData(resp)
      })
      .catch(err => console.log(err))
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    setSubmiting(true)
    await Client.put(`${API_ENDPOINTS.UPDATE_CATEGORY}${query['*']}/`, formVal)
      .then(data => {
        toast.success("Kategoriya muvaffaqiyatli tahrirlandi");
        setTimeout(() => {
          navigate('/categories')
        }, 300);
      })
      .catch(err => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        console.log(err)
      })
    setSubmiting(false)
  }

  useEffect(() => {
    if (query['*'] !== '') {
      getItem()
    }

    // eslint-disable-next-line
  }, [])

  return query['*'] !== '' ? (
    itemData ? <div>
      <h1 className='text-[35px] pb-3'>Kategoriya tahrirlash</h1>
      <Toaster />
      <div className='flex gap-5'>
        <form onSubmit={handleSubmitEdit} className='w-1/3 flex flex-col gap-5 create-branch-form'>
          <TextField
            label="Kategoriya nomi"
            variant="outlined"
            size="large"
            type='text'
            required
            defaultValue={itemData.name}
            onChange={(e) => {
              setFormVal((c) => ({ ...c, name: e.target.value }))
            }}
          />

          <TextField
            label="Tartib raqami"
            variant="outlined"
            size="large"
            name="order"
            required
            defaultValue={itemData.order}
            onChange={(e) => {
              setFormVal((c) => ({ ...c, order: e.target.value }))
            }}
            type='number'
          />
          <Button variant="outlined" size='large' type='submit' disabled={submiting}>{
            submiting ? "Saqlanmoqda" : "Saqlash"
          }</Button>
        </form>
      </div>
    </div> : <></>
  ) : <div>
    <h1 className='text-[35px] pb-3'>Kategoriya qo'shish</h1>
    <Toaster />
    <div className='flex gap-5'>
      <form onSubmit={handleSubmit} className='w-1/3 flex flex-col gap-5 create-branch-form'>
        <TextField
          label="Kategoriya nomi"
          variant="outlined"
          size="large"
          type='text'
          required
          value={formVal.name}
          onChange={(e) => {
            setFormVal((c) => ({ ...c, name: e.target.value }))
          }}
        />
        <TextField
          label="Tartib raqami"
          variant="outlined"
          size="large"
          name="order"
          required
          value={formVal.order}
          onChange={(e) => {
            setFormVal((c) => ({ ...c, order: e.target.value }))
          }}
          type='number'
        />
        <Button variant="outlined" size='large' type='submit' disabled={submiting}>{
          submiting ? "Qo'shilmoqda" : "Qo'shish"
        }</Button>
      </form>
    </div>

  </div>


};

export default Categories;