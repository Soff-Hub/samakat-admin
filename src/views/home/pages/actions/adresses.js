import { TextField } from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";

export default function Adresses() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [defaultCenter, setdefaultCenter] = useState({
    lat: 41.39117141852333442,
    lng: 69.27979344835123442,
  });
  const [position, setPosition] = useState({
    lat: 41.39117141852333442,
    lng: 69.27979344835123442,
  });
  const [map, setMap] = useState(null);
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const handleDragOver = () => {
    setdefaultCenter({
      lat: map.center.lat(),
      lng: map.center.lng(),
    });
  };

  function handleMarkerDrag(evt) {
    setPosition({
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng(),
    });
  }

  function handleMarkerDragOver(evt) {
    setdefaultCenter({
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng(),
    });
  }

  const overlayViewStyles = {
    background: "white",
    color: "black",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "2px",
    borderRadius: "4px",
    textAlign: "center",
    position: "absolute",
    minWidth: 120,
    left: "50%",
    transform: "translateX(-50%)",
    border: "1px solid gray",
  };

  const markerOptions = {
    icon: {
      url: "https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png",
      scaledSize: { width: 50, height: 50 },
    },
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const getData = async (id) => {
    await Client.get(`${API_ENDPOINTS.ADDRESS_DETAIL}${id}/`)
      .then((res) => {
        console.log(res);
        setData(res);
        setPosition({
          lat: Number(res.address.latitude),
          lng: Number(res.address.longitude),
        });

        setdefaultCenter({
          lat: Number(res.address.latitude),
          lng: Number(res.address.longitude),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(location.search.split("?")[1]);
  }, []);

  return (
    <div className="flex">
      <div className="w-1/2" style={{ height: 400 }}>
      Manzil
        <LoadScript
          googleMapsApiKey={"AIzaSyDJEtT1hiuEuRHOy366iwruiyFl0vcaBTM"}
        >
          <GoogleMap
            onLoad={handleMapLoad}
            onDragEnd={handleDragOver}
            mapContainerStyle={mapStyles}
            zoom={11}
            center={defaultCenter}
          >
            <Marker
              position={position}
              options={markerOptions}
              draggable
              onDrag={handleMarkerDrag}
              onDragEnd={handleMarkerDragOver}
            >
              <OverlayView position={position} mapPaneName={"overlayLayer"}>
                <div style={overlayViewStyles}>{data?.user}</div>
              </OverlayView>
            </Marker>
          </GoogleMap>
        </LoadScript>
      </div>
      <form className="w-1/2 flex flex-col gap-5 create-branch-form">
          <TextField
            label="Filial nomi"
            variant="outlined"
            size="large"
            type="text"
            required
            value={data?.branch}
          />

          <h3>Manzil ma'lumotlari</h3>
          <TextField
            label="Yaratilgan sana"
            variant="outlined"
            size="large"
            required
            value={data?.address.created_at}
            type="text"
          />
          <TextField
            label="Latitude"
            variant="outlined"
            size="large"
            name="latitude"
            required
            value={data?.address.latitude}
            type="number"
          />
          <TextField
            label="Longitude"
            variant="outlined"
            size="large"
            required
            value={data?.address.longitude}
            type="number"
          />
        </form>
    </div>
  );
}
