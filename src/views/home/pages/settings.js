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
  const [amout, setAmout] = useState("");

  async function getData() {
    await Client.get(API_ENDPOINTS.SETTINGS)
      .then((resp) => {
        setData(resp);
        setRadius(resp?.delivery_time);
        setAmout(resp?.min_amount);
      })
      .catch((err) => console.log(err));
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (id) => {
    const data = {
      delivery_time: radius,
      min_amount: amout
    };
    await Client.patch(API_ENDPOINTS.SETTINGS, data)
      .then((resp) => {
        getData();
        message.open({
          type: "success",
          content: `Yetkazib berish vaqti o'zgartirildi`,
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        message.open({
          type: "error",
          content: `Yetkazib berish vaqti o'zgartirilmadi`,
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
      });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-2">
      <div className="mb-5">
        <h1 className="text-2xl">Sozlamalar</h1>
      </div>
      <div
        className="colorr"
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
          <div>
            {" "}
            <p>Yetkazib berish vaqti</p>
            <p className="font-bold text-center">
              {data?.delivery_time} {data?.delivery_time ? "min" : ""}{" "}
            </p>
          </div>
          <div>
            {" "}
            <p>Eng kam miqdor</p>
            <p className="font-bold text-center">
              {data?.min_amount} {data?.min_amount ? "so'm" : ""}{" "}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center" >
          <Button onClick={showModal}>
            <i class="fa-solid fa-pen-to-square"></i>
          </Button>
        </div>
        <Modal
          title="Tahrirlash"
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
            label="Vaqt"
            variant="outlined"
            size="small"
            type="number"
            value={radius}
            style={{ width: "100%" }}
            onChange={(e) => setRadius(e.target.value)}
          />
          <TextField
            inputMode="numeric"
            label="Eng kam miqdor ( so'm )"
            variant="outlined"
            size="small"
            type="number"
            value={amout}
            style={{ width: "100%", marginTop: '10px' }}
            onChange={(e) => setAmout(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
}
