import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTheme } from "contexts/themeContex";
import { Input } from "antd";

function Login() {
  const [submiting, setSubmiting] = useState(false);
  const [formVal, setFormVal] = useState({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [itemData, setItemData] = useState(null);
  const query = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [defaultCenter, setdefaultCenter] = useState({
    lat: 41.39117141852333442,
    lng: 69.27979344835123442,
  });
  const [position, setPosition] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Client.post(API_ENDPOINTS.CREATE_BRANCH, formVal)
      .then((data) => {
        toast.success("Filial muvaffaqiyatli qo'shildi");
        setTimeout(() => {
          navigate("/branches");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });
    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

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

    setFormVal((curr) => ({
      ...curr,
      latitude: evt.latLng.lat(),
      longitude: evt.latLng.lng(),
    }));
  }

  function handleMarkerDragOver(evt) {
    setdefaultCenter({
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng(),
    });

    setFormVal((c) => ({
      ...c,
      ...{
        latitude: evt.latLng.lat(),
        longitude: evt.latLng.lng(),
      },
    }));
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

  const getItem = async () => {
    await Client.get(`${API_ENDPOINTS.GET_BRANCHS}${query["*"]}`)
      .then((resp) => {
        setPosition({
          lat: Number(resp.latitude),
          lng: Number(resp.longitude),
        });

        setdefaultCenter({
          lat: Number(resp.latitude),
          lng: Number(resp.longitude),
        });
        setFormVal(resp);
        setItemData(resp);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await Client.put(`${API_ENDPOINTS.UPDATE_BRANCH}${query["*"]}/`, formVal)
      .then((data) => {
        toast.success("Filial muvaffaqiyatli tahrirlandi");
        setTimeout(() => {
          navigate("/branches");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        console.log(err);
      });
    setSubmiting(false);
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    if (query["*"] === "") {
      setPosition({
        lat: formVal.latitude,
        lng: formVal.longitude,
      });

      setdefaultCenter({
        lat: formVal.latitude,
        lng: formVal.longitude,
      });
    } else if (formVal.latitude === 0 && formVal.longitude === 0) {
      getItem();
    }
    // eslint-disable-next-line
  }, [formVal.latitude, formVal.longitude]);

  return query["*"] !== "" ? (
    <div className="bg--color py-3 px-2">
      <div className="flex items-center justify-between">
        <h1 className="text-[35px] pb-3">Filial tahrirlash</h1>
        <Link to="/branches">
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBackIcon />}
          >
            Orqaga
          </Button>
        </Link>
      </div>
      <Toaster />
      {itemData ? (
        <div className="flex gap-5">
          <div className="w-1/2" style={{ minHeight: 400 }}>
            <LoadScript
              googleMapsApiKey={"AIzaSyDJEtT1hiuEuRHOy366iwruiyFl0vcaBTM"}
            >
              <GoogleMap
                onLoad={handleMapLoad}
                onDragEnd={handleDragOver}
                mapContainerStyle={mapStyles}
                zoom={14}
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
                    <div style={overlayViewStyles}>
                      {formVal.name === "" ? "Filial nomi" : formVal.name}
                    </div>
                  </OverlayView>
                </Marker>
              </GoogleMap>
            </LoadScript>
          </div>
          <form
            onSubmit={handleSubmitEdit}
            className={`w-1/3 flex flex-col gap-3 create-branch-form  p-3 ${
              theme.palette.mode === "light" ? "colorr" : "colorr-b text-[#fff]"
            } `}
          >
            <div>
              <span className="p-1 font-medium text-sm">Filial nomi *</span>
              <Input
                size="large"
                type="text"
                placeholder="Filial nomi"
                required
                value={formVal.name}
                onChange={(e) => {
                  setFormVal((c) => ({ ...c, name: e.target.value }));
                }}
              />
            </div>
            <div>
              <span className="p-1 font-medium text-sm">Aniq manzil *</span>
              <Input
                size="large"
                type="text"
                placeholder="Aniq manzil"
                required
                value={formVal.address}
                onChange={(e) => {
                  setFormVal((c) => ({ ...c, address: e.target.value }));
                }}
              />
            </div>
            <div>
              <span className="p-1 font-medium text-sm">Kenglik *</span>
              <Input
                size="large"
                type="number"
                placeholder="Kenglik"
                name="latitude"
                required
                value={formVal.latitude}
                onChange={(e) => {
                  setPosition((c) => ({
                    ...c,
                    lat: Number(e.target.value),
                  }));
                  setdefaultCenter((c) => ({
                    ...c,
                    lat: Number(e.target.value),
                  }));
                  setFormVal((c) => ({ ...c, latitude: e.target.value }));
                }}
              />
            </div>
            <div>
              <span className="p-1 font-medium text-sm">Uzunlik *</span>
              <Input
                size="large"
                type="number"
                placeholder="Uzunlik"
                name="latitude"
                required
                value={formVal.longitude}
                onChange={(e) => {
                  setPosition((c) => ({
                    ...c,
                    lng: Number(e.target.value),
                  }));
                  setdefaultCenter((c) => ({
                    ...c,
                    lng: Number(e.target.value),
                  }));
                  setFormVal((c) => ({ ...c, longitude: e.target.value }));
                }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              startIcon={<SaveIcon />}
              disabled={submiting}
            >
              {submiting ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </form>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            wdith: "100%",
            justifyContent: "center",
            padding: "150px 0",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  ) : (
    <div className="py-3 px-2">
      <h1 className="text-[35px] pb-3">Filial qo'shish</h1>
      <Toaster />
      <div className="flex gap-5">
        <div className="w-1/2" style={{ minHeight: 400 }}>
          <LoadScript
            googleMapsApiKey={"AIzaSyDJEtT1hiuEuRHOy366iwruiyFl0vcaBTM"}
          >
            <GoogleMap
              onLoad={handleMapLoad}
              onDragEnd={handleDragOver}
              mapContainerStyle={mapStyles}
              zoom={14}
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
                  <div style={overlayViewStyles}>
                    {formVal.name === "" ? "Filial nomi" : formVal.name}
                  </div>
                </OverlayView>
              </Marker>
            </GoogleMap>
          </LoadScript>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`w-1/3 flex flex-col gap-3 create-branch-form p-2 ${
            theme.palette.mode === "light" ? "colorr" : "colorr-b text-[#fff]"
          } `}
        >
          <div>
            <span className="p-1 font-medium text-sm">Filial nomi *</span>
            <Input
              size="large"
              type="text"
              placeholder="Filial nomi"
              required
              value={formVal.name}
              onChange={(e) => {
                setFormVal((c) => ({ ...c, name: e.target.value }));
              }}
            />
          </div>
          <div>
            <span className="p-1 font-medium text-sm">Aniq manzil *</span>
            <Input
              size="large"
              type="text"
              placeholder="Aniq manzil"
              required
              value={formVal.address}
              onChange={(e) => {
                setFormVal((c) => ({ ...c, address: e.target.value }));
              }}
            />
          </div>
          <div>
            <span className="p-1 font-medium text-sm">Kenglik *</span>
            <Input
              size="large"
              type="number"
              placeholder="Kenglik"
              name="latitude"
              required
              value={formVal.latitude}
              onChange={(e) => {
                setPosition((c) => ({
                  ...c,
                  lat: Number(e.target.value),
                }));
                setdefaultCenter((c) => ({
                  ...c,
                  lat: Number(e.target.value),
                }));
                setFormVal((c) => ({ ...c, latitude: e.target.value }));
              }}
            />
          </div>
          <div>
            <span className="p-1 font-medium text-sm">Uzunlik *</span>
            <Input
              size="large"
              type="number"
              placeholder="Uzunlik"
              name="latitude"
              required
              value={formVal.longitude}
              onChange={(e) => {
                setPosition((c) => ({
                  ...c,
                  lng: Number(e.target.value),
                }));
                setdefaultCenter((c) => ({
                  ...c,
                  lng: Number(e.target.value),
                }));
                setFormVal((c) => ({ ...c, longitude: e.target.value }));
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={submiting}
          >
            {submiting ? "Qo'shilmoqda" : "Qo'shish"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
