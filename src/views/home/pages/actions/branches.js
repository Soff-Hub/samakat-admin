import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Select, Space } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "420px",
};

const defaultCenter = {
  lat: 41.2831462,
  lng: 69.2065356,
};

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


function Login() {
  const [submiting, setSubmiting] = useState(false);
  const [search, setSearch] = useState("");
  const debunce = useDebounce(search, 500)
  const [curretnLocation, setCurrentLocation] = useState(null);
  const [mapPosition, setMapPosition] = useState(defaultCenter);
  const [locationData, setlocationData] = useState([]);
  const [formVal, setFormVal] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    status: null,
  });

  const [itemData, setItemData] = useState(null);
  const [infoWindowToggle, setInfoWindowToggle] = useState(false);
  const [fokucInput, setFokucInput] = useState(false);
  const query = useParams();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.admin);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAZCug959FaGfsyWg2he8OczJUJ_tfDukg",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formVal?.name,
      address: curretnLocation || formVal?.address,
      latitude: mapPosition?.lat,
      longitude: mapPosition?.lng,
      status: null,
    };
    await Client.post(API_ENDPOINTS.CREATE_BRANCH, data)
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
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const data = {
      name: formVal?.name ? formVal?.name : itemData?.name,
      address: curretnLocation ? curretnLocation : itemData?.address,
      latitude: mapPosition?.lat ? mapPosition?.lat : itemData?.latitude,
      longitude: mapPosition?.lng ? mapPosition?.lng : itemData?.longitude,
      status: formVal?.status ? formVal?.status : itemData?.status,
    };
    await Client.patch(`${API_ENDPOINTS.UPDATE_BRANCH}${query["*"]}/`, data)
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

  const getItem = async () => {
    await Client.get(`${API_ENDPOINTS.GET_BRANCHS}${query["*"]}`)
      .then((resp) => {
        setFormVal(resp);
        setItemData(resp);
      })
      .catch((err) => console.log(err));
  };

  const onMarkerDragEnd = async (e) => {
    if (e.domEvent.type === "click") {
      setInfoWindowToggle(true);
    }

    const latLng = {
      lat: parseFloat(e.latLng.lat()),
      lng: parseFloat(e.latLng.lng()),
    };

    setMapPosition(latLng);

    try {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?&search.php?q=${search}&lat=${latLng.lat
        }&lon=${latLng.lng}&format=json&accept-language=${"uz"}&countrycodes=uz`;
      const response = await axios.get(apiUrl);

      if (response.data) {
        const address = response.data.display_name;
        toast(address, {
          style: { color: "white", background: "green" }, // Xabar rangi va orqa fon rangi
          progressClassName: "fancy-progress-bar",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return setCurrentLocation(address);
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      throw new Error("Failed to fetch address: " + error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting the current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  async function locationSearch() {
    try {
      const formattedAddress = debunce.replace(/\s+/g, "+");
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search.php?q=${formattedAddress}&format=json&accept-language=${"uz"}&countrycodes=uz`
      );
      const results = response.data;
      setlocationData(results);
    } catch (error) {
      console.error("Config error:", error.config);
    }
  }

  useEffect(() => {
    if (query["*"]) {
      getItem();
    }
  }, [query]);

  useEffect(() => {
    if (search !== "") {
      locationSearch();
    }
  }, [debunce]);

  useEffect(() => {
    getCurrentLocation();
  }, []);


  return (
    <div className="bg--color px-2">
      <h1 className="text-[35px] py-2 mt-3"> Filial {query["*"] !== "" ? "tahrirlash" : "Qo'shish"}</h1>
      <div style={{ position: "relative" }}>
        <TextField
          className="w-full my-4"
          placeholder="Qidiruv"
          variant="outlined"
          size="large"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFokucInput(true)}
          onBlur={() => {
            setTimeout(() => {
              setFokucInput(false)
            }, 1000);
          }}
        />
        {search !== "" && fokucInput && (
          <div
            className="bg-slate-100 shadow w-100 p-3"
            style={{
              position: "absolute",
              top: "85px",
              zIndex: "999",
            }}
          >
            {locationData?.length > 0 &&
              locationData?.map((item) => (
                <p
                  onClick={() => (
                    setMapPosition({
                      lat: parseFloat(item?.lat),
                      lng: parseFloat(item?.lon),
                    }),
                    setCurrentLocation(item?.display_name),
                    setFokucInput(false)
                  )}
                  className=" border-b-2 cursor-pointer pt-3"
                >
                  {item?.display_name}
                </p>
              ))}
          </div>
        )}
      </div>
      <div >
        <Toaster />
        <div className="flex flex-col">
          <div className="w-100">
            <LoadScript googleMapsApiKey="AIzaSyAZCug959FaGfsyWg2he8OczJUJ_tfDukg">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapPosition}
                zoom={15}

              >
                <Marker
                  position={mapPosition}
                  draggable={true}
                  onDragEnd={(e) => onMarkerDragEnd(e)}
                >
                  {infoWindowToggle && (
                    <InfoWindow
                      position={mapPosition}
                      onCloseClick={() => setInfoWindowToggle(false)}
                    >
                    </InfoWindow>
                  )}
                </Marker>
              </GoogleMap>
            </LoadScript>
          </div>
          <form
            onSubmit={query["*"] !== "" ? handleSubmitEdit : handleSubmit}
            className="bg-white p-3 flex gap-3 py-4 justify-between "
          >
            {role !== "seller" && query["*"] !== "" && (
              <div>
                <div className="w-[200px] ">
                  <Space className="w-100  h-[55px]" direction="vertical">
                    <Select

                      className="w-100 h-[55px]"
                      mode="single"
                      onChange={(e) => {
                        setFormVal((c) => ({ ...c, status: e }));
                      }}
                      placeholder="Filail holati"
                      value={formVal.status}
                      options={[
                        {
                          label: (
                            <div className="text-[#50C878]">Tasdiqlangan</div>
                          ),
                          value: "approved",
                        },
                        {
                          label: <div className="text-[#F4CA16]">Kutilmoqda</div>,
                          value: "pending",
                        },
                        {
                          label: <div className="text-[red]">Bekor qilingan</div>,
                          value: "cancelled",
                        },
                      ]}
                    />
                  </Space>
                </div>
              </div>
            )}

            <TextField
              placeholder="Filial nomi"
              variant="outlined"
              size="large"
              type="text"
              required
              className="w-100"
              value={formVal.name}
              onChange={(e) => {
                setFormVal((c) => ({ ...c, name: e.target.value }));
              }}
            />
            <TextField
              placeholder="Aniq manzil"
              variant="outlined"
              size="large"
              className="w-100"
              required
              value={curretnLocation ? curretnLocation : formVal.address}
              onChange={(e) => {
                setFormVal((c) => ({ ...c, address: e.target.value }));
              }}
              type="text"
            />
            <Button
              variant="contained"
              sx={{
                background: "#000",
                "&:hover": {
                  backgroundColor: "#333", // Change this to the desired hover color
                },
              }}
              className="w-[300px]"
              size="large"
              startIcon={query["*"] !== "" && <SaveIcon />}
              type="submit"
              disabled={submiting}
            >
              {query["*"] !== "" ?
                submiting ? "Saqlanmoqda..." : "Sqalash" :
                submiting ? "Qo'shilmoqda..." : "Qo'shish"
              }
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
