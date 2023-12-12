import { TextField } from "@mui/material";
import { Button, Modal, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";

export default function Settings() {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [radius, setRadius] = useState("");

  async function getData() {
    await Client.get(API_ENDPOINTS.SETTINGS)
      .then((resp) => {
        setData(resp);
        setRadius(resp?.dostavka_radius)
      })
      .catch((err) => console.log(err));
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (id) => {
    const data = {
        dostavka_radius: radius,
      };
      await Client.patch(API_ENDPOINTS.SETTINGS , data)
        .then((resp) => {
          console.log(resp);
          getData();
          message.open({
            type: "success",
            content: `Dostavka radiusi o'zgartirildi`,
            className: "custom-class",
            style: {
              marginTop: "20vh",
            },
          });
        })
        .catch((err) => console.log(err));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div  >
      <h3 className="capitalize hover:uppercase font-normal" >Sozlamalar</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "40px" }}>
          <p>Dostavka radiusi</p>
          <p>{data?.dostavka_radius}</p>
        </div>
        <div>
          <Button onClick={showModal}>
            <i class="fa-solid fa-pen-to-square"></i>
          </Button>
        </div>
        <Modal
          title="Dostavka radiusini tahrirlash"
          open={isModalOpen}
          onOk={() => handleOk(data?.id)}
          onCancel={handleCancel}
          okText="Yuborish"
          cancelText="Ortga"
          okButtonProps={{
            style: {
              backgroundColor: "#3B82F6",
              color: "white",
            },
          }}
        >
         <TextField
              inputMode="numeric"
              label="Radius"
              variant="outlined"
              size="small"
              type="text"
              value={radius}
              style={{width:'100%'}}
              onChange={(e) => setRadius(e.target.value)}
            />
        </Modal>
      </div>
    </div>
  );
}
