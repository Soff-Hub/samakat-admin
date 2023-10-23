import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Client from 'service/Client';
import { API_ENDPOINTS } from 'service/ApiEndpoints';
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [submiting, setSubmiting] = useState(false)
  const [formVal, setFormVal] = useState({ name: '', address: '', latitude: 0, longitude: 0 })

  const [defaultCenter, setdefaultCenter] = useState({
    lat: 41.39117141852333442,
    lng: 69.27979344835123442,
  })
  const [position, setPosition] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Client.post(API_ENDPOINTS.CREATE_BRANCH, formVal)
      .then(data => {
        console.log(data)
        toast.success("Filial muvaffaqiyatli qo'shildi");
      })
      .catch(err => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        console.log(err)
      })
    setSubmiting(false)
    document.querySelector('.create-branch-form').reset()
  }

  const [map, setMap] = useState(null);
  const mapStyles = {
    height: "100%",
    width: "100%",
  };


  const handleDragOver = () => {
    setdefaultCenter({
      lat: map.center.lat(),
      lng: map.center.lng(),
    })
  }

  function handleMarkerDrag(evt) {
    setPosition({
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng(),
    })
  }

  function handleMarkerDragOver(evt) {
    setdefaultCenter({
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng(),
    })

    setFormVal((c) => ({
      ...c, ...{
        latitude: evt.latLng.lat(),
        longitude: evt.latLng.lng(),
      }
    }))
  }

  const overlayViewStyles = {
    background: "white",
    color: "black",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "2px",
    borderRadius: "4px",
    textAlign: "center",
    position: 'absolute',
    minWidth: 120,
    left: '50%',
    transform: 'translateX(-50%)',
    border: '1px solid gray'
  };

  const markerOptions = {
    icon: {
      url: 'https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png',
      scaledSize: { width: 50, height: 50 },
    },
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    setPosition({
      lat: formVal.latitude,
      lng: formVal.longitude,
    })

    setdefaultCenter({
      lat: formVal.latitude,
      lng: formVal.longitude,
    })

  }, [formVal.latitude, formVal.longitude])


  return <div>
    <h1 className='text-[35px] pb-3'>Filial qo'shish</h1>
    <Toaster />
    <div className='flex gap-5'>
      <div className='w-1/2' style={{ minHeight: 400 }}>
        <LoadScript googleMapsApiKey={'AIzaSyDJEtT1hiuEuRHOy366iwruiyFl0vcaBTM'}>
          <GoogleMap
            onLoad={handleMapLoad}
            onDragEnd={handleDragOver}
            mapContainerStyle={mapStyles}
            zoom={14}
            center={defaultCenter}>
            <Marker position={position} options={markerOptions} draggable onDrag={handleMarkerDrag}
              onDragEnd={handleMarkerDragOver}>
              <OverlayView
                position={position}
                mapPaneName={"overlayLayer"}
              >
                <div style={overlayViewStyles}>{formVal.name}</div>
              </OverlayView>
            </Marker>
          </GoogleMap>
        </LoadScript>
      </div>
      <form onSubmit={handleSubmit} className='w-1/3 flex flex-col gap-5 create-branch-form'>
        <TextField
          label="Filial nomi"
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
          label="Aniq manzil"
          variant="outlined"
          size="large"
          required
          value={formVal.address}
          onChange={(e) => {
            setFormVal((c) => ({ ...c, address: e.target.value }))
          }}
          type='text'
        />
        <TextField
          label="Latitude"
          variant="outlined"
          size="large"
          name="latitude"
          required
          value={formVal.latitude}
          onChange={(e) => {
            setPosition((c) => ({
              ...c,
              lat: Number(e.target.value),
            }))
            setdefaultCenter((c) => ({
              ...c,
              lat: Number(e.target.value),
            }))
            setFormVal((c) => ({ ...c, latitude: e.target.value }))
          }}
          type='number'
        />
        <TextField
          label="Longitude"
          variant="outlined"
          size="large"
          required
          value={formVal.longitude}
          onChange={(e) => {
            setPosition((c) => ({
              ...c,
              lng: Number(e.target.value),
            }))
            setdefaultCenter((c) => ({
              ...c,
              lng: Number(e.target.value),
            }))
            setFormVal((c) => ({ ...c, longitude: e.target.value }))
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

export default Login;